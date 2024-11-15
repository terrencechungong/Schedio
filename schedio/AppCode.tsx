import { AnimatePresence } from "framer-motion";
import { AppSidebar } from "./app/app-sidebar";
import { AddMediaModal } from "./app/compose/Modals/AddMediaModal";
import { AiGenGaption } from "./app/compose/AIComposeRelated/AiGenGaption";
import { useModalStatesContext } from "./app/layout";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { AddIconFromSchedulePostModal } from "./app/compose/Modals/AddIconFromSchedulePostModal";
import { SelectTimeToScheduleModal } from "./app/compose/Modals/SelectTimeToScheduleModal";




export default function AppCode({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { showMediaModal, showAiGenCaption, showAddLabelFromSchedulePost, showSelectPostTimeModal } = useModalStatesContext();


    return (
        <div style={{ width: '100vw', height: '100vh' }}>
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