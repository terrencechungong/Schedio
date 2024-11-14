import { motion } from "framer-motion";
import styles from './addiconfromschedulepost.module.scss'
import { useModalStatesContext } from "../layout";
import { X } from "lucide-react";




export const AddIconFromSchedulePostModal: React.FC = () => {
    const { setShowAddLabelFromSchedulePost } = useModalStatesContext();
    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20
    }
    const labels: any[] = [];

    return (
        <div
            style={containerStyle}
            onClick={() => setShowAddLabelFromSchedulePost(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <p style={{ fontSize: '24px', fontWeight: 600 }}>Add label</p>
                    <X style={{ alignSelf: 'flex-start' }} />
                </div>
                <div className={styles.labelColumns}>
                    {labels.map((label, index) => (
                        <div className={styles.labelRow}>

                            <div className={styles.label}>
                            </div>
                            <div className={styles.editLabel}>
                            </div>
                        </div>
                    ))}

                </div>
            </motion.div>
        </div>

    )
}