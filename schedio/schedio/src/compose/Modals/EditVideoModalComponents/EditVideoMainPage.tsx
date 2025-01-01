// @ts-ignore
import styles from '../../ScssModules/editmediamodal.module.scss';
// @ts-ignore
import { useModalStatesContext } from '@/layout';
// @ts-ignore
import { Crop, Scissors, Upload, X } from 'lucide-react';
// @ts-ignore
import { Button } from '@/components/ui/button';
// @ts-ignore
import Tooltip from '@mui/material/Tooltip';
// @ts-ignore
import { useEffect, useRef } from 'react';
// @ts-ignore
import { useToast } from "@/hooks/use-toast"
// @ts-ignore
import React from 'react';
// @ts-ignore
import { useEditVideoModalContext } from './EditVideoModalContext';
// @ts-ignore
import { ToastAction } from '@/components/ui/toast';
// @ts-ignore
import { Skeleton } from '@/components/ui/skeleton';

export const EditVideoMainPage: React.FC = () => {
    const { setShowEditVideoModal, mediaBeingEditedUrl, setShortVideoForPostData, shortVideoForPostData, setMediaBeingEditedUrl, setShowVideoEditorModal } = useModalStatesContext();
    const { setScreenPhase, screenPhase, setThumbnailToBeSetNext } = useEditVideoModalContext();
    const thumbanilFileRef = useRef(null);
    const { toast } = useToast();

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const url = URL.createObjectURL(file);
            const img = new Image();
            // use cloudinary
            img.onload = async () => {
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                const naturalAspectRatio = width / height;

                const thumbnail = {
                    naturalAspectRatio,
                    url,
                    fileType: file.type,
                };
                setThumbnailToBeSetNext(thumbnail);
                setMediaBeingEditedUrl(thumbnail.url);
                setScreenPhase(1) // got to next page
            };

            img.onerror = () => {
                URL.revokeObjectURL(url);
                toast({
                    title: 'Uh oh! Something went wrong',
                    description: "⚠️ There was an error updating the thumbnail.",
                    duration: 5000,
                    className: 'w-[370px]'
                })
            };

            img.src = url; // Start loading the image
        } else {
            toast({
                title: 'Uh oh! Something went wrong',
                description: "⚠️ No file was provided.",
                duration: 5000,
                className: 'w-[340px]'
            })
        }
    };

    const removeVideoFromPost = () => {
        const videoData = shortVideoForPostData;
        setShortVideoForPostData({
            fileType: "",
            beingEdited: false,
            url: "",
            naturalAspectRatio: 0,
            defined: false,
            thumbnail: null
        })
        toast({
            description: (
                <div className="flex items-center justify-between" style={{ gap: '5px' }}>
                    <span>Video removed from post 🗑️</span>
                    <ToastAction
                        onClick={() => setShortVideoForPostData(videoData)}
                        altText="Undo"
                        className="ml-2" // Optional: Add a small margin
                    >
                        Undo
                    </ToastAction>
                </div>
            ),
            className: 'w-[330px]',
            duration: 5500,
        });
        setShowEditVideoModal(false)
    }


    return (<>
        <div className={styles.header}>
            <div style={{ flexGrow: 1, fontWeight: '600', fontSize: '18px' }}>Edit Video</div>
            <X size={30} className={styles.createPostIcon} onClick={() => setShowEditVideoModal(false)} />
        </div>
        <div style={{ width: '100%', height: 'auto', marginBottom: '10px' }}>
            {shortVideoForPostData.defined ? <video src={shortVideoForPostData.url} style={{ width: '100%', height: '100%' }} loop controls /> :
                <Skeleton style={{ width: '100%', height: '400px' }}></Skeleton>}
        </div>
        <div style={{ width: '100%', marginBottom: '18px' }}>
            <p style={{ fontWeight: '500', fontSize: '15px', marginBottom: '9px' }}>Video Actions</p>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '9px', flexWrap: 'wrap' }}>
                <Button
                    onClick={() => setShowVideoEditorModal(true)}
                    className="p-5 bg-accent hover:bg-gray-200 text-gray-700 shadow-none">Edit Video</Button>
                <Tooltip title="Remove the video from the post" placement="top" arrow followCursor>
                    <Button className="p-5 bg-white hover:bg-red-100 text-red-700 shadow-none"
                        onClick={() => removeVideoFromPost()}
                    >
                        Remove
                    </Button>
                </Tooltip>
            </div>
        </div>
        <div style={{ width: '100%' }}>
            <p style={{ fontWeight: '500', fontSize: '15px', marginBottom: '9px' }}>Thumbnail Actions</p>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '9px', flexWrap: 'wrap' }}>
                <Button
                    onClick={() => setScreenPhase(3)}
                    className="p-5 bg-accent hover:bg-gray-200 text-gray-700 shadow-none">View Thumbnail</Button>
                <Tooltip title="Select a frame from the video" placement="top" arrow followCursor>
                    <Button
                        onClick={() => setScreenPhase(2)}
                        className="p-5 bg-accent hover:bg-gray-200 text-gray-700 shadow-none">Choose Thumbnail</Button>
                </Tooltip>
                <Tooltip title="Choose a photo from your files" placement="top" arrow followCursor>
                    <Button
                        onClick={() => {
                            if (thumbanilFileRef.current) thumbanilFileRef.current.click()
                        }}
                        className="p-5 bg-accent hover:bg-gray-200 text-gray-700 shadow-none">Upload Thumbnail<Upload /></Button>
                </Tooltip>
            </div>
        </div>
        <input ref={thumbanilFileRef} type='file' accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
    </>
    )
}