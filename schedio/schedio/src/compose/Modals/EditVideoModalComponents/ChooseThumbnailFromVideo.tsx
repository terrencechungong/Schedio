import { ChevronLeft, X } from 'lucide-react';
// @ts-ignore
import styles from '../../ScssModules/editmediamodal.module.scss';
// @ts-ignore
import { Skeleton } from '@/components/ui/skeleton';
// @ts-ignore
import { useEditVideoModalContext } from './EditVideoModalContext';
// @ts-ignore
import { useModalStatesContext } from '@/layout';
// @ts-ignore
import { Button } from '@/components/ui/button';
// @ts-ignore
import FrameSelector from './FrameSelector';



export const ChooseThumbnailFromVideo = () => {
    const { setScreenPhase, thumbnailToBeSetNext, setThumbnailToBeSetNext } = useEditVideoModalContext();
    const { setShowEditVideoModal, setShortVideoForPostData } = useModalStatesContext();


    return (<>
        <div className={styles.header}>
            <div style={{ fontWeight: '600', fontSize: '18px', display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center' }}>
                <div
                    onClick={() => setScreenPhase(0)}
                    className={styles.createPostIcon}>
                    <ChevronLeft />
                </div>
                <span style={{ flexGrow: 1 }}>Choose Thumbnail</span>
            </div>
            <X size={30} className={styles.createPostIcon} onClick={() => setShowEditVideoModal(false)} />
        </div>
        <div style={{ width: '100%', height: 'auto' }}>
            <FrameSelector />
        </div>
    </>
    )
}