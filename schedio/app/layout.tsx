"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
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
}

export const ModalStatesContext = createContext<ModalStatesContextType | undefined>(undefined);

const ModalStatesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showMediaModal, setShowMediaModal] = useState<boolean>(false);
  return (
    <ModalStatesContext.Provider value={{ showMediaModal, setShowMediaModal }}>
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
        style={{ width: '100vw', overflow: 'hidden', }}
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
