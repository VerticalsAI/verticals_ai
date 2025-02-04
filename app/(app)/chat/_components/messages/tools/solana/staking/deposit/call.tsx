"use client";

import React from "react";

import { Card, Skeleton } from "@/components/ui";

import type { DepositArgumentsType } from "@/ai";

interface Props {
  toolCallId: string;
  args: DepositArgumentsType;
}

const SwapCallBody: React.FC<Props> = () => {
  return (
    <Card className="p-4 max-w-full">
      <Skeleton className="h-48 w-96 max-w-full" />
    </Card>
  );
};

export default SwapCallBody;
