"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode, useRef, RefObject, MutableRefObject } from "react";
import localFont from "next/font/local";
import "./globals.scss";
import { Toaster } from "@/components/ui/toaster"

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

export interface VideoInPostThumbnail {
  url: string;
  naturalAspectRatio: number;
  fileType: string;
  thumbnailIsFromVideo?: boolean;
  tumbnailTimestamp?: number;
}

interface VideoInPost {
  fileType: string;
  beingEdited: boolean;
  url: string;
  naturalAspectRatio: number;
  defined: boolean;
  thumbnail: VideoInPostThumbnail | null;
}

interface CheckedProfile {
  id: number;
  name: string;
  platform: string;
  unique: boolean;
  active: boolean;
  isShortForm: boolean;
}

interface PostVariationData {
  postCaption: string;
  postMedia: PhotoInPost[]
}

interface ModalStatesContextType {
  showMediaModal: boolean;
  setShowMediaModal: React.Dispatch<React.SetStateAction<boolean>>;
  textareaRef: RefObject<HTMLTextAreaElement>;
  setPostCaption: (postCaption: string) => void;
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
  checkedProfile: CheckedProfile[];
  setCheckedProfile: React.Dispatch<React.SetStateAction<CheckedProfile[]>>;
  postVariationKey: string;
  setPostVariationKey: React.Dispatch<React.SetStateAction<string>>;
  postVariations: { [key: string]: PostVariationData };
  setPostVariations: React.Dispatch<React.SetStateAction<{ [key: string]: PostVariationData }>>;
  showDeletionConfirmationModal: boolean;
  setShowDeletionConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  postTypeIsShort: boolean;
  setPostTypeIsShort: React.Dispatch<React.SetStateAction<boolean>>;
  showAddShortVideoModal: boolean;
  setShowAddShortVideoModal: React.Dispatch<React.SetStateAction<boolean>>;
  shortVideoForPostData: VideoInPost;
  setShortVideoForPostData: React.Dispatch<React.SetStateAction<VideoInPost>>;
  showEditVideoModal: boolean;
  setShowEditVideoModal: React.Dispatch<React.SetStateAction<boolean>>;
  showVideoEditorModal: boolean;
  setShowVideoEditorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalStatesContext = createContext<ModalStatesContextType | undefined>(undefined);

const ModalStatesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [checkedProfile, setCheckedProfile] = useState<CheckedProfile[]>([]);
  const [showAddLabelFromSchedulePost, setShowAddLabelFromSchedulePost] = useState(false);
  const [showEditVideoModal, setShowEditVideoModal] = useState(false)
  const [showAddTeamMemberModal, setShowAddTeamMemberModal] = useState(false)
  const [showMediaModal, setShowMediaModal] = useState<boolean>(false);
  const [shortVideoForPostData, setShortVideoForPostData] = useState<VideoInPost>({
    fileType: "",
    beingEdited: false,
    url: "",
    naturalAspectRatio: 0,
    defined: false,
    thumbnail: null
  });
  const [showAiGenCaption, setShowAiGenCaption] = useState<boolean>(false);
  const [showSelectPostTimeModal, setShowSelectPostTimeModal] = useState<boolean>(false);
  const [showTriggerInfoModal, setShowTriggerInfoModal] = useState<boolean>(false);
  const [showUserPermissionModal, setShowUserPermissionModal] = useState<boolean>(false);
  const [showPostNowModal, setShowPostNowModal] = useState<boolean>(false);
  const [showAdobeEditor, setShowAdobeEditor] = useState<boolean>(false);
  const [showAddShortVideoModal, setShowAddShortVideoModal] = useState(false);
  const [showDeletionConfirmationModal, setShowDeletionConfirmationModal] = useState<boolean>(false);
  const [showEditMediaModal, setShowEditMediaModal] = useState<boolean>(false);
  const [showVideoEditorModal, setShowVideoEditorModal] = useState<boolean>(false);
  const [photosInPost, setPhotosInPost] = useState<PhotoInPost[]>([]);
  const [mediaBeingEditedUrl, setMediaBeingEditedUrl] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const imgContainer = useRef<HTMLDivElement | null>(null);
  const mediaIsGif = useRef(false);
  const mediaBeingEditedId = useRef<string>("");
  const [postTypeIsShort, setPostTypeIsShort] = useState(false);
  const [postVariationKey, setPostVariationKey] = useState("GenericTemplate"); // key is platform-name-id
  const [postVariations, setPostVariations] = useState<{ [key: string]: PostVariationData }>({
    "GenericTemplate": {
      postCaption: "",
      postMedia: [],
    }
  })

  // setPostCaption is a function that sets the selected key
  const setPostCaption = (postCaption: string) => {
    setPostVariations((prev) => ({
      ...prev,
      [postVariationKey]: {
        ...prev[postVariationKey],
        postCaption,
      },
    }));
  }

  return (
    <ModalStatesContext.Provider value={{
      showMediaModal,
      setShowMediaModal,
      textareaRef,
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
      mediaIsGif,
      checkedProfile,
      setCheckedProfile,
      postVariationKey,
      setPostVariationKey,
      postVariations,
      setPostVariations,
      showDeletionConfirmationModal,
      setShowDeletionConfirmationModal,
      showEditVideoModal,
      setShowEditVideoModal,
      postTypeIsShort,
      setPostTypeIsShort,
      showAddShortVideoModal,
      setShowAddShortVideoModal,
      shortVideoForPostData,
      setShortVideoForPostData,
      showVideoEditorModal,
      setShowVideoEditorModal
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
        <Toaster />
      </body>
    </html>
  );
}
