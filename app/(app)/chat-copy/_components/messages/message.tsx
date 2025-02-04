"use client";

import React from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Logo,
  Markdown,
} from "@/components/ui";

import ToolInvocation from "./tools";

import { cn } from "@/lib/utils";

import { pfpURL } from "@/lib/pfp";
import { truncateAddress } from "@/lib/wallet";
import { usePrivy } from "@privy-io/react-auth";
import type { Message } from "ai";
import Image from "next/image";
import Link from "./link";
import { getAgentName } from "./tools/tool-to-agent";

interface Props {
  message: Message;
  className?: string;
  previousMessage?: Message;
  nextMessage?: Message;
}

const Message: React.FC<Props> = ({
  message,
  className,
  previousMessage,
  nextMessage,
}) => {
  const { user } = usePrivy();

  const isUser = message.role === "user";

  const nextMessageSameRole = nextMessage?.role === message.role;
  const previousMessageSameRole = previousMessage?.role === message.role;

  return (
    <div
      className={cn(
        // base styles
        "flex w-full px-2 py-4 max-w-full last:border-b-0 md:first:pt-0 h-fit",
        // mobile styles
        "flex-col gap-2",
        // desktop styles
        " md:gap-4 md:px-4",
        nextMessageSameRole && "pb-0",
        previousMessageSameRole && "pt-0",
        isUser && "items-end",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center md:items-start gap-4",
          previousMessageSameRole && "block"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center h-10 rounded-full",
            previousMessageSameRole && "opacity-0"
          )}
        >
          {isUser ? (
            <div className="flex items-center gap-2">
              {user?.wallet && truncateAddress(user.wallet.address)}{" "}
              <span className="text-[#697C72]">(You)</span>
              <Avatar className="w-9 h-9 bg-white">
                <AvatarFallback>
                  <Image
                    src="/icons/user.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                    className={cn("", className)}
                  />
                </AvatarFallback>
                {user && <AvatarImage src={pfpURL(user, false)} />}
              </Avatar>
            </div>
          ) : (
            <div className="text-sm flex items-center gap-2">
              <div className="rounded-full bg-white/5">
                <Logo className="w-5 h-5 m-2" />
              </div>
              VERTICALS AI
            </div>
          )}
        </div>
      </div>
      <div
        className={cn(
          "pt-2 w-fit max-w-full md:flex-1 flex flex-col gap-2 card ",
          "!py-[10px] !px-3 !rounded-md",
          isUser ? "items-end" : "items-start"
        )}
      >
        {message.content && <MessageMarkdown content={message.content} />}
        {message.toolInvocations && message.toolInvocations.length > 0 && (
          <div className="flex flex-col gap-2">
            {message.toolInvocations.map((tool, index) => (
              <ToolInvocation
                key={tool.toolCallId}
                tool={tool}
                prevToolAgent={
                  index === 0
                    ? previousMessage?.toolInvocations?.[0]
                      ? getAgentName(previousMessage?.toolInvocations?.[0])
                      : undefined
                    : message.toolInvocations![index - 1]
                      ? getAgentName(message.toolInvocations![index - 1])
                      : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MessageMarkdown = React.memo(({ content }: { content: string }) => {
  return (
    <Markdown
      components={{
        a: ({
          href,
          children,
        }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
          if (!href) return children;
          return <Link url={href}>{children}</Link>;
        },
      }}
    >
      {content}
    </Markdown>
  );
});

MessageMarkdown.displayName = "MessageMarkdown";

export default Message;
