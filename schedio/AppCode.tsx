import { AppSidebar } from "./app/app-sidebar";
import { AddMediaModal } from "./app/compose/AddMediaModal";
import { useModalStatesContext } from "./app/layout";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";




export default function AppCode({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { showMediaModal, setShowMediaModal } = useModalStatesContext();


    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {showMediaModal && 
            <AddMediaModal />}
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}