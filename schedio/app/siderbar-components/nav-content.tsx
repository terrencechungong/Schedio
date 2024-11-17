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
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel style={{fontSize:'14px', color:'#9F9F9F'}}>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {sections.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              style={{ height: '45px', paddingLeft:'12px' }}
              asChild >
              <a
                onClick={() => setSelectedTab(item.name)}
                href={item.url} className={`${isActive(item.name) ? styles.selectedSidebarMenuItem : styles.sidebarMenuItem}`}>
                <item.icon style={{width:'23px', height:'23px'}}/>
                <span style={{fontSize:'18px'}}>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
