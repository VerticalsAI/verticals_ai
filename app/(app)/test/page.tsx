"use client";

import SwapCallBodyEVM from "../chat/_components/messages/tools/solana/swap/call-evm";

export default function page() {
  return (
    <div>
      <SwapCallBodyEVM
        toolCallId="call_SMOALVDV9GiABD76NcWW7jOo"
        args={{
          inputAmount: 0.1,
          inputMint: "0x3894085ef7ff0f0aedf52e2a2704928d1ec074f1",
          outputMint: "0x059a6b0ba116c63191182a0956cf697d0d2213ec",
        }}
      />
    </div>
  );
}
