// @ts-ignore
import { useToast } from '@/hooks/use-toast.tsx';

// @ts-ignore
import styles from '../../ScssModules/editmediamodal.module.scss';
// @ts-ignore
import { useEditVideoModalContext } from './EditVideoModalContext.tsx';
// @ts-ignore
import { useRef } from 'react';
// @ts-ignore
import { Button } from '@/components/ui/button.tsxs';
// @ts-ignore
import Tooltip from '@mui/material/Tooltip';
// @ts-ignore
import { ChevronLeft, Scissors, Upload, X } from 'lucide-react';
// @ts-ignore
import { useModalStatesContext } from '@/layout.tsx';
// @ts-ignore
import { Skeleton } from '@/components/ui/skeleton.tsx';



export const ViewThumbnail: React.FC = () => {
    const { setShowEditVideoModal, shortVideoForPostData } = useModalStatesContext();
    const { setScreenPhase } = useEditVideoModalContext();

    return (<>
        <div className={styles.header}>
            <div style={{ fontWeight: '600', fontSize: '18px', display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center' }}>
                <div
                    onClick={() => setScreenPhase(0)}
                    className={styles.createPostIcon}>
                    <ChevronLeft />
                </div>
                <span style={{ flexGrow: 1 }}>View Thumbnail</span>
            </div>
            <X size={30} className={styles.createPostIcon} onClick={() => setShowEditVideoModal(false)} />
        </div>
        <div style={{ width: '100%', height: 'auto', marginBottom: '10px' }}>
            {shortVideoForPostData.thumbnail != null ? <img src={shortVideoForPostData.thumbnail.url} style={{ width: '100%', height: '100%' }} /> :
                <Skeleton style={{ width: '100%', height: '500px' }} />}
        </div>
    </>
    )
}