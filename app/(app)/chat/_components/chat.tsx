"use client";

import React from "react";

import EmptyChat from "./empty";
import ChatInput from "./input";
import Messages from "./messages";

import Lottie from "lottie-react";
import { useChat } from "../_contexts/chat";
import animationData from "./loading.json";

const Chat: React.FC = () => {
  const { messages } = useChat();

  const cleanedMessages = messages.filter(
    (message) => message.role !== "system"
  );

  return (
    <>
      <div className="h-full w-full flex flex-col items-center relative pt-10">
        <div className="h-full w-full flex flex-col justify-between max-w-full md:max-w-5xl">
          {cleanedMessages.length > 0 && (
            <div className="absolute left-1/2 max-md:w-16 max-md:h-16 w-20 h-20 max-md:-top-2 -top-4 -translate-x-1/2 z-10">
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                className="w-full h-full backdrop-blur-md rounded-full "
              />
            </div>
          )}
          {cleanedMessages.length > 0 && (
            <div className="absolute left-1/2 border border-white/5 max-md:-top-2 -top-4 -translate-x-1/2 -z-10 backdrop-blur-md max-md:w-[60px] w-[80px] aspect-square rounded-full bg-white-3"></div>
          )}
          <div className="flex-1 overflow-hidden h-0 flex flex-col max-w-full">
            {cleanedMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <EmptyChat />
              </div>
            ) : (
              <div className="flex flex-col h-full gap-3 relative">
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
