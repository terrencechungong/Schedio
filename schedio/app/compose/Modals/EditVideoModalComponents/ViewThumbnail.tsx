import { useToast } from '@/hooks/use-toast';
import styles from '../../ScssModules/editmediamodal.module.scss';
import { useEditVideoModalContext } from './EditVideoModalContext';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Tooltip from '@mui/material/Tooltip';
import { ChevronLeft, Scissors, Upload, X } from 'lucide-react';
import { useModalStatesContext } from '@/app/layout';
import { Skeleton } from '@/components/ui/skeleton';



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