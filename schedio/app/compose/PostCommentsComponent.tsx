import React from "react";
import styles from './postcomments.module.scss';
import { MessageData } from "./mockData";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { SmilePlus } from "lucide-react";

export const PostCommentsComponent: React.FC = () => {


    const hideReplies = () => {

    }

    const showReplies = () => {
        
    }

    return (
        <div className={styles.container}>
            {MessageData.map((message, index) => {
                message.reactions = message.reactions.sort((a, b) => a.emoji.localeCompare(b.emoji));
                return(
                <div className={styles.messageContainer}>
                    <div className={styles.messageHeader}>
                        <Avatar>
                            <AvatarFallback>
                                {message.sender.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <p>{message.sender}</p>
                    </div>

                    <div className={styles.messageBody}>
                        {message.body}
                    </div>

                    <div className={styles.reactionsAndReplyButton}>
                        <div className={styles.reactions}>
                            {/* {message.reactions.map((reaction, index) => {
                                if (index == 0 || reaction == message.reactions[index - 1]) {
                                    return (

                                    )
                                } else {
                                    return (

                                    )
                                }
                            })} */}
                            <div className={styles.addReactionButton}>
                                <SmilePlus size={20}/>
                            </div>
                        </div>

                        <div className={styles.replyButton}>
                            <p>Reply</p>
                        </div>
                    </div>
                    <div className={styles.replies}>
                        {message.replies.map((reply, index) => {
                            if (index == 0) {
                                return (
                                    <div className={styles.firstReaction}>
                                        <Avatar><AvatarFallback>{reply.sender}</AvatarFallback></Avatar>
                                        <p>{reply.body}</p>
                                    </div>
                                )
                            } else{ 
                                return (
                                    <div className={styles.otherReaction}>
                                    <Avatar><AvatarFallback>{reply.sender}</AvatarFallback></Avatar>
                                    <p>{reply.body}</p>
                                </div>
                                )
                            }
                        })}
                    </div>
                {/* REPLY SECTION USE CSS */}

                </div>
            )})}


        </div >
    )
}