import React from "react";
import { AnimatePresence } from "framer-motion";
 
import { AppSidebar } from "./app-sidebar";
 
import { AddMediaModal } from "./compose/Modals/AddMediaModal";
 
import { AiGenGaption } from "./compose/AIComposeRelated/AiGenGaption";
 
import { useModalStatesContext } from "./layout";
 
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
 
import { AddIconFromSchedulePostModal } from "./compose/Modals/AddIconFromSchedulePostModal";
 
import { SelectTimeToScheduleModal } from "./compose/Modals/SelectTimeToScheduleModal";
 
import { PostNowModal } from "./compose/Modals/PostNowModal";
 
import { UserPermissionsModal } from "./team/modals/UserPermissionsModal";
 
import { AddTeamMemberModal } from "./team/modals/AddTeamMemberModal";
 
import { TriggerInformation } from "./automation/Modals/TriggerInformation";
 
import { EditMediaModal } from "./compose/Modals/EditMediaModal";
 
import AdobeEditor from "./compose/Modals/AdobeEditor";
 
import { DeleteVersionConfirmationModal } from "./compose/Modals/DeleteVersionConfirmationModal";
 
import { AddShortVideoModal } from "./compose/Modals/AddShortVideoModal";
 
import { EditVideoModalWrapper } from "./compose/Modals/EditVideoModalComponents/EditVideoModal";
 
import { VideoEditorModal } from "./compose/Modals/EditVideoModalComponents/VideoEditorModal";
 
import { PostDetails } from "./schedule/Modals/PostDetails";
 
import { CreatePostFromCalendar } from "./schedule/Modals/CreatePostFromCalendar";


export default function AppCode({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { showMediaModal, showAiGenCaption, showAddLabelFromSchedulePost, showSelectPostTimeModal, showAdobeEditor,
        showPostNowModal, showUserPermissionModal, showAddTeamMemberModal, showTriggerInfoModal, showEditMediaModal,
        showDeletionConfirmationModal, showAddShortVideoModal, showEditVideoModal, showVideoEditorModal, showPostDetailsFromCalendarModal,
        showCreatePostFromCalendarModal
    } = useModalStatesContext();


    return (
        <div style={{ width: '100vw', height: '100vh', flex: '0 0 auto', maxWidth: '100vw' }}>
            <AnimatePresence>
                {showCreatePostFromCalendarModal && <CreatePostFromCalendar/>}
            </AnimatePresence>
            <AnimatePresence>
                {showPostDetailsFromCalendarModal && <PostDetails />}
            </AnimatePresence>
            <AnimatePresence>
                {showVideoEditorModal && <VideoEditorModal/>}
            </AnimatePresence>
            <AnimatePresence>
                {showEditVideoModal && 
                <EditVideoModalWrapper/>}
            </AnimatePresence>
            <AnimatePresence>
                {showAddShortVideoModal && 
                <AddShortVideoModal/>}
            </AnimatePresence>
            <AnimatePresence>
                {showDeletionConfirmationModal &&
                    <DeleteVersionConfirmationModal />}
            </AnimatePresence>
            {showAdobeEditor && <AdobeEditor />}
            <AnimatePresence>
                {showEditMediaModal &&
                    <EditMediaModal />}
            </AnimatePresence>
            <AnimatePresence>
                {showTriggerInfoModal &&
                    <TriggerInformation />}
            </AnimatePresence>
            <AnimatePresence>
                {showAddTeamMemberModal &&
                    <AddTeamMemberModal />}
            </AnimatePresence>
            <AnimatePresence>
                {showUserPermissionModal &&
                    <UserPermissionsModal />}
            </AnimatePresence>
            <AnimatePresence>
                {showPostNowModal &&
                    <PostNowModal />}
            </AnimatePresence>
            <AnimatePresence>
                {showSelectPostTimeModal &&
                    <SelectTimeToScheduleModal />}
            </AnimatePresence>
            <AnimatePresence>
                {showAddLabelFromSchedulePost &&
                    <AddIconFromSchedulePostModal />}
            </AnimatePresence>
            <AnimatePresence>
                {showMediaModal &&
                    <AddMediaModal />}
            </AnimatePresence>
            <AnimatePresence>
                {showAiGenCaption &&
                    <AiGenGaption />}
            </AnimatePresence>
            <SidebarProvider>
                
                <AppSidebar />
                <SidebarInset>
                </SidebarInset>
                
                {children}
            </SidebarProvider>
        </div>
    )
}
