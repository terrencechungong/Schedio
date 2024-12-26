import { useModalStatesContext, VideoInPostThumbnail } from "@/app/layout";
import { useWorkspaceContext } from "@/app/WorkspaceProvider";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ComposeSidePanelContextType {
    currentPage: SidePanelPage;
    setCurrentPage: React.Dispatch<React.SetStateAction<SidePanelPage>>;
    mobileViewPlatformVisibility: PlatformVisibility;
    setMobileViewPlatformVisibility: React.Dispatch<React.SetStateAction<PlatformVisibility>>;
    webViewPlatformVisibility: PlatformVisibility;
    setWebViewPlatformVisibility: React.Dispatch<React.SetStateAction<PlatformVisibility>>;
}

type PlatformVisibility = {
    [key: number]: boolean;
}

export enum SidePanelPage {
    PREVIEW = "PREVIEW",
    SCHEDULE = "SCHEDULE",
    CONVERSATION = "CONVERSATION",
    TOOLS = "TOOLS"
}

export const ComposeSidePanelContext = createContext<ComposeSidePanelContextType | undefined>(undefined);
export const ComposeSidePanelContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { globalProfilesArray } = useWorkspaceContext()
    const [currentPage, setCurrentPage] = useState<SidePanelPage>(SidePanelPage.SCHEDULE);
    const [mobileViewPlatformVisibility, setMobileViewPlatformVisibility] = useState<PlatformVisibility>(
        globalProfilesArray.reduce((acc, profile) => {
            if (profile.isShort) {
                acc[profile.id] = true;
            }
            return acc;
        }, {} as PlatformVisibility)
    );
    const [webViewPlatformVisibility, setWebViewPlatformVisibility] = useState<PlatformVisibility>(
        globalProfilesArray.reduce((acc, profile) => {
            if (!profile.isShort) {
                acc[profile.id] = true;
            }
            return acc;
        }, {} as PlatformVisibility)
    );

    return (
        <ComposeSidePanelContext.Provider value={{
            currentPage,
            setCurrentPage,
            mobileViewPlatformVisibility,
            setMobileViewPlatformVisibility,
            webViewPlatformVisibility,
            setWebViewPlatformVisibility
        }}>
            {children}
        </ComposeSidePanelContext.Provider>
    );
};

export const useComposeSidePanelContext = () => {
    const context = useContext(ComposeSidePanelContext);
    if (!context) {
        throw new Error("useComposeSidePanelContext must be used within a ComposeSidePanelContext.Provider");
    }
    return context;
};
