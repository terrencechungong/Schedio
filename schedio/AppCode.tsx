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




export default function AppCode({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { showMediaModal, showAiGenCaption, showAddLabelFromSchedulePost, showSelectPostTimeModal,
        showPostNowModal, showUserPermissionModal, showAddTeamMemberModal
     } = useModalStatesContext();


    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <AnimatePresence>
                {showAddTeamMemberModal &&
                <AddTeamMemberModal/>}
            </AnimatePresence>
            <AnimatePresence>
                {showUserPermissionModal &&
                <UserPermissionsModal/>}
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
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}