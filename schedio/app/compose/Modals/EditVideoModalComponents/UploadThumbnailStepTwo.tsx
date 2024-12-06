import styles from '../../ScssModules/editmediamodal.module.scss';
import { useModalStatesContext } from '@/app/layout';
import { Check, Crop, Scissors, Trash2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Tooltip from '@mui/material/Tooltip';
import { useRef } from 'react';
import { useToast } from "@/hooks/use-toast"
import React from 'react';
import { useEditVideoModalContext } from './EditVideoModalContext';
import { ToastAction } from '@/components/ui/toast';
import { Skeleton } from '@/components/ui/skeleton';


export const UploadThumbnailStepTwo = () => {
    const { setShowEditVideoModal, setShortVideoForPostData } = useModalStatesContext();
    const { setScreenPhase, thumbnailToBeSetNext, setThumbnailToBeSetNext } = useEditVideoModalContext();

    const { toast } = useToast();

    const saveThumbnail = () => {
        setShortVideoForPostData((prev) => ({ ...prev, thumbnail:thumbnailToBeSetNext }));
        toast({
            description: "✅ Thumbnail successfully updated.",
            duration: 5000,
        });
        setScreenPhase(0); // go back to main page
    }

    const discardThumbnail = () => {
        setScreenPhase(0); // go back to main page
        toast({
            title: 'Thumbnail Discarded',
            action: <ToastAction
                onClick={() => setScreenPhase(1)}
                altText="Undo">Undo</ToastAction>,
            duration: 5000
        })
    }

    return (<>
        <div className={styles.header}>
            <div style={{ flexGrow: 1, fontWeight: '600', fontSize: '18px' }}>Select Thumbnail Crop Area</div>
            <X size={30} className={styles.createPostIcon} onClick={() => setShowEditVideoModal(false)} />
        </div>
        <div style={{ width: '100%', height: 'auto', marginBottom: '10px' }}>
            {/* CROP IMAGE HERRR */}
            {thumbnailToBeSetNext.url != '' ? <img src={thumbnailToBeSetNext.url} style={{ width: '100%', height: '100%' }} /> :
                 <Skeleton className="w-full" style={{height:'515px'}}/>
            }
        </div>
        <div style={{ width: '100%', alignItems:'center', display:'flex', justifyContent:'center', gap:'9px' }}>
            <Button
                onClick={() => discardThumbnail()}
                className="p-5 bg-accent text-black bg-gray-300 hover:bg-gray-400 shadow-none">Discard Thumbnail <Trash2 /></Button>
            <Button
                onClick={() => saveThumbnail()}
                className="p-5 bg-[#5cc98d] hover:bg-[#48a071] text-white shadow-none">
                Save Thumbnail <Check /></Button>
        </div>
    </>
    )
}