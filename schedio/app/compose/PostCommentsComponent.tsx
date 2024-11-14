import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from './postcomments.module.scss';
import { MessageData } from "./mockData";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { SmilePlus } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export const PostCommentsComponent: React.FC = () => {

    const emojiClassName = `${styles.emojiCount} text-primary border-primary`;
    const [showEmoji, setShowEmoji] = useState(false);
    const [emojiPosition, setEmojiPosition] = useState<{ top: number; left: number } | null>(null);
    const selectedMessage = useRef(null);
    const [messageData, setMessageData] = useState(MessageData);
    const [showingReplies, setShowingReplies] = useState<{ [key: string]: boolean }>(messageData.reduce((acc, message) => ({
        ...acc,
        [message.id]: false
    }), {}));

    useEffect(() => {
        const hideEmoji = () => {
            if (showEmoji) setShowEmoji(false);
        };
        window.addEventListener('click', hideEmoji);
        return () => {
            window.removeEventListener('click', hideEmoji);
        };
    }, [showEmoji]);


    const onSmileClick = (e: React.MouseEvent<HTMLDivElement>, message: any) => {
        e.stopPropagation();
        selectedMessage.current = message.id;
        if (showEmoji) {
            setShowEmoji(false)
            return
        }
        const rect = e.currentTarget.getBoundingClientRect();
        // since the left of the card will change with size ill change this too
        console.log(rect.bottom)
        console.log(rect.left)
        setEmojiPosition({
            top: rect.bottom,
            left: 0,
        });
        setShowEmoji(true)
    };

    const addEmoji = (emoji: EmojiClickData) => {
        setMessageData((prevData) =>
            prevData.map((msg) =>
                msg.id === selectedMessage.current
                    ? {
                        ...msg,
                        reactions: [
                            ...msg.reactions,
                            { emoji: emoji.emoji, reactor: "Alice", counted: false },
                        ],
                    }
                    : msg
            )
        );
        setShowEmoji(false)
    }

    const toggleReplies = (id: string) => {
        setShowingReplies((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };


    return (
        <div className={`${styles.container} bg-accent`}>
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'absolute',
                    display: showEmoji ? 'block' : 'none',
                    top: emojiPosition?.top,
                    left: emojiPosition?.left,
                    zIndex: 100,
                    paddingBottom: '10px',
                }}
            >
                <EmojiPicker
                    height={375}
                    previewConfig={{ showPreview: false }}
                    onEmojiClick={(e) => { addEmoji(e) }}
                />
            </div>
            {messageData.map((message, index) => {
                return (
                    <div key={index} className={`${styles.messageContainer} shadow-md`}>
                        <div className={styles.messageHeader}>
                            <div className={styles.senderInfo}>
                                <Avatar>
                                    <AvatarFallback>
                                        {message.sender.charAt(0)}C
                                    </AvatarFallback>
                                </Avatar>
                                <p>{message.sender}</p>
                            </div>
                            <div>
                                {message.dateSent}
                            </div>
                        </div>
                        <div className={styles.messageBody}>
                            {message.body}
                        </div>
                        <div className={styles.reactionsAndReplyButton}>
                            <div className={styles.reactions}>
                                {Object.entries(message.reactions.reduce<Record<string, number>>((acc, reaction) => ({
                                    ...acc,
                                    [reaction.emoji]: (acc[reaction.emoji] || 0) + 1
                                }), {})).map(([emoji, count], index) => (
                                    <div key={index} className={emojiClassName}>
                                        {emoji} {count}
                                    </div>
                                ))}
                                {/* </div> */}
                                <div className={`${styles.addReactionButton} rounded-lg bg-accent`}
                                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onSmileClick(e, message)}>
                                    <SmilePlus size={12} strokeWidth={1.25} />
                                </div>
                            </div>

                            <p className={`text-primary ${styles.replyButton}`}>Reply</p>
                        </div>
                        <div className={styles.replies}>
                            {message.replies.map((reply, index) => {
                                const style = { display: showingReplies[message.id] ? 'flex' : 'none' }
                                return (
                                    <div key={index} className={styles.firstReply} style={index > 0 ? style : {}}>
                                        <Avatar><AvatarFallback>{reply.sender.charAt(0)}V</AvatarFallback></Avatar>
                                        <div className={`${styles.replyMessageBox} bg-accent`}>
                                            <div className={styles.replyMessageHeader}>
                                                <p style={{ fontWeight: 'bold' }}>{reply.sender}</p>
                                                <p>{reply.dateSent}</p>
                                            </div>
                                            <p>{reply.body}</p>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                        {(message.replies.length > 1 && showingReplies[message.id]) &&
                            <div className={styles.showMoreOrLess} onClick={() => toggleReplies(message.id)}>Show Less</div>}
                        {(message.replies.length > 1 && !showingReplies[message.id]) &&
                            <div className={styles.showMoreOrLess} onClick={() => toggleReplies(message.id)}>Show More</div>}
                    </div>
                )
            })}
        </div >
    )
}


// hide emojis that cant show on this platform
// change toggler so you can close but not open