"use client"

import * as React from "react"
import {
    AudioWaveform,
    Workflow,
    Inbox,
    Command,
    GalleryVerticalEnd,
    Group,
    BoxIcon,
    NotebookPen,
    BookUser,
    CalendarDays,
    Users,
    Settings 
} from "lucide-react"

import { NavMain } from "./siderbar-components/nav-main"
import { NavContent } from "./siderbar-components/nav-content"
import { NavUser } from "./siderbar-components/nav-user"
import { TeamSwitcher } from "./siderbar-components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { createContext, useEffect, useRef, useState } from "react"


// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    content: [
        {
            name: "Compose",
            url: "compose",
            icon: NotebookPen,
        },
        {
            name: "Schedule",
            url: "schedule",
            icon: CalendarDays,
        },
        {
            name: "Posts",
            url: "posts",
            icon: Group,
        },
        {
            name: "Resources",
            url: "resources",
            icon: BoxIcon,
        },
    ],
    configuration: [
        {
            name: "Pages",
            url: "pages",
            icon: BookUser,
        },
        {
            name: "Team",
            url: "team",
            icon: Users,
        },
        {
            name: "Settings",
            url: "settings",
            icon: Settings,
        },
    ],
    interactions: [
        {
            name: "Inbox",
            url: "inbox",
            icon: Inbox,
        },
        {
            name: "Automation",
            url: "automation",
            icon: Workflow,
        }
    ]
}

export interface SidebarProps {
    isActive: (path: string) => boolean;
}

export const TabContext = createContext({
    selectedTab: '',
    setSelectedTab: (tab: string) => { },
});

export function AppSidebar() {
    const [selectedTab, setSelectedTab] = useState(''); // State to track selected tab
    const { state, setOpen } = useSidebar();
    const previousWidth = useRef(window.innerWidth); // Track the previous width


    useEffect(() => {
        function handleResize() {
          const currentWidth = window.innerWidth;
          console.log(currentWidth);

            const d = document.getElementById("compyy");
            if (d) {
                d.innerText = `${currentWidth}`;
            }
          if (currentWidth < 1280) {
            // Retracting below 1280px
            setOpen(false);
          } else if (currentWidth >= 1280 && previousWidth.current < 1280) {
            // Expanding above 1280px
            setOpen(true);
          }
    
          // Update previousWidth to the current width for the next resize event
          previousWidth.current = currentWidth;
        }
    
        // Set initial sidebar state based on current window width
        handleResize();
    
        // Add event listener on window resize
        window.addEventListener('resize', handleResize);
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    


    return (
        <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
            <Sidebar className="bg-white-100" collapsible="icon">
                <SidebarHeader>
                    <TeamSwitcher teams={data.teams} />
                </SidebarHeader>
                <SidebarContent>
                    <NavContent title="CONTENT" sections={data.content} />
                    <NavContent title="INTERACTIONS" sections={data.interactions} />
                    <NavContent title="CONFIGURATION" sections={data.configuration} />
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={data.user} />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
        </TabContext.Provider>
    )
}
