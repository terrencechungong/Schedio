"use client"
import { CircleUser, MessageSquareText, MoveUpRight, ThumbsUp } from 'lucide-react';
import { useModalStatesContext } from '../layout';
import styles from './postpreview.module.scss'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const PostPreviewComponent: React.FC = () => {
    const { postCaption } = useModalStatesContext();

    return (
        <div className={styles.container}>


            <div className={styles.genericPostPreviewContainer}>
                <div className={styles.genericPostPreviewHeader}>
                    <Avatar>
                        <AvatarFallback style={{backgroundColor:'#7d4ecd', color:'white'}}>GP</AvatarFallback>
                    </Avatar>
                    <p style={{ fontSize: '14px' }}>Post Preview</p>
                </div>


                <div className={styles.genericPostPreviewCaption}>
                    <p style={{ fontSize: '13px', margin: 0, padding: 0, }}>{postCaption}</p>
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