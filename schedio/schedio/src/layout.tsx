
import React, { createContext, useState, useContext, useEffect, ReactNode, useRef, RefObject, MutableRefObject } from "react";
import "./output.css";

import { Toaster } from "./components/ui/toaster"
import { ChevronRight, type LucideIcon } from "lucide-react"
import { FaPinterest } from "react-icons/fa";

import AppCode from "./AppCode";
import { FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Instagram } from "lucide-react";
import { SiThreads } from "react-icons/si";
import { IconType } from "react-icons/lib";


import { useWorkspaceContext, WorkspaceProvider } from "./WorkspaceProvider";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import ComposePage from "./compose/page";

import SchedulePage from "./schedule/page";
import { createPostExec, updatePostCaptionExec } from "./graphql/utils/postUtils";
import { PostStatus } from "./constants";
import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_NEW_POST_DURING_COMPOSE_EDIT, UPDATE_POST_CAPTION } from "./graphql/appLevelQueries";
import TeamPage from "./team/page";
import { waitForNSeconds } from "./graphql/utils/generalUtils";


export interface PhotoInPost {
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

// add something to tell if its a short
interface PostVariationData {
  postCaption: string;
  postMedia: PhotoInPost[];
  // hasOneVideoLimit: boolean;
  // hasPhotos: boolean;
  // hasVideo: boolean;
}

interface PostTypeData {
  defined: boolean;
  type: PostType;
}

export enum PostType {
  SHORT = "SHORT",
  NORMAL = "NORMAL",
  NONE = "NONE"
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
  mediaBeingEditedId: MutableRefObject<string>;
  mediaIsGif: MutableRefObject<boolean>;
  postVariationKey: string;
  setPostVariationKey: React.Dispatch<React.SetStateAction<string>>;
  postVariations: { [key: string]: PostVariationData };
  setPostVariations: React.Dispatch<React.SetStateAction<{ [key: string]: PostVariationData }>>;
  showDeletionConfirmationModal: boolean;
  setShowDeletionConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  showAddShortVideoModal: boolean;
  setShowAddShortVideoModal: React.Dispatch<React.SetStateAction<boolean>>;
  shortVideoForPostData: VideoInPost;
  setShortVideoForPostData: React.Dispatch<React.SetStateAction<VideoInPost>>;
  showEditVideoModal: boolean;
  setShowEditVideoModal: React.Dispatch<React.SetStateAction<boolean>>;
  showVideoEditorModal: boolean;
  setShowVideoEditorModal: React.Dispatch<React.SetStateAction<boolean>>;
  normalPostIsUsingVideo: boolean;
  setNormalPostIsUsingVideo: React.Dispatch<React.SetStateAction<boolean>>;
  addOrUpdatePhotoInPost: (updates: Partial<PhotoInPost>, id?: string) => void;
  removePhotoFromPost: (id: string) => void;
  postTypeData: PostTypeData;
  setPostTypeData: React.Dispatch<React.SetStateAction<PostTypeData>>;
  postInComposedDoneSaving: boolean | undefined;
  setPostInComposedDoneSaving: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  showPostDetailsFromCalendarModal: boolean;
  setShowPostDetailsFromCalendarModal: React.Dispatch<React.SetStateAction<boolean>>;
  showCreatePostFromCalendarModal: boolean;
  setShowCreatePostFromCalendarModal: React.Dispatch<React.SetStateAction<boolean>>;
  composeScreenCreatingNewPost: MutableRefObject<boolean | undefined>;
}

export type Profile = {
  _id: string;
  name: string;
  active: boolean;
  unique: boolean;
  id: number;
  platform: PlatformName;
  isShort: boolean;
  sharesName: boolean;
};

export enum PlatformName {
  LinkedIn = 'LinkedIn',
  Youtube = 'Youtube',
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Threads = 'Threads',
  TikTok = 'TikTok',
  Pinterest = 'Pinterest'
}

export enum PlatformColor {
  LinkedIn = '#0a66c2',
  Youtube = '#FF0000',
  Facebook = '#0866ff',
  Instagram = '#833ab4',
  Threads = '#000000',
  TikTok = '#000000',
  Pinterest = '#af1c2d'
}

export const PlatformIcons: { [key in PlatformName]: IconType | LucideIcon } = {
  [PlatformName.LinkedIn]: FaLinkedin,
  [PlatformName.Youtube]: FaYoutube,
  [PlatformName.Facebook]: FaFacebook,
  [PlatformName.Instagram]: Instagram,
  [PlatformName.Threads]: SiThreads,
  [PlatformName.TikTok]: FaTiktok,
  [PlatformName.Pinterest]: FaPinterest,
}

// global post is short boolean

export const ModalStatesContext = createContext<ModalStatesContextType | undefined>(undefined);

const ModalStatesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [createPost, createPostReturnValues] = useMutation(CREATE_NEW_POST_DURING_COMPOSE_EDIT);
  const [updatePostCaption, updatePostCaptionValues] = useMutation(UPDATE_POST_CAPTION);
  const [postInComposedDoneSaving ,setPostInComposedDoneSaving] = useState<boolean | undefined>(undefined);
  const savePostTimer = useRef(undefined);
  const [showAddLabelFromSchedulePost, setShowAddLabelFromSchedulePost] = useState(false);
  const [showEditVideoModal, setShowEditVideoModal] = useState(false);
  const [normalPostIsUsingVideo, setNormalPostIsUsingVideo] = useState<boolean>(false);
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
  const { globalProfiles, globalProfilesArray } = useWorkspaceContext()
  const [showAiGenCaption, setShowAiGenCaption] = useState<boolean>(false);
  const [showSelectPostTimeModal, setShowSelectPostTimeModal] = useState<boolean>(false);
  const [showTriggerInfoModal, setShowTriggerInfoModal] = useState<boolean>(false);
  const [showUserPermissionModal, setShowUserPermissionModal] = useState<boolean>(false);
  const [showPostNowModal, setShowPostNowModal] = useState<boolean>(false);
  const [showCreatePostFromCalendarModal, setShowCreatePostFromCalendarModal] = useState(false);
  const [showAdobeEditor, setShowAdobeEditor] = useState<boolean>(false);
  const [showAddShortVideoModal, setShowAddShortVideoModal] = useState(false);
  const [showPostDetailsFromCalendarModal, setShowPostDetailsFromCalendarModal] = useState(false); // add state for the id when i add the database
  const [showDeletionConfirmationModal, setShowDeletionConfirmationModal] = useState<boolean>(false);
  const [showEditMediaModal, setShowEditMediaModal] = useState<boolean>(false);
  const [showVideoEditorModal, setShowVideoEditorModal] = useState<boolean>(false);
  const [mediaBeingEditedUrl, setMediaBeingEditedUrl] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const imgContainer = useRef<HTMLDivElement | null>(null);
  const mediaIsGif = useRef(false);
  const mediaBeingEditedId = useRef<string>("");
  const [postTypeData, setPostTypeData] = useState<PostTypeData>({ defined: false, type: PostType.NONE });
  const [postVariationKey, setPostVariationKey] = useState("GenericTemplate"); // key is platform-name-id
  const postBeingEditedId = useRef("");
  const composeScreenCreatingNewPost = useRef(undefined);
  const [postVariations, setPostVariations] = useState<{ [key: string]: PostVariationData }>({
    "GenericTemplate": {
      postCaption: "",
      postMedia: [],
    }
  });


  const setPostCaption = async (postCaption: string) => {
    setPostVariations((prev) => ({
      ...prev,
      [postVariationKey]: {
        ...prev[postVariationKey],
        postCaption,
      },
    }));

    // if its not a real post and im adding -> say saving -> create -> changeurl -> saved

    if (composeScreenCreatingNewPost.current && postCaption.trim() != "") {
      const {postCreated, id} = await createPostExec(globalProfilesArray, postVariations, postTypeData, createPost, postBeingEditedId)
      composeScreenCreatingNewPost.current = !postCreated;
      if (postCreated) postBeingEditedId.current =id;
    } else {
      if (savePostTimer.current) clearTimeout(savePostTimer.current);
      savePostTimer.current = setTimeout(async () => {
        setPostInComposedDoneSaving(false)
        const postUpdated = await updatePostCaptionExec(
          postBeingEditedId.current, postVariationKey,
          postCaption, updatePostCaption
        )
        await waitForNSeconds(1.5);
        setPostInComposedDoneSaving(true)
      }, 2000);
    }

  }

  const addOrUpdatePhotoInPost = (updates: Partial<PhotoInPost>, id = "") => {
    const postMedia = postVariations[postVariationKey].postMedia;
    const existingPost = postVariations[postVariationKey].postMedia.some(post => post.id == id || (updates.id && post.id == updates.id));
    if (existingPost) {
      setPostVariations((prev) => ({
        ...prev,
        [postVariationKey]: {
          ...prev[postVariationKey],
          postMedia: postMedia.map((p) => {
            if (p.id != id || (updates.id && p.id == updates.id)) return { ...p, ...updates };
            return p;
          }),
        },
      }));
    } else {
      setPostVariations((prev) => ({
        ...prev,
        [postVariationKey]: {
          ...prev[postVariationKey],
          postMedia: [...postMedia, updates as PhotoInPost]
        },
      }));
    }
  };

  const removePhotoFromPost = (id: string) => {
    const postMedia = postVariations[postVariationKey].postMedia
    setPostVariations((prev) => ({
      ...prev,
      [postVariationKey]: {
        ...prev[postVariationKey],
        postMedia: postMedia.filter(media => media.id != id),
      },
    }));
  }

  useEffect(() => {
    console.log(postVariations)
  }, [postVariations]);


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
      mediaIsGif,
      postVariationKey,
      setPostVariationKey,
      postVariations,
      setPostVariations,
      showDeletionConfirmationModal,
      setShowDeletionConfirmationModal,
      showEditVideoModal,
      setShowEditVideoModal,
      showAddShortVideoModal,
      setShowAddShortVideoModal,
      shortVideoForPostData,
      setShortVideoForPostData,
      showVideoEditorModal,
      setShowVideoEditorModal,
      normalPostIsUsingVideo,
      setNormalPostIsUsingVideo,
      addOrUpdatePhotoInPost,
      removePhotoFromPost,
      postTypeData,
      setPostTypeData,
      composeScreenCreatingNewPost,
      postInComposedDoneSaving,
      setPostInComposedDoneSaving,
      showPostDetailsFromCalendarModal,
      setShowPostDetailsFromCalendarModal,
      showCreatePostFromCalendarModal,
      setShowCreatePostFromCalendarModal
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

export default function RootLayout() {


  return (
    <Router>

      <body
        style={{ maxWidth: '100vw', maxHeight: '100vh', overflow: 'hidden' }}
        className={`antialiased`}
      >

        <ModalStatesProvider >
          <AppCode>
            <Routes>
              <Route path="/compose" element={<ComposePage />} />
              <Route path="/compose/:postId" element={<ComposePage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/team" element={<TeamPage />} />
            </Routes>
          </AppCode>
        </ModalStatesProvider>
        <Toaster />

      </body>

    </Router>

  );
}


const Hi = () => {

  return <p>yo</p>
}
