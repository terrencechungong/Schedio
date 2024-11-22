"use client";

import { createContext, useState, useContext, useEffect, ReactNode, useRef, RefObject } from "react";
import localFont from "next/font/local";
import "./globals.scss";
import { AppSidebar } from "./app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation'; // Use usePathname for current route
import AppCode from "@/AppCode";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface ModalStatesContextType {
  showMediaModal: boolean;
  setShowMediaModal: React.Dispatch<React.SetStateAction<boolean>>;
  textareaRef: RefObject<HTMLTextAreaElement>;
  setPostCaption: React.Dispatch<React.SetStateAction<string>>;
  postCaption: string;
  showAiGenCaption: boolean;
  setShowAiGenCaption: React.Dispatch<React.SetStateAction<boolean>>;
  showAddLabelFromSchedulePost: boolean;
  setShowAddLabelFromSchedulePost: React.Dispatch<React.SetStateAction<boolean>>;
  showSelectPostTimeModal: boolean;
  setShowSelectPostTimeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPostNowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showUserPermissionModal: boolean;
  setShowUserPermissionModal: React.Dispatch<React.SetStateAction<boolean>>;
  showPostNowModal: boolean;
  showAddTeamMemberModal: boolean;
  setShowAddTeamMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
  showTriggerInfoModal: boolean;
  setShowTriggerInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalStatesContext = createContext<ModalStatesContextType | undefined>(undefined);

const ModalStatesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showAddLabelFromSchedulePost, setShowAddLabelFromSchedulePost] = useState(false);
  const [showAddTeamMemberModal, setShowAddTeamMemberModal] = useState(false)
  const [showMediaModal, setShowMediaModal] = useState<boolean>(false);
  const [showAiGenCaption, setShowAiGenCaption] = useState<boolean>(false);
  const [showSelectPostTimeModal, setShowSelectPostTimeModal] = useState<boolean>(false);
  const [showTriggerInfoModal, setShowTriggerInfoModal] = useState<boolean>(false);
  const [showUserPermissionModal, setShowUserPermissionModal] = useState<boolean>(false);
  const [showPostNowModal, setShowPostNowModal] = useState<boolean>(false);
  const [postCaption, setPostCaption] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <ModalStatesContext.Provider value={{
      showMediaModal,
      setShowMediaModal,
      textareaRef,
      postCaption,
      setPostCaption,
      showAiGenCaption,
      setShowAiGenCaption,
      showAddLabelFromSchedulePost,
      showSelectPostTimeModal,
      setShowSelectPostTimeModal,
      showPostNowModal,
      setShowPostNowModal,
      setShowAddLabelFromSchedulePost,
      showUserPermissionModal,
      setShowUserPermissionModal,
      showAddTeamMemberModal,
      setShowAddTeamMemberModal,
      showTriggerInfoModal,
      setShowTriggerInfoModal
    }}>
      {children}
    </ModalStatesContext.Provider>
  );
};

export const useModalStatesContext = () => {
  const context = useContext(ModalStatesContext);
  if (!context) {
    throw new Error("useModalStatesContext must be used within a ModalStatesProvider");
  }
  return context;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();


  return (
    <html lang="en">
      <body
        style={{ maxWidth: '100vw', }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalStatesProvider >
          <AppCode>
            {children}
          </AppCode>
        </ModalStatesProvider>
      </body>
    </html>
  );
}
