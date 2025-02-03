"use client";

import React, { ComponentPropsWithRef } from "react";

import { Coins, LogIn, LogOut, Wallet } from "lucide-react";

import { useLogin } from "@/hooks";

function PersonIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7.00008" cy="3.5" r="2.33333" fill="#0B0F0E" />
      <ellipse
        cx="7.00008"
        cy="9.91667"
        rx="4.08333"
        ry="2.33333"
        fill="#0B0F0E"
      />
    </svg>
  );
}

function ArrowDownIcon(props: ComponentPropsWithRef<"svg">) {
  return (
    <svg
      {...props}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 4.5L6 7.5L2.5 4.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  useSidebar,
  Skeleton,
} from "@/components/ui";

import Balances from "./balances";

import { truncateAddress } from "@/lib/wallet";

const AuthButton: React.FC = () => {
  const { user, ready, login, logout, fundWallet } = useLogin();

  const { isMobile } = useSidebar();

  if (!ready) return <Skeleton className="w-full h-8" />;

  if (!user || !user.wallet)
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            variant="brandOutline"
            onClick={() => login()}
            className="w-full justify-center gap-0"
          >
            <LogIn className="h-4 w-4" />
            <span className="ml-2">Log in</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-10 rounded-full border bg-white bg-opacity-10 border-white border-opacity-5"
              variant="brandOutline"
            >
              <div className="w-[30px] flex items-center justify-center h-[30px] rounded-full bg-white">
                <PersonIcon />
              </div>
              <span className="ml-2 hidden md:inline">
                {truncateAddress(user.wallet.address)}
              </span>
              <ArrowDownIcon />
              {/* <ChevronsUpDown className="ml-auto size-4" /> */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="backdrop-blur-lg w-[200px] shadow-[0_4px_32px_#67676733] rounded-[12px]"
            // className="w-[--radix-dropdown-menu-trigger-width] min-w-80 rounded-lg"
            side={isMobile ? "bottom" : "bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Wallet className="size-4" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {truncateAddress(user.wallet.address)}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Balances address={user.wallet.address} />
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  fundWallet(user.wallet!.address, { amount: "0.01" })
                }
              >
                <Coins className="size-4" />
                Fund Wallet
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AuthButton;
