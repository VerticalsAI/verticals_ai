"use client";

import React from "react";

import EmptyChat from "./empty";
import ChatInput from "./input";
import Messages from "./messages";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useChat } from "../_contexts/chat";

const Chat: React.FC = () => {
  const { messages } = useChat();

  const cleanedMessages = messages.filter(message => message.role !== "system");

  return (
    <>
      <div className="h-full w-full flex flex-col items-center relative">
        <div className="h-full w-full flex flex-col justify-between max-w-full md:max-w-5xl">
          <div className="flex-1 overflow-hidden h-0 flex flex-col max-w-full">
            {cleanedMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <EmptyChat />
              </div>
            ) : (
              <div className="flex flex-col h-full gap-3">
                <div className="relative">
                  <Image
                    src="/images/image-chat.png"
                    alt="Logo"
                    width={90}
                    height={90}
                    className={cn(" absolute h-16 w-16 m-auto")}
                  />
                </div>

                <Messages messages={cleanedMessages} />
                <ChatInput />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
