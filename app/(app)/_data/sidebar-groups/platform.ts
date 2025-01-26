import { SidebarGroup } from "../../_types/sidebar";

export const platformGroup: SidebarGroup = {
    label: 'Platform',
    items: [
        {
            icon: 'MessageSquare',
            label: 'Chat',
            href: '/chat'
        },
        {
            icon: 'Book',
            label: 'Docs',
            href: '',
            external: true
        },
        {
            icon: 'Twitter',
            label: 'Follow Us',
            href: '',
            external: true
        },
        {
            icon: 'Github',
            label: 'Source Code',
            href: '',
            external: true
        }
    ]
}