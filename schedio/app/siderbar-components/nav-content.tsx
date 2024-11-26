"use client"
import styles from './sidebar.module.scss';
import { useContext, useEffect } from 'react';
import { TabContext } from '../app-sidebar';
import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react"
import { useRouter } from 'next/router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation';

export function NavContent({
  title,
  sections,
}: {
  sections: {
    name: string
    url: string
    icon: LucideIcon
  }[],
  title: string
}) {
  const { isMobile } = useSidebar();
  const { selectedTab, setSelectedTab } = useContext(TabContext);
  const pathname = usePathname();
  const isActive = (path: string) => {
    path = path.toLowerCase().split(' ').join('');
    const pathName = pathname.substring(1, pathname.length).toLowerCase().split('-').join('');
    return pathName === path
  };

  return (
    <SidebarGroup className="">
      <SidebarGroupLabel style={{fontSize:'14px', color:'#9F9F9F'}}>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {sections.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
            tooltip={item.name}
              style={{ height: '45px'}}
              asChild >
              <a
                onClick={() => setSelectedTab(item.name)}
                href={item.url} className={`${isActive(item.name) ? styles.selectedSidebarMenuItem : styles.sidebarMenuItem}`}>
                <item.icon strokeWidth={2}/>
                <span style={{fontSize:'17px'}}>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
