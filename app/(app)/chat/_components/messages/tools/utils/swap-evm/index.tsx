"use client";

import React, { memo, useEffect, useState } from "react";

import { ChevronDown } from "lucide-react";

import { Button, Separator } from "@/components/ui";
import { Symphony } from "symphony-sdk/viem";

import LogInButton from "@/app/(app)/_components/log-in-button";
import { config } from "@/app/_contexts/privy";

import type { Token } from "@/db/types";
import { getWalletClient } from "@wagmi/core";
import { useAccount, useBalance } from "wagmi";
import TokenInputEvm from "./token-input-evm";

interface Props {
  initialInputToken: Token | null;
  initialOutputToken: Token | null;
  inputLabel: string;
  outputLabel: string;
  initialInputAmount?: string;
  swapText?: string;
  swappingText?: string;
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
}

const SwapEVM: React.FC<Props> = ({
  initialInputToken,
  initialOutputToken,
  inputLabel,
  outputLabel,
  initialInputAmount,
  swapText,
  swappingText,
  onSuccess,
  onError,
  onCancel,
}) => {
  const [inputAmount, setInputAmount] = useState<string>(
    initialInputAmount || ""
  );
  const [inputToken, setInputToken] = useState<Token | null>(initialInputToken);

  const [outputAmount, setOutputAmount] = useState<string>("");
  const [outputToken, setOutputToken] = useState<Token | null>(
    initialOutputToken
  );

  const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(false);

  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [route, setRoute] = useState<any>(undefined);
  const { address } = useAccount();

  //   const { data: inputBalance, isLoading: inputBalanceLoading } =
  //     useTokenBalanceEvm(outputToken?.id || '');
  const { data: inputBalance, isLoading: inputBalanceLoading } = useBalance({
    address: address,
  });
  const onChangeInputOutput = () => {
    const tempInputToken = inputToken;
    // const tempInputAmount = inputAmount;
    setInputToken(outputToken);
    setInputAmount("0");
    setOutputToken(tempInputToken);
    setOutputAmount("0");
    setRoute(undefined);
  };

  const onSwap = async () => {
    if (!address || !route) return;
    setIsSwapping(true);
    try {
      const transaction = await route.swap({
        slippage: {
          slippageAmount: "1",
        },
      });
      setInputAmount("0");
      setOutputAmount("0");
      setRoute(undefined);
      console.log("transaction.swapReceipt.transactionHash", transaction);
      onSuccess?.(transaction.swapReceipt.transactionHash);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsSwapping(false);
    }
  };

  useEffect(() => {
    if (inputToken && outputToken) {
      let interval: any = null;
      const fetchQuoteAndUpdate = async () => {
        setIsQuoteLoading(true);
        const walletClient = await getWalletClient(config);
        const symphony = new Symphony();
        symphony.connectWalletClient(walletClient);
        const _route = await symphony.getRoute(
          inputToken.id,
          outputToken.id,
          inputAmount
        );
        setRoute(_route);
        console.log(
          `Expected output: ${_route.amountOutFormatted} ${outputToken.symbol}`
        );
        if (_route.amountOutFormatted) {
          setOutputAmount(_route.amountOutFormatted || "");
          setIsQuoteLoading(false);
          clearInterval(interval);
        }
      };

      if (inputAmount && Number(inputAmount) > 0) {
        interval = setInterval(() => {
          fetchQuoteAndUpdate();
        }, 5_000);
        return () => clearInterval(interval);
      } else {
        setRoute(undefined);
        setOutputAmount("");
      }
    }
  }, [inputToken, outputToken, inputAmount]);

  useEffect(() => {
    setInputAmount("0");
    setOutputAmount("0");
    setRoute(undefined);
  }, [inputToken?.id, outputToken?.id]);

  return (
    <div className="flex flex-col gap-4 w-96 max-w-full">
      <div className="flex flex-col gap-2 items-center w-full">
        <TokenInputEvm
          label={inputLabel}
          amount={inputAmount}
          onChange={setInputAmount}
          token={inputToken}
          onChangeToken={setInputToken}
          address={address}
        />
        <Button
          variant="ghost"
          size="icon"
          className="group h-fit w-fit p-1"
          onClick={onChangeInputOutput}
        >
          <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
        </Button>
        <TokenInputEvm
          label={outputLabel}
          amount={outputAmount}
          token={outputToken}
          onChangeToken={setOutputToken}
          address={address}
        />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        {address ? (
          <Button
            variant="brand"
            className="w-full"
            onClick={onSwap}
            disabled={
              isSwapping ||
              isQuoteLoading ||
              !inputToken ||
              !outputToken ||
              !inputAmount ||
              !outputAmount ||
              !inputBalance ||
              inputBalanceLoading ||
              Number(inputAmount) > Number(inputBalance.formatted)
            }
          >
            {isQuoteLoading
              ? "Loading..."
              : Number(inputAmount) > Number(inputBalance?.formatted)
              ? "Insufficient balance"
              : isSwapping
              ? swappingText || "Swapping..."
              : swapText || "Swap"}
          </Button>
        ) : (
          <LogInButton />
        )}
        {onCancel && (
          <Button variant="ghost" className="w-full" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(SwapEVM);
