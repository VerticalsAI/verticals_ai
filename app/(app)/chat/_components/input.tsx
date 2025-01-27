"use client";

import React, { useRef } from "react";

import Textarea from "react-textarea-autosize";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";

import { useEnterSubmit } from "../_hooks";

import { useChat } from "../_contexts/chat";

import { cn } from "@/lib/utils";

import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";

const ChatInput: React.FC = () => {
  const { user } = usePrivy();

  const {
    input,
    setInput,
    onSubmit,
    isLoading,
    model,
    setModel,
    inputDisabledMessage,
  } = useChat();

  const { onKeyDown } = useEnterSubmit({ onSubmit: onSubmit });

  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      className={cn(
        // Base styles
        "w-full relative rounded-xl border border-solid flex items-center justify-center overflow-hidden transition-colors duration-200 ease-in-out min-h-[52px] shadow-none",
        // Light mode styles
        "bg-neutral-100 focus-within:border-white/5",
        // Dark mode styles
        "dark:bg-white/5 backdrop-blur-md/50 dark:focus-within:border-white/5",
        isLoading && "opacity-50 cursor-not-allowed"
      )}
    >
      <OptionalTooltip text={inputDisabledMessage}>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Talk..."
          className={cn(
            "w-full max-h-60 resize-none bg-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-600 dark:placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50",
            "focus-visible:outline-none",
            "dark:placeholder:text-neutral-400"
          )}
          value={input}
          onChange={e => {
            setInput(e.target.value);
          }}
          disabled={isLoading || !user || inputDisabledMessage !== ""}
          autoFocus
        />
      </OptionalTooltip>
      <div className={cn("pr-2 cursor-pointer h-fit")}>
        <button type="submit" className="p-2">
          <Image src="/icons/send.svg" alt="Logo" width={18} height={18} />
        </button>
      </div>
      {/* <div className="flex items-center justify-between px-2 pb-2">
                <ModelSelector
                    model={model}
                    onModelChange={setModel}
                    disabled={isLoading}
                />
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button 
                                type="submit" 
                                size="icon" 
                                disabled={input.trim() === '' || isLoading || !user}
                                variant="ghost"
                                className="h-8 w-8"
                            >
                                <CornerDownRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Send message</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div> */}
    </form>
  );
};

const OptionalTooltip = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  if (text === "") return children;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side="top">{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChatInput;
