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
    const emojiCounterRef = useRef<{ [messageId: string]: { [emoji: string]: [number, number] } }>({});
    const [messageData, setMessageData] = useState(MessageData);
    const [renderTrigger, setRenderTrigger] = useState(false); // Dummy state for re-rendering

    const toggleRender = () => setRenderTrigger((prev) => !prev); // Function to trigger re-render

    // Populate `emojiCounterRef` only when `MessageData` changes
    useEffect(() => {
        emojiCounterRef.current = {}; // Reset on each change

        messageData.forEach((message) => {
            if (!emojiCounterRef.current[message.id]) {
                emojiCounterRef.current[message.id] = {}; // Initialize counter for each message
            }

            message.reactions.forEach((reaction, index) => {
                if (!emojiCounterRef.current[message.id][reaction.emoji]) {
                    emojiCounterRef.current[message.id][reaction.emoji] = [1, index]; // Initialize count and position
                } else {
                    emojiCounterRef.current[message.id][reaction.emoji][0] += 1; // Increment count if emoji exists
                }
            });
        });
        toggleRender()
    }, [messageData]);


    // just initialize the ref to this using map and reduce

    useEffect(() => {
        if ( emojiCounterRef.current || Object.keys(emojiCounterRef.current).length > 0) return
        emojiCounterRef.current = {}; // Reset on each change

        messageData.forEach((message) => {
            if (!emojiCounterRef.current[message.id]) {
                emojiCounterRef.current[message.id] = {}; // Initialize counter for each message
            }

            message.reactions.forEach((reaction, index) => {
                if (!emojiCounterRef.current[message.id][reaction.emoji]) {
                    emojiCounterRef.current[message.id][reaction.emoji] = [1, index]; // Initialize count and position
                } else {
                    emojiCounterRef.current[message.id][reaction.emoji][0] += 1; // Increment count if emoji exists
                }
            });
        });
        // toggleRender()
    }, []);

    // Memoize sorted messages
    const messagesWithSortedReactions = useMemo(() => {
        return messageData.map((message) => ({
            ...message,
            reactions: [...message.reactions].sort((a, b) => a.emoji.localeCompare(b.emoji)),
        }));
    }, [messageData]);

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
        toggleRender()
    }

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
            {messagesWithSortedReactions.map((message, index) => {
                message.reactions = message.reactions.sort((a, b) => a.emoji.localeCompare(b.emoji));
                let seenEmojis = new Set();
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
                                {/* <div className={styles.reactionEmojis} > */}
                                    {message.reactions.reduce<JSX.Element[]>((acc, reaction) => {
                                        if (seenEmojis.has(reaction.emoji)) return acc;
                                        const messageReactions = emojiCounterRef.current[message.id];
                                        const count = messageReactions?.[reaction.emoji]?.[0] || 0;

                                        if (count > 0) {
                                            seenEmojis.add(reaction.emoji)
                                            acc.push(
                                                <div key={reaction.emoji} className={emojiClassName}>
                                                    {reaction.emoji} {count}
                                                </div>
                                            );
                                        }
                                        return acc;
                                    }, [])}
                                {/* </div> */}
                                <div className={`${styles.addReactionButton} rounded-lg bg-accent`} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onSmileClick(e, message)}>
                                    <SmilePlus size={12} strokeWidth={1.25} />
                                </div>
                            </div>

                            <p className={`text-primary ${styles.replyButton}`}>Reply</p>
                        </div>
                        <div className={styles.replies}>
                            {message.replies.map((reply, index) => {
                                if (index == 0) {
                                    return (
                                        <div key={index} className={styles.firstReaction}>
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
                                } else {
                                    return (
                                        <div key={index} className={styles.otherReaction}>
                                            <Avatar><AvatarFallback>{reply.sender.charAt(0)}V</AvatarFallback></Avatar>
                                            <p>{reply.body}</p>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                )
            })}


        </div >
    )
}


// clicking reactions instant load of emojis hide emojis that cant show on this platform