"use client"
import { CircleUser, MessageSquareText, MoveUpRight, ThumbsUp } from 'lucide-react';
import { useModalStatesContext } from '../layout';
import styles from './postpreview.module.scss'

export const PostPreviewComponent: React.FC = () => {
    const { postCaption } = useModalStatesContext();

    return (
        <div className={styles.container}>


            <div className={styles.genericPostPreviewContainer}>
                <div className={styles.genericPostPreviewHeader}>
                    <CircleUser size={45} />
                    <p style={{ fontSize: '14px'}}>Post Preview</p>
                </div>


                <div className={styles.genericPostPreviewCaption}>
                    <p style={{ fontSize: '13px', margin:0, padding:0,  }}>{postCaption}</p>
                </div>


                <div className={styles.genericPostPreviewFooter}>
                    <ThumbsUp size={16} />
                    <MessageSquareText size={16} />
                    <MoveUpRight size={16} />
                </div>
            </div>


        </div>
    )
}