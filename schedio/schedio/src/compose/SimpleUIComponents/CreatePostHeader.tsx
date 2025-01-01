
 // @ts-ignore 
import styles from '../ScssModules/compose.module.scss';
 // @ts-ignore 
import React, { RefObject } from 'react';
 // @ts-ignore 
import { MessageSquareMore, SquarePen } from 'lucide-react';
 // @ts-ignore 
import { Camera } from 'lucide-react';
 // @ts-ignore 
import postIcon from '../../assets/post.png';
 // @ts-ignore 
import videoEdit from '../../assets/video-editing-app.png';
 // @ts-ignore 
import videoCam from '../../assets/video-camera.png'
 // @ts-ignore 
import blog from '../../assets/blog.png'
 // @ts-ignore 
import { PostType, useModalStatesContext } from '../../../src/layout.tsx';

interface CreatePostHeaderProps {
    divRef: RefObject<HTMLDivElement>; // Prop for the div ref
}


export const CreatePostHeader: React.FC<CreatePostHeaderProps> = ({ divRef }) => {
    const { postTypeData } = useModalStatesContext();

    return (
        <div className={styles.createPostHeader} ref={divRef}>
            {postTypeData.type == PostType.SHORT && <>
                <div className='bg-[#E8E1F5] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src={videoCam.src} width={"28px"} height={"28px"} />
                </div>

                <h4 style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>Create A Short Video</h4>
            </>}
            {!(postTypeData.type == PostType.SHORT) && <>
                <div className='bg-[#E8E1F5] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src={blog.src} width={"27px"} height={"27px"} />
                </div>

                <h4 style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>Create A Post</h4>
            </>}
        </div>
    )
}