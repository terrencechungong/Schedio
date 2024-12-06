import { useModalStatesContext } from '@/app/layout';
import { motion } from 'framer-motion';
import styles from '../../ScssModules/editmediamodal.module.scss';
import { EditVideoMainPage } from './EditVideoMainPage';
import { useEditVideoModalContext } from './EditVideoModalContext';
import { EditVideoModalContextProvider } from './EditVideoModalContext'
import { UploadThumbnailStepTwo } from './UploadThumbnailStepTwo';

export const EditVideoModalWrapper = () => {

    return (
        <EditVideoModalContextProvider>
            <EditVideoModal />
        </EditVideoModalContextProvider>
    )
}

const EditVideoModal = () => {
    const { setShowEditVideoModal, mediaBeingEditedUrl, setShortVideoForPostData } = useModalStatesContext();
    const { setScreenPhase, screenPhase } = useEditVideoModalContext();

    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'row',
        overflowY: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20
    };



    return (
        <div
            style={containerStyle}
            onClick={() => setShowEditVideoModal(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                {screenPhase == 0 && <EditVideoMainPage />}
                {screenPhase == 1 && <UploadThumbnailStepTwo />}
            </motion.div>
        </div>
    )
}





