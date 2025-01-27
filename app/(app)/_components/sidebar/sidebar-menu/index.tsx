"use client";

import React from "react";

import {
  SidebarMenu as SidebarMenuUI,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui";

import ChatsGroup from "./chats-group";
import { PortfolioBox } from "./porfolio-box";

const SidebarMenu: React.FC = () => {
  const { open } = useSidebar();

  return (
    <SidebarMenuUI>
      <PortfolioBox />
      {open && <SidebarSeparator className="my-2" />}
      <ChatsGroup />
      {/* <AccountButton /> */}
      {/* <PortfolioButton /> */}
    </SidebarMenuUI>
  );
};

export default SidebarMenu;
