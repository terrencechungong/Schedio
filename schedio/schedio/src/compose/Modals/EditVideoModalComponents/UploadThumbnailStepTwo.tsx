// @ts-ignore
import styles from '../../ScssModules/editmediamodal.module.scss';
// @ts-ignore
import { useModalStatesContext } from '@/layout.tsx';
// @ts-ignore
import { Check, Crop, Scissors, Trash2, Upload, X } from 'lucide-react';
// @ts-ignore
import { Button } from '@/components/ui/button.tsx';
// @ts-ignore
import Tooltip from '@mui/material/Tooltip';
// @ts-ignore
import { useRef } from 'react';
// @ts-ignore
import { useToast } from "@/hooks/use-toast.tsx"
// @ts-ignore
import React from 'react';
// @ts-ignore
import { useEditVideoModalContext } from './EditVideoModalContext.tsx';
// @ts-ignore
import { ToastAction } from '@/components/ui/toast.tsx';
// @ts-ignore
import { Skeleton } from '@/components/ui/skeleton.tsx';
// @ts-ignore
import ImageCropper from '../ImageCropper.tsx';


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