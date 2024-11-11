"use client"
import styles from './compose.module.scss';
import React, { RefObject } from 'react';
import { MessageSquareMore } from 'lucide-react';
import { Camera } from 'lucide-react';


interface CreatePostHeaderProps {
    divRef: RefObject<HTMLDivElement>; // Prop for the div ref
  }
  

export const CreatePostHeader: React.FC<CreatePostHeaderProps> = ({ divRef })=> {

    return (
        <div className={styles.createPostHeader} ref={divRef}>
            <div className={styles.createPostMessageIcon}>
                <MessageSquareMore color='#7C3AED' size='26px' />
            </div>
            <div>
                <h6 style={{ padding: 0, margin: 0 }}>Create a post</h6>
                <p style={{ fontSize: '13px', lineHeight: '15px', color: 'rgb(120, 120, 120)' }}>Create a high-impact post to share your message</p>
            </div>
        </div>
    )
}