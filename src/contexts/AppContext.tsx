import React, { createContext, useState, useContext, useEffect, ReactNode, useRef, RefObject, MutableRefObject } from "react";
import { IconType } from "react-icons/lib";
import { FaLinkedin, FaYoutube, FaTiktok, FaFacebook, FaPinterest } from "react-icons/fa";
import { Instagram, type LucideIcon } from "lucide-react";
import { SiThreads } from "react-icons/si";

// Types and Interfaces
export interface PhotoInPost {
  id: string;
  fileType: string;
  isGif: boolean;
  beingEdited: boolean;
  smallUrl: string;
  regUrl: string;
  naturalAspectRatio: number;
}

// ... (keep other interfaces and enums)

export const ModalStatesContext = createContext<ModalStatesContextType | undefined>(undefined);

export const ModalStatesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // ... (keep all your state definitions)

  return (
    <ModalStatesContext.Provider value={{
      showMediaModal,
      setShowMediaModal,
      textareaRef,
      // ... (rest of your context values)
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