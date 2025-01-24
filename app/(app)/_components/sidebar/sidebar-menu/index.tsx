'use client'

import React from 'react'

import { SidebarMenu as SidebarMenuUI } from '@/components/ui';

import ChatsGroup from './chats-group';
import AccountButton from './account-button';
import PortfolioButton from './portfolio-button';
import { PortfolioBox } from './porfolio-box';

const SidebarMenu: React.FC = () => {
    return (
        <SidebarMenuUI>
            <PortfolioBox />
            <ChatsGroup />
            {/* <AccountButton /> */}
            {/* <PortfolioButton /> */}
        </SidebarMenuUI>
    )
}

export default SidebarMenu;