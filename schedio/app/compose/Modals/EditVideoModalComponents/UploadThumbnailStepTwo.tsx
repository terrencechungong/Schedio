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
import ImageCropper from '../ImageCropper';


export const UploadThumbnailStepTwo = () => {
    const { setShowEditVideoModal, setShortVideoForPostData } = useModalStatesContext();
    const { setScreenPhase, thumbnailToBeSetNext, setThumbnailToBeSetNext } = useEditVideoModalContext();
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const { toast } = useToast();

    const saveThumbnail = () => {
        setShortVideoForPostData((prev) => ({ ...prev, thumbnail: thumbnailToBeSetNext }));
        toast({
            description: "Thumbnail successfully updated ✅",
            duration: 5000,
            className: 'w-[340px]'
        });
        setScreenPhase(0); // go back to main page
    }

    const discardThumbnail = () => {
        setScreenPhase(0); // go back to main page
        toast({
            description: (
                <div className="flex items-center justify-between !p-0 !m-0" style={{ gap: '25px' }}>
                    <span>Thumbnail discarded 🗑️</span>
                    <ToastAction
                        onClick={() => setScreenPhase(1)}
                        altText="Undo">Undo</ToastAction>
                </div>
            ),
            duration: 5000,
            className: 'w-[315px] !p-3'
        })
    }

    return (<>
        <div className={styles.header}>
            <div style={{ flexGrow: 1, fontWeight: '600', fontSize: '18px' }}>Select Thumbnail Crop Area</div>
            <X size={30} className={styles.createPostIcon} onClick={() => setShowEditVideoModal(false)} />
        </div>
        <div style={{ width: '100%', height: 'auto', marginBottom: '10px' }}>
            {/* CROP IMAGE HERRR */}
            {thumbnailToBeSetNext.url != '' ? <ImageCropper forThumbnail={true} previewCanvasRef={previewCanvasRef} initialDimensions={9/16}/> :
                <Skeleton className="w-full" style={{ height: '515px' }} />
            }
        </div>
        <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', gap: '9px' }}>
            <Button
                onClick={() => discardThumbnail()}
                className="p-5 bg-accent text-black bg-gray-300 hover:bg-gray-400 shadow-none">Discard Thumbnail</Button>
            <Button
                onClick={() => saveThumbnail()}
                className="p-5 bg-[#5cc98d] hover:bg-[#48a071] text-white shadow-none">
                Save Thumbnail</Button>
        </div>
    </>
    )
}