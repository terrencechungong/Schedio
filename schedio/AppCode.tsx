import { AnimatePresence } from "framer-motion";
import { AppSidebar } from "./app/app-sidebar";
import { AddMediaModal } from "./app/compose/Modals/AddMediaModal";
import { AiGenGaption } from "./app/compose/AIComposeRelated/AiGenGaption";
import { useModalStatesContext } from "./app/layout";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { AddIconFromSchedulePostModal } from "./app/compose/Modals/AddIconFromSchedulePostModal";
import { SelectTimeToScheduleModal } from "./app/compose/Modals/SelectTimeToScheduleModal";
import { PostNowModal } from "./app/compose/Modals/PostNowModal";
import { UserPermissionsModal } from "./app/team/modals/UserPermissionsModal";
import { AddTeamMemberModal } from "./app/team/modals/AddTeamMemberModal";
import { TriggerInformation } from "./app/automation/Modals/TriggerInformation";
import { EditMediaModal } from "./app/compose/Modals/EditMediaModal";
import AdobeEditor from "./app/compose/Modals/AdobeEditor";
import { DeleteVersionConfirmationModal } from "./app/compose/Modals/DeleteVersionConfirmationModal";




export default function AppCode({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { showMediaModal, showAiGenCaption, showAddLabelFromSchedulePost, showSelectPostTimeModal, showAdobeEditor,
        showPostNowModal, showUserPermissionModal, showAddTeamMemberModal, showTriggerInfoModal, showEditMediaModal,
        showDeletionConfirmationModal
    } = useModalStatesContext();


    return (
        <div style={{ width: '100vw', height: '100vh', flex: '0 0 auto', maxWidth: '100vw' }}>
            <AnimatePresence>
            {showDeletionConfirmationModal &&
                <DeleteVersionConfirmationModal/>}
            </AnimatePresence>
            {showAdobeEditor && <AdobeEditor  />}
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