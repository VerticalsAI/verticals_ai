"use client";
import React from "react";

import Link from "next/link";

import { FaDiscord, FaXTwitter } from "react-icons/fa6";

import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu as SidebarMenuUI,
  SidebarSeparator,
  Sidebar as SidebarUI,
  useSidebar,
} from "@/components/ui";

// import AuthButton from "./auth-button";
import Logo from "./logo";
import SidebarMenu from "./sidebar-menu";

import { cn } from "@/lib/utils";
import ClosedSidebarTrigger from "./closed-sidebar-trigger";
import MobileNavbar from "./mobile-navbar";
import OpenSidebarTrigger from "./open-sidebar-trigger";

const SettingIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.5"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.899 1.79355C11.5904 1.66669 11.1991 1.66669 10.4167 1.66669C9.63418 1.66669 9.24294 1.66669 8.93433 1.79355C8.52284 1.96271 8.19591 2.28717 8.02546 2.69555C7.94766 2.88197 7.91721 3.09877 7.90529 3.41501C7.88778 3.87975 7.64763 4.30993 7.2418 4.54246C6.83598 4.77499 6.34053 4.7663 5.92624 4.54899C5.64432 4.4011 5.43991 4.31887 5.23832 4.29253C4.79674 4.23484 4.35015 4.3536 3.9968 4.62269C3.73178 4.8245 3.53616 5.16077 3.14492 5.8333C2.75368 6.50583 2.55806 6.84209 2.51446 7.17077C2.45632 7.60902 2.57598 8.05224 2.84712 8.40292C2.97088 8.56298 3.14481 8.69754 3.41475 8.86587C3.8116 9.11334 4.06693 9.5349 4.06691 10C4.06688 10.4651 3.81155 10.8866 3.41475 11.1341C3.14476 11.3024 2.97081 11.437 2.84704 11.5971C2.5759 11.9477 2.45624 12.391 2.51437 12.8292C2.55798 13.1579 2.7536 13.4942 3.14484 14.1667C3.53608 14.8392 3.7317 15.1755 3.99671 15.3773C4.35007 15.6464 4.79666 15.7651 5.23824 15.7074C5.43981 15.6811 5.64421 15.5989 5.92611 15.451C6.34043 15.2337 6.83592 15.225 7.24177 15.4576C7.64762 15.6901 7.88778 16.1203 7.90529 16.5851C7.91721 16.9013 7.94766 17.1181 8.02546 17.3045C8.19591 17.7129 8.52284 18.0373 8.93433 18.2065C9.24294 18.3334 9.63418 18.3334 10.4167 18.3334C11.1991 18.3334 11.5904 18.3334 11.899 18.2065C12.3105 18.0373 12.6374 17.7129 12.8079 17.3045C12.8857 17.1181 12.9161 16.9013 12.928 16.585C12.9456 16.1203 13.1857 15.6901 13.5915 15.4576C13.9973 15.225 14.4928 15.2336 14.9072 15.451C15.1891 15.5988 15.3934 15.6811 15.595 15.7074C16.0366 15.7651 16.4832 15.6463 16.8365 15.3772C17.1016 15.1754 17.2972 14.8392 17.6884 14.1666C18.0797 13.4941 18.2753 13.1578 18.3189 12.8292C18.377 12.3909 18.2573 11.9477 17.9862 11.597C17.8624 11.4369 17.6885 11.3024 17.4185 11.134C17.0217 10.8866 16.7664 10.465 16.7664 9.99995C16.7664 9.53489 17.0218 9.11342 17.4185 8.86601C17.6885 8.69764 17.8625 8.56307 17.9863 8.40298C18.2574 8.05229 18.3771 7.60908 18.319 7.17083C18.2754 6.84215 18.0797 6.50588 17.6885 5.83335C17.2973 5.16083 17.1016 4.82456 16.8366 4.62274C16.4833 4.35365 16.0367 4.2349 15.5951 4.29259C15.3935 4.31893 15.1891 4.40115 14.9072 4.54902C14.4929 4.76635 13.9974 4.77504 13.5916 4.54249C13.1857 4.30994 12.9456 3.87974 12.928 3.41497C12.9161 3.09875 12.8857 2.88196 12.8079 2.69555C12.6374 2.28717 12.3105 1.96271 11.899 1.79355Z"
      fill="url(#paint0_linear_4_749)"
    />
    <path
      d="M12.9357 10C12.9357 11.3807 11.8078 12.5 10.4166 12.5C9.02539 12.5 7.89758 11.3807 7.89758 10C7.89758 8.61929 9.02539 7.5 10.4166 7.5C11.8078 7.5 12.9357 8.61929 12.9357 10Z"
      fill="url(#paint1_linear_4_749)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_4_749"
        x1="2.5"
        y1="10"
        x2="18.3333"
        y2="10"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#668B79" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_4_749"
        x1="7.89758"
        y1="10"
        x2="12.9357"
        y2="10"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#668B79" />
      </linearGradient>
    </defs>
  </svg>
);

interface Props {
  children: React.ReactNode;
}

const Sidebar: React.FC<Props> = ({ children }) => {
  const { open } = useSidebar();

  return (
    <>
      <SidebarUI variant="inset" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-2">
              {/* <ColorModeToggle /> */}
              <OpenSidebarTrigger />
            </div>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent className={cn("relative", open && "pr-2")}>
          <SidebarMenu />
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <div className={cn("flex justify-between items-center w-full")}>
            <div className={cn("flex items-center gap-1", !open && "hidden")}>
              <SettingIcon />
              <span className="text-xs uppercase font-medium text-[#D7E0CE]">
                Settings
              </span>
            </div>
            <SidebarMenuUI className={cn("flex", open ? "flex-row w-fit" : "")}>
              {/* <AuthButton /> */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"#"} target={"_blank"}>
                    <FaXTwitter />
                    {/* <span className="truncate">Follow Us</span> */}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"#"} target={"_blank"}>
                    <FaDiscord />
                    {/* <span className="truncate">Join Discord</span> */}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenuUI>
          </div>
        </SidebarFooter>
      </SidebarUI>
      <SidebarInset>
        <div className="p-2 pt-0 md:p-4 md:pt-10 flex-1 h-0 overflow-y-hidden relative flex flex-col">
          <ClosedSidebarTrigger />
          <MobileNavbar />
          {children}
        </div>
      </SidebarInset>
    </>
  );
};

export default Sidebar;
