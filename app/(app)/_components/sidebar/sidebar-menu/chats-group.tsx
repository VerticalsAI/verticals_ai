"use client";

import React from "react";

import Link from "next/link";

import { usePrivy } from "@privy-io/react-auth";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Icon,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  Skeleton,
  useSidebar,
} from "@/components/ui";

import { useUserChats } from "@/hooks";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useChat } from "../../../chat/_contexts/chat";

const ChatsGroup: React.FC = () => {
  const pathname = usePathname();

  const { isMobile, setOpenMobile } = useSidebar();

  const { ready, user } = usePrivy();

  const { chats, isLoading } = useUserChats();

  const { setChat, chatId, resetChat, deleteChat } = useChat();

  const [isOpen, setIsOpen] = useState(true);

  const deleteChatHandler = async (currentChat: string) => {
    if (currentChat === chatId) {
      resetChat();
    }
    await deleteChat(currentChat);
  };

  return (
    <Collapsible
      className="group/collapsible"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className="justify-between w-full"
            isActive={pathname.includes("/chat")}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/chat.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                />
                <h1 className="text-sm font-semibold uppercase">
                  Chat History
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/chat">
                  <div
                    onClick={() => {
                      resetChat();
                      if (isMobile) {
                        setOpenMobile(false);
                      }
                    }}
                    className="h-fit w-fit p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-md"
                  >
                    <Icon name="Plus" />
                  </div>
                </Link>
                <ChevronDown className="h-[14px] w-[14px] transition-transform group-data-[state=open]/collapsible:rotate-180 text-neutral-500 dark:text-neutral-500" />
              </div>
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="flex-1 overflow-hidden relative flex flex-col">
            {isLoading || !ready ? (
              <Skeleton className="h-10 w-full" />
            ) : chats.length > 0 ? (
              chats.map(chat => (
                <SidebarMenuSubItem key={chat.id} className="flex gap-2">
                  <SidebarMenuSubButton
                    asChild
                    isActive={chat.id === chatId}
                    onClick={() => setChat(chat.id)}
                    className="flex-1"
                  >
                    <Link href={`/chat`}>
                      <span className="truncate">{chat.tagline}</span>
                    </Link>
                  </SidebarMenuSubButton>
                  <SidebarMenuSubButton
                    className="cursor-pointer w-8"
                    onClick={() => deleteChatHandler(chat.id)}
                  >
                    <Image
                      src={"/icons/trash.svg"}
                      alt="Logo"
                      width={24}
                      height={24}
                    />
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))
            ) : user ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 pl-2">
                No chats found
              </p>
            ) : (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 pl-2">
                Sign in to view your chats
              </p>
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default ChatsGroup;
