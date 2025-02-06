"use client";

import React from "react";

import { InvokeAgent } from "./invoke";
import { SearchKnowledge } from "./knowledge";
import {
  AllBalances,
  Balance,
  BubbleMaps,
  DepositLiquidity,
  GetLpTokens,
  GetPools,
  GetTokenAddress,
  GetTokenData,
  GetTopHolders,
  GetTopTokenTraders,
  GetTopTraders,
  GetTrades,
  GetTrendingTokens,
  GetWalletAddress,
  LiquidStakingYields,
  NumHolders,
  PriceChart,
  Trade,
  Transfer,
  WithdrawLiquidity,
} from "./solana";
import { SearchRecentTweets } from "./twitter";

import {
  EVM_LIQUID_STAKING_YIELDS_NAME,
  INVOKE_AGENT_NAME,
  SEARCH_KNOWLEDGE_NAME,
  SOLANA_ALL_BALANCES_NAME,
  SOLANA_BALANCE_NAME,
  SOLANA_BUBBLE_MAPS_NAME,
  SOLANA_DEPOSIT_LIQUIDITY_NAME,
  SOLANA_GET_LP_TOKENS_NAME,
  SOLANA_GET_POOLS_NAME,
  SOLANA_GET_TOKEN_ADDRESS_NAME,
  SOLANA_GET_TOKEN_DATA_NAME,
  SOLANA_GET_TOP_TRADERS_NAME,
  SOLANA_GET_TRADER_TRADES_NAME,
  SOLANA_GET_TRENDING_TOKENS_NAME,
  SOLANA_GET_WALLET_ADDRESS_NAME,
  SOLANA_LIQUID_STAKING_YIELDS_NAME,
  SOLANA_TOKEN_HOLDERS_NAME,
  SOLANA_TOKEN_PRICE_CHART_NAME,
  SOLANA_TOKEN_TOP_TRADERS_NAME,
  SOLANA_TOP_HOLDERS_NAME,
  SOLANA_TRADE_NAME,
  SOLANA_TRANSFER_NAME,
  SOLANA_WITHDRAW_LIQUIDITY_NAME,
  TWITTER_SEARCH_RECENT_NAME,
} from "@/ai/action-names";

import type { ToolInvocation as ToolInvocationType } from "ai";
import { LiquidStakingYieldsEVM } from "./evm/staking";

interface Props {
  tool: ToolInvocationType;
  prevToolAgent?: string;
}

const ToolInvocation: React.FC<Props> = ({ tool, prevToolAgent }) => {
  const toolParts = tool.toolName.split("-");
  const toolName = toolParts.slice(1).join("-");

  console.log("toolName", toolName);

  switch (toolName) {
    case SOLANA_BALANCE_NAME:
      return <Balance tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_GET_WALLET_ADDRESS_NAME:
      return <GetWalletAddress tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_GET_TRENDING_TOKENS_NAME:
      return <GetTrendingTokens tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_GET_TOKEN_DATA_NAME:
      return <GetTokenData tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_TRADE_NAME:
      return <Trade tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_LIQUID_STAKING_YIELDS_NAME:
      return <LiquidStakingYields tool={tool} prevToolAgent={prevToolAgent} />;
    case EVM_LIQUID_STAKING_YIELDS_NAME:
      return (
        <LiquidStakingYieldsEVM tool={tool} prevToolAgent={prevToolAgent} />
      );
    case SOLANA_TRANSFER_NAME:
      return <Transfer tool={tool} prevToolAgent={prevToolAgent} />;
    case TWITTER_SEARCH_RECENT_NAME:
      return <SearchRecentTweets tool={tool} />;
    case SOLANA_ALL_BALANCES_NAME:
      return <AllBalances tool={tool} prevToolAgent={prevToolAgent} />;
    case SEARCH_KNOWLEDGE_NAME:
      return <SearchKnowledge tool={tool} prevToolAgent={prevToolAgent} />;
    case INVOKE_AGENT_NAME:
      return <InvokeAgent tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_GET_TOKEN_ADDRESS_NAME:
      return <GetTokenAddress tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_TOP_HOLDERS_NAME:
      return <GetTopHolders tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_BUBBLE_MAPS_NAME:
      return <BubbleMaps tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_TOKEN_HOLDERS_NAME:
      return <NumHolders tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_GET_POOLS_NAME:
      return <GetPools tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_DEPOSIT_LIQUIDITY_NAME:
      return <DepositLiquidity tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_GET_LP_TOKENS_NAME:
      return <GetLpTokens tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_WITHDRAW_LIQUIDITY_NAME:
      return <WithdrawLiquidity tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_GET_TOP_TRADERS_NAME:
      return <GetTopTraders tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_GET_TRADER_TRADES_NAME:
      return <GetTrades tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_TOKEN_TOP_TRADERS_NAME:
      return <GetTopTokenTraders tool={tool} prevToolAgent={prevToolAgent} />;
    case SOLANA_TOKEN_PRICE_CHART_NAME:
      return <PriceChart tool={tool} prevToolAgent={prevToolAgent} />;
    default:
      return (
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(tool, null, 2)}
        </pre>
      );
  }
};

export default ToolInvocation;
