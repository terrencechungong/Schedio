// @ts-ignore
import { useModalStatesContext } from '@/layout.tsx'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';
import { X } from 'lucide-react';


export const VideoEditorModal = () => {
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
        zIndex: 21
    };
    const { setShowVideoEditorModal, shortVideoForPostData } = useModalStatesContext();
    const [loaded, setLoaded] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframeRef.current && shortVideoForPostData.url) {
            // Send the video source to the iframe
            console.log("in if statement")
            iframeRef.current.onload = () => {
                console.log("send message")
                iframeRef.current?.contentWindow?.postMessage(
                    { type: "SET_VIDEO_SRC", src: "https://res.cloudinary.com/dtwy7cntj/video/upload/v1734187997/Is_College_Necessary_For_Everyone_nmhghe.mp4" },
                    "*" // Replace "*" with your iframe's origin for security (e.g., "http://localhost:5000")
                );
            };
        }
    }, []);

    return (
        <div
            onClick={() => setShowVideoEditorModal(false)}
            style={containerStyle}>
            <motion.div
                className="video-editor-wrapper light"
                onClick={(e) => e.stopPropagation()}
                style={{ width: '90%', height: '90%', position: 'relative' }}>
                {!loaded && (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#f0f0f0",
                        }}
                    >
                        <CircularProgress style={{ color: 'hsl(262.1, 83.3%, 57.8%)' }} />
                    </div>
                )}
                <div
                    onClick={() => setShowVideoEditorModal(false)}
                    style={{ position: 'absolute', top: '-20px', right: '-20px' }}
                    className='rounded-full p-2 bg-accent hover:bg-gray-300 cursor-pointer colors transition-colors transition-duration-300'>
                    <X />

                </div>
                <iframe
                    ref={iframeRef}
                    src={`http://localhost:5173`} // Replace with your deployed URL
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                    }}
                    title="Video Editor"
                    onLoad={() => setLoaded(true)}
                ></iframe>
            </motion.div>
        </div>

    )
}