import { useModalStatesContext } from '@/app/layout'
import { VideoEditor } from '../../../../video-editor/dist/video-editor.es'
import React from 'react'
import { motion } from 'framer-motion';
import  '../../../../video-editor/dist/style.css'
import ShadowDOM from "react-shadow";

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
    const cssPath = '../../../../video-editor/dist/style.css';

    return (
        <div
            onClick={() => setShowVideoEditorModal(false)}
            style={containerStyle}>
            <motion.div
                className="video-editor-wrapper light"
                onClick={(e) => e.stopPropagation()}
                style={{ width: '90%', height: '90%', position: 'relative' }}>

                <VideoEditor src={shortVideoForPostData.url} />
            </motion.div>
        </div>

    )
}