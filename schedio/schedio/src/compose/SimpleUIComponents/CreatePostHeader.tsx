import styles from '../ScssModules/compose.module.scss';
import React, { RefObject } from 'react';
import { MessageSquareMore, SquarePen } from 'lucide-react';
import { Camera } from 'lucide-react';
import { PostType, useModalStatesContext } from '../../../src/layout';

interface CreatePostHeaderProps {
    divRef: RefObject<HTMLDivElement>; // Prop for the div ref
}


export const CreatePostHeader: React.FC<CreatePostHeaderProps> = ({ divRef }) => {
    const { postTypeData } = useModalStatesContext();

    return (
        <div className={styles.createPostHeader} ref={divRef}>
            {postTypeData.type == PostType.SHORT && <>
                <div className='bg-[#E8E1F5] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src="/assets/video-camera.png" width={"28px"} height={"28px"} />
                </div>

                <h4 style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>Create A Short Video</h4>
            </>}
            {!(postTypeData.type == PostType.SHORT) && <>
                <div className='bg-[#E8E1F5] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src="/assets/blog.png" width={"27px"} height={"27px"} />
                </div>

                <h4 style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>Create A Post</h4>
            </>}
        </div>
    )
}