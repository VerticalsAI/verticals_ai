"use client";

import React from "react";

import { Button } from "@/components/ui";

import { useChat } from "../../_contexts/chat";

import { cn } from "@/lib/utils";

import Image from "next/image";

interface Props {
  icon: string;
  title: string;
  description: string;
  prompt: string;
  className?: string;
}

const StarterButton: React.FC<Props> = ({
  icon,
  title,
  //   description,
  prompt,
  className,
}) => {
  const { sendMessage } = useChat();

  return (
    <Button
      className={cn(
        "flex items-center p-3 rounded-xl gap-2 text-sm !border-white/10 h-fit justify-start",
        className
      )}
      variant="outline"
      onClick={() => sendMessage(prompt)}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image src={icon} alt={title} width={20} height={20} />
          <p className="text-sm text-primary">{title}</p>
        </div>
        {/* <p className="text-xs text-neutral-600 dark:text-neutral-400 hidden md:block">
          {description}
        </p> */}
      </div>
    </Button>
  );
};

export default StarterButton;
