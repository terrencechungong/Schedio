// @ts-ignore
import { useModalStatesContext } from '@/layout';
// @ts-ignore
import { motion } from 'framer-motion';
// @ts-ignore
import styles from '../../ScssModules/editmediamodal.module.scss';
// @ts-ignore
import { EditVideoMainPage } from './EditVideoMainPage';
// @ts-ignore
import { useEditVideoModalContext } from './EditVideoModalContext';
// @ts-ignore
import { EditVideoModalContextProvider } from './EditVideoModalContext'
// @ts-ignore
import { UploadThumbnailStepTwo } from './UploadThumbnailStepTwo';
// @ts-ignore
import { ViewThumbnail } from './ViewThumbnail';
// @ts-ignore
import { ChooseThumbnailFromVideo } from './ChooseThumbnailFromVideo';

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
                {screenPhase == 3 && <ViewThumbnail/>}
                {screenPhase == 2 && <ChooseThumbnailFromVideo/>}
            </motion.div>
        </div>
    )
}





