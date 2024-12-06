import styles from '../../ScssModules/editmediamodal.module.scss';
import { useModalStatesContext } from '@/app/layout';
import { Crop, Scissors, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Tooltip from '@mui/material/Tooltip';
import { useRef } from 'react';
import { useToast } from "@/hooks/use-toast"
import React from 'react';
import { useEditVideoModalContext } from './EditVideoModalContext';
import { ToastAction } from '@/components/ui/toast';


export const EditVideoMainPage: React.FC = () => {
    const { setShowEditVideoModal, mediaBeingEditedUrl, setShortVideoForPostData, shortVideoForPostData } = useModalStatesContext();
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

                setScreenPhase(1) // got to next page

            };

            img.onerror = () => {
                URL.revokeObjectURL(url);
                toast({
                    title: 'Uh oh! Something went wrong',
                    description: "⚠️ There was an error updating the thumbnail.",
                    duration: 5000,
                })
            };

            img.src = url; // Start loading the image
        } else {
            toast({
                title: 'Uh oh! Something went wrong',
                description: "⚠️ No file was provided.",
                duration: 5000,
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
            description: "Video removed from post🗑️",
            action: <ToastAction
                onClick={() => setShortVideoForPostData(videoData)}
                altText="Undo">Undo</ToastAction>,
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
            <video src={mediaBeingEditedUrl} style={{ width: '100%', height: '100%' }} loop controls />
        </div>
        <div style={{ width: '100%', marginBottom: '18px' }}>
            <p style={{ fontWeight: '500', fontSize: '15px', marginBottom: '9px' }}>Thumbnail Actions</p>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '9px', flexWrap: 'wrap' }}>
                <Button className="p-5 bg-accent hover:bg-gray-200 text-black shadow-none">View Thumbnail</Button>
                <Tooltip title="Select a frame from the video" placement="top" arrow followCursor>
                    <Button className="p-5 bg-accent hover:bg-gray-200 text-black shadow-none">Choose Thumbnail</Button>
                </Tooltip>
                <Tooltip title="Choose a photo from your files" placement="top" arrow followCursor>
                    <Button
                        onClick={() => {
                            if (thumbanilFileRef.current) thumbanilFileRef.current.click()
                        }}
                        className="p-5 bg-accent hover:bg-gray-200 text-black shadow-none">Upload Thumbnail<Upload /></Button>
                </Tooltip>
            </div>
        </div>
        <div style={{ width: '100%' }}>
            <p style={{ fontWeight: '500', fontSize: '15px', marginBottom: '9px' }}>Video Editing</p>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '9px', flexWrap: 'wrap' }}>
                <Button className="p-5 bg-accent hover:bg-gray-200 text-black shadow-none">Crop <Crop /></Button>
                <Tooltip title="Trim the video length" placement="top" arrow followCursor>
                    <Button className="p-5 bg-accent hover:bg-gray-200 text-black shadow-none">Trim<Scissors /></Button>
                </Tooltip>
                <Tooltip title="Remove the video from the post" placement="top" arrow followCursor>
                    <Button className="p-5 bg-white hover:bg-red-100 text-red-700 shadow-none"
                        onClick={() => removeVideoFromPost()}
                    >
                        Remove
                    </Button>
                </Tooltip>
            </div>
        </div>
        <input ref={thumbanilFileRef} type='file' accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
    </>
    )
}