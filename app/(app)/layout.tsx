import React from "react";

import { SidebarProvider } from "@/components/ui";

import Sidebar from "./_components/sidebar";

import AuthButtonWrap from "./_components/auth-button-wrap";
import { ChatProvider } from "./chat/_contexts/chat";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <SidebarProvider>
      {/* <ExperimentalAlertDialog /> */}
      <ChatProvider>
        <AuthButtonWrap />

        <Sidebar>{children}</Sidebar>
      </ChatProvider>
    </SidebarProvider>
  );
};

export default Layout;
