"use client";

import React from "react";

import ChatInput from "./input";
import StarterButtons from "./starter-buttons";

import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import animationData from "./loading.json";

const EmptyChat: React.FC = () => {
  return (
    <div
      className={cn(
        // Base
        "flex flex-col items-center justify-center w-full h-full px-4"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-4 md:gap-8">
        <div className="flex flex-col gap-4 items-center justify-center">
          {/* <Logo className="w-20 h-20" /> */}
          {/* <Image
            src="/images/image-chat.png"
            alt="Logo"
            width={500}
            height={500}
            className={cn("hidden dark:block img-rotate")}
          /> */}
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            className="w-80 h-80"
          />
          <div className="flex flex-col gap-1">
            {/* <h1 className="font-semibold text-center text-2xl">
                            How can <span className="text-brand-600 font-bold inline">We</span> help you?
                        </h1>
                        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                            Orchestrate a hive mind of DeFi Agents to act on Solana
                        </p> */}
          </div>
        </div>
        <ChatInput />
        <StarterButtons />
      </div>
    </div>
  );
};

export default EmptyChat;
