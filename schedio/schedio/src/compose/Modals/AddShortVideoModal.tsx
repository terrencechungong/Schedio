// @ts-ignore
import { useModalStatesContext } from "@/layout";
// @ts-ignore
import { motion } from "framer-motion";
// @ts-ignore
import videoIcon from '../../assets/online-video_12670011.png'
// @ts-ignore
import videoCutIcon from '../../assets/video-editing-app.png'
// @ts-ignore
import videoEdit from '../../assets/Untitled design (1).png'
// @ts-ignore
import { X } from "lucide-react";
// @ts-ignore
import styles from '../ScssModules/addshortvideomodal.module.scss'
// @ts-ignore
import { useRef } from "react";
// @ts-ignore
import { generateRandom4Digit } from "@/utilFunctions";

export const AddShortVideoModal = () => {
    const { setShowAddShortVideoModal, setShortVideoForPostData } = useModalStatesContext();
    const inputFileRef = useRef(null);
    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file && (file.type === "video/mp4" || file.type === "video/quicktime")) {
            const url = URL.createObjectURL(file); // Create a URL for the video
            const video = document.createElement("video"); // Create a video element
            video.src = url;

            // Extract metadata
            video.onloadedmetadata = () => {
                const width = video.videoWidth; // Video's natural width
                const height = video.videoHeight; // Video's natural height
                const naturalAspectRatio = width / height; // Aspect ratio
                console.log(width, height);
                setShortVideoForPostData({
                    thumbnail: null,
                    defined: true,
                    fileType: file.type,
                    naturalAspectRatio,
                    beingEdited: true,
                    url
                })
                setShowAddShortVideoModal(false)
                video.currentTime = 4 / (video.fps || 24); // Assuming 24 FPS as default if FPS is not provided
                video.onseeked = () => {
                    // Create a canvas to capture the frame
                    const canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(video, 0, 0, width, height);
        
                    // Convert the canvas to a URL for the thumbnail
                    const thumbnailUrl = canvas.toDataURL("image/png"); // PNG format for better quality
                    const thumbnail = {
                        url: thumbnailUrl,
                        naturalAspectRatio,
                        fileType: 'image/png',
                        thumbnailIsFromVideo: true,
                        tumbnailTimestamp: 0.0
                    }
        
                    // Update state with the thumbnail URL and other metadata
                    setShortVideoForPostData((prev) => ({...prev, thumbnail, beingEdited:false}))
                }

                // Cleanup
                // URL.revokeObjectURL(url); // Clean up the URL
                video.remove(); // Remove the video element
            };
        } else {
            alert("Please upload a valid MP4 or MOV video file.");
        }
    }

    return (
        <div
            style={containerStyle}
            onClick={() => setShowAddShortVideoModal(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className="rounded-lg"
                style={{
                    width: '600px', height: '400px', backgroundColor: "white",
                    padding: '20px', position: 'relative'
                }} onClick={(e) => e.stopPropagation()}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', padding: '12px 12px 0 0' }}>Add Short Video</h2>
                <div
                    onClick={() => setShowAddShortVideoModal(false)}
                    className={styles.xIcon}>
                    <X size={20} />
                </div>
                <div className="bg-accent" style={{
                    border: '3px dashed grey', width: '100%', display: 'flex', alignItems: 'center',
                    flexDirection: 'column', gap: '8px', justifyContent: 'center', borderRadius: '5px', height: '260px',
                    cursor: 'pointer'
                }}
                    onClick={() => {
                        if (inputFileRef) inputFileRef.current.click()
                    }}
                >
                    <img src={videoEdit} style={{ width: '105px', height: '105px' }} />
                    <div style={{ alignSelf: 'center', textAlign: 'center' }}>
                        <p >Drag and drop, or click to upload your video</p>
                        <i style={{ color: 'rgb(120, 120, 120)', fontSize: '14px' }}>video/mp4, video/quicktime, video/mov</i>
                    </div>
                </div>
                <input ref={inputFileRef} style={{ display: 'none' }} type="file" accept="video/mp4,video/quicktime" onChange={handleFileChange} />
            </motion.div>
        </div>
    );
}