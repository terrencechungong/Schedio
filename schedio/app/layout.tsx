"use client";

import { createContext, useState, useContext, useEffect, ReactNode, useRef, RefObject, MutableRefObject } from "react";
import localFont from "next/font/local";
import "./globals.scss";

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

interface PhotoInPost {
  id: string;
  fileType: string;
  isGif: boolean;
  beingEdited: boolean;
  smallUrl: string;
  regUrl: string;
  naturalAspectRatio: number;
}

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
  imgContainer: RefObject<HTMLDivElement>;
  showEditMediaModal: boolean;
  setShowEditMediaModal: React.Dispatch<React.SetStateAction<boolean>>;
  mediaBeingEditedUrl: string;
  setMediaBeingEditedUrl: React.Dispatch<React.SetStateAction<string>>;
  showAdobeEditor: boolean;
  setShowAdobeEditor: React.Dispatch<React.SetStateAction<boolean>>;
  photosInPost: PhotoInPost[];
  setPhotosInPost: React.Dispatch<React.SetStateAction<PhotoInPost[]>>;
  mediaBeingEditedId: MutableRefObject<string>;
  mediaIsGif: MutableRefObject<boolean>;
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
  const [showAdobeEditor, setShowAdobeEditor] = useState<boolean>(false);
  const [showEditMediaModal, setShowEditMediaModal] = useState<boolean>(false);
  const [postCaption, setPostCaption] = useState<string>("");
  const [photosInPost, setPhotosInPost] = useState<PhotoInPost[]>([]);
  const [mediaBeingEditedUrl, setMediaBeingEditedUrl] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const imgContainer = useRef<HTMLDivElement | null>(null);
  const mediaIsGif = useRef(false);
  const mediaBeingEditedId = useRef<string>("");

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
      setShowTriggerInfoModal,
      imgContainer,
      showEditMediaModal,
      setShowEditMediaModal,
      mediaBeingEditedUrl,
      setMediaBeingEditedUrl,
      showAdobeEditor,
      setShowAdobeEditor,
      mediaBeingEditedId,
      photosInPost,
      setPhotosInPost,
      mediaIsGif
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
