// @ts-ignore
import { VideoInPostThumbnail } from "@/layout.tsx";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface EditVideoModalContextType {
    screenPhase: number;
    setScreenPhase: React.Dispatch<React.SetStateAction<number>>;
    thumbnailToBeSetNext: VideoInPostThumbnail;
    setThumbnailToBeSetNext: React.Dispatch<React.SetStateAction<VideoInPostThumbnail>>;
}


export const EditVideoModalContext = createContext<EditVideoModalContextType | undefined>(undefined);
export const EditVideoModalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [screenPhase, setScreenPhase] = useState(0); // 0 = og edit video, 1 = upload thumbnail step 2, 2 = choose thumbnail from vid, 3 = view thumbnail, 4 = crop video, 5 = trim video
    const [thumbnailToBeSetNext, setThumbnailToBeSetNext] = useState<VideoInPostThumbnail>({
        url: '', naturalAspectRatio: 0, fileType: ''
    });
    return (
        <EditVideoModalContext.Provider value={{
            screenPhase,
            setScreenPhase,
            thumbnailToBeSetNext,
            setThumbnailToBeSetNext
        }}>
            {children}
        </EditVideoModalContext.Provider>
    );
};

export const useEditVideoModalContext = () => {
    const context = useContext(EditVideoModalContext);
    if (!context) {
        throw new Error("useEditVideoModalContext must be used within a EditVideoModalContext.Provider");
    }
    return context;
};
