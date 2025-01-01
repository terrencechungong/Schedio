import React from "react";
import { AnimatePresence } from "framer-motion";
 // @ts-ignore 
import { AppSidebar } from "./app-sidebar.tsx";
 // @ts-ignore 
import { AddMediaModal } from "./compose/Modals/AddMediaModal.tsx";
 // @ts-ignore 
import { AiGenGaption } from "./compose/AIComposeRelated/AiGenGaption.tsx";
 // @ts-ignore 
import { useModalStatesContext } from "./layout.tsx";
 // @ts-ignore 
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar.tsx";
 // @ts-ignore 
import { AddIconFromSchedulePostModal } from "./compose/Modals/AddIconFromSchedulePostModal.tsx";
 // @ts-ignore 
import { SelectTimeToScheduleModal } from "./compose/Modals/SelectTimeToScheduleModal.tsx";
 // @ts-ignore 
import { PostNowModal } from "./compose/Modals/PostNowModal.tsx";
 // @ts-ignore 
import { UserPermissionsModal } from "./team/modals/UserPermissionsModal.tsx";
 // @ts-ignore 
import { AddTeamMemberModal } from "./team/modals/AddTeamMemberModal.tsx";
 // @ts-ignore 
import { TriggerInformation } from "./automation/Modals/TriggerInformation.tsx";
 // @ts-ignore 
import { EditMediaModal } from "./compose/Modals/EditMediaModal.tsx";
 // @ts-ignore 
import AdobeEditor from "./compose/Modals/AdobeEditor.tsx";
 // @ts-ignore 
import { DeleteVersionConfirmationModal } from "./compose/Modals/DeleteVersionConfirmationModal.tsx";
 // @ts-ignore 
import { AddShortVideoModal } from "./compose/Modals/AddShortVideoModal.tsx";
 // @ts-ignore 
import { EditVideoModalWrapper } from "./compose/Modals/EditVideoModalComponents/EditVideoModal.tsx";
 // @ts-ignore 
import { VideoEditorModal } from "./compose/Modals/EditVideoModalComponents/VideoEditorModal.tsx";
 // @ts-ignore 
import { PostDetails } from "./schedule/Modals/PostDetails.tsx";
 // @ts-ignore 
import { CreatePostFromCalendar } from "./schedule/Modals/CreatePostFromCalendar.tsx";


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