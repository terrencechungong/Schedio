"use client"
import styles from '../ScssModules/compose.module.scss';
import React, { RefObject } from 'react';
import { MessageSquareMore } from 'lucide-react';
import { Camera } from 'lucide-react';


interface CreatePostHeaderProps {
    divRef: RefObject<HTMLDivElement>; // Prop for the div ref
}


export const CreatePostHeader: React.FC<CreatePostHeaderProps> = ({ divRef }) => {

    return (
        <div className={styles.createPostHeader} ref={divRef}>
            <div className={styles.createPostMessageIcon}>
                <MessageSquareMore color='#7C3AED' size='26px' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '58px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Create a post</p>
                <p style={{ fontSize: '16px', color: 'grey' }}>Create a high-impact post to share your message</p>
            </div>
        </div>
    )
}