import { useModalStatesContext } from "@/layout";
import { motion } from "framer-motion";
import styles from '../ScssModules/postnowmodal.module.scss'
import { Button } from "@/components/ui/button";
import { FaLinkedin } from "react-icons/fa";


export const PostNowModal = () => {
    const { setShowPostNowModal } = useModalStatesContext();
    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '78px',
        zIndex: 20
    };

    return (
        <div
            style={containerStyle}
            onClick={() => setShowPostNowModal(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className={`${styles.modalContainer} rounded-md`} onClick={(e) => e.stopPropagation()}>
                <h3>Publish</h3>
                <p style={{ fontSize: '18px' }}>This post will be published to the selected channels in a few minutes. Do you want to proceed?</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center', fontSize: '18px', paddingBottom: '4pxs' }}>
                        <FaLinkedin size={20} color="#0a66c2" />
                        Terrence Chungong
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center', fontSize: '18px' }}>
                        <FaLinkedin size={20} color="#0a66c2" />
                        Terrence Chungong
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center', fontSize: '18px' }}>
                        <FaLinkedin size={20} color="#0a66c2" />
                        Terrence Chungong
                    </div>

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '11px' }}>
                        <Button
                            onClick={() => setShowPostNowModal(false)}
                            className="bg-accent text-black hover:bg-gray-200 hover:brightnes-90 shadow-none p-6">Cancel</Button>
                        <Button
                            className="bg-[#5cc98d] hover:bg-[#48a071] text-white p-6">Post now</Button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}