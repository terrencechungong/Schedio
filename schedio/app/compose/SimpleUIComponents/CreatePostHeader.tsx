"use client"
import styles from '../ScssModules/compose.module.scss';
import React, { RefObject } from 'react';
import { MessageSquareMore, SquarePen } from 'lucide-react';
import { Camera } from 'lucide-react';
import postIcon from '../../assets/post.png'
import blog from '../../assets/blog.png'

interface CreatePostHeaderProps {
    divRef: RefObject<HTMLDivElement>; // Prop for the div ref
}


export const CreatePostHeader: React.FC<CreatePostHeaderProps> = ({ divRef }) => {

    return (
        <div className={styles.createPostHeader} ref={divRef}>
            <div className='bg-[#E8E1F5] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                <img src={blog.src} width={"27px"} height={"27px"} />
            </div>

            <h4 style={{  fontWeight: '600', fontSize: '18px', margin:0 }}>Create A Post</h4>
        </div>
    )
}