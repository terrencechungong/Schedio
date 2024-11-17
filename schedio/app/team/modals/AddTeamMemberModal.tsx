import { motion } from "framer-motion";
import styles from '../ScssModules/addteammembermodal.module.scss'
import { useModalStatesContext } from "@/app/layout";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

export const AddTeamMemberModal = () => {
    const { setShowAddTeamMemberModal } = useModalStatesContext();

    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: '120px',
        // alignItems: 'center',
        zIndex: 20
    };




    return (
        <div
            style={containerStyle}
            onClick={() => setShowAddTeamMemberModal(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <h3>Invite team member</h3>
                    <Button
                        onClick={() => setShowAddTeamMemberModal(false)}
                        className="shadow-none bg-transparent text-black hover:bg-accent !p-2">
                        <X
                            style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                            size={50} />
                    </Button>
                </div>

                <div style={{display:'flex', flexDirection:'column', paddingBottom:'7px'}}>
                    <h4 style={{fontWeight:'500'}}>Email</h4>
                    <Input className="w-full " />
                </div>


                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flexGrow: 1, alignItems: 'flex-end', gap: '8px', justifyContent: 'flex-end' }}>
                    {/* <Button>Discard</Button> */}
                    <Button
                        onClick={() => setShowAddTeamMemberModal(false)}
                        className="bg-accent text-black hover:bg-gray-200 shadow-none">Cancel</Button>
                    <Button className="bg-[#5cc98d] hover:bg-[#48a071] text-white shadow-none">Save changes</Button>
                </div>
            </motion.div>
        </div>
    )
}