"use client"
import styles from '../ScssModules/compose.module.scss';
import React, { RefObject } from 'react';
import { MessageSquareMore, SquarePen } from 'lucide-react';
import { Camera } from 'lucide-react';
import postIcon from '../../assets/post.png';
import videoEdit from '../../assets/video-editing-app.png';
import videoCam from '../../assets/video-camera.png'
import blog from '../../assets/blog.png'
import { useModalStatesContext } from '@/app/layout';

interface CreatePostHeaderProps {
    divRef: RefObject<HTMLDivElement>; // Prop for the div ref
}


export const CreatePostHeader: React.FC<CreatePostHeaderProps> = ({ divRef }) => {
    const { postTypeIsShort } = useModalStatesContext();

    return (
        <div className={styles.createPostHeader} ref={divRef}>
            {postTypeIsShort && <>
                <div className='bg-[#E8E1F5] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src={videoCam.src} width={"28px"} height={"28px"} />
                </div>

                <h4 style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>Create A Short Video</h4>
            </>}
            {!postTypeIsShort && <>
                <div className='bg-[#E8E1F5] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src={blog.src} width={"27px"} height={"27px"} />
                </div>

                <h4 style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>Create A Post</h4>
            </>}
        </div>
    )
}