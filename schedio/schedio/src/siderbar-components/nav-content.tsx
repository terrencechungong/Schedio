
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
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const parts = location.pathname.split("/"); // Split path into segments
  const firstPart = parts[1]; 

  const isActive = (path: string) => {
    path = path.toLowerCase().split(' ').join('');
    // const pathName = pathname.substring(1, pathname.length).toLowerCase().split('-').join('');
    console.log("PART 1", path, firstPart)
    return firstPart === path
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
