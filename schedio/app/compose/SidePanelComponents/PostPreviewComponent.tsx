"use client"
import { CircleUser, MessageSquareText, MoveUpRight, ThumbsUp } from 'lucide-react';
import { useModalStatesContext } from '@/app/layout';
import styles from '../ScssModules/postpreview.module.scss'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const PostPreviewComponent: React.FC = () => {
    const { postCaption, photosInPost } = useModalStatesContext();

    return (
        <div className={styles.container}>
            <div className={styles.genericPostPreviewContainer}>
                <div className={styles.genericPostPreviewHeader}>
                    <Avatar>
                        <AvatarFallback style={{ backgroundColor: '#7d4ecd', color: 'white' }}>GP</AvatarFallback>
                    </Avatar>
                    <p style={{ fontSize: '14px' }}>Post Preview</p>
                </div>
                <div className={styles.genericPostPreviewCaption}>
                    <p style={{ fontSize: '13px', margin: 0, padding: 0, }}>{postCaption}</p>
                </div>

                <div style={{ width: '100%' }}>
                    {photosInPost.length === 1 &&
                        photosInPost.map((photo) => {
                            return <img key={photo.regUrl} src={photo.regUrl} alt="Photo" />;
                        })}
                    {photosInPost.length === 2 && (
                        <div
                            style={{
                                width: '100%',
                                height: '425px',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                overflow: 'hidden', // Ensures images outside bounds are hidden
                            }}
                        >
                            {photosInPost.map((photo) => (
                                <div
                                    key={photo.regUrl}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        overflow: 'hidden', // Hides overflow of individual images
                                    }}
                                >
                                    <img
                                        src={photo.regUrl}
                                        alt="Photo"
                                        style={{
                                            height: '100%',
                                            width: 'auto',
                                            objectFit: 'cover', // Ensures the image covers its container
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {photosInPost.length === 3 && (
                        <div
                            style={{
                                width: '100%',
                                height: '425px',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                overflow: 'hidden', // Ensures images outside bounds are hidden
                            }}
                        >
                            <div
                                key={photosInPost[0].regUrl}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'hidden', // Hides overflow of individual images
                                }}
                            >
                                <img
                                    src={photosInPost[0].regUrl}
                                    alt="Photo"
                                    style={{
                                        height: '100%',
                                        width: 'auto',
                                        objectFit: 'cover', // Ensures the image covers its container
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                />
                            </div>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'grid',
                                gridTemplateRows: 'repeat(2, 1fr)',
                                overflow: 'hidden', // Ensures images outside bounds are hidden
                            }}
                            >
                                {photosInPost.slice(1).map((photo) => (
                                    <div
                                        key={photo.regUrl}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            overflow: 'hidden', // Hides overflow of individual images
                                        }}
                                    >
                                        <img
                                            src={photo.regUrl}
                                            alt="Photo"
                                            style={{
                                                height: '100%',
                                                width: 'auto',
                                                objectFit: 'cover', // Ensures the image covers its container
                                                position: 'relative',
                                                overflow: 'hidden',
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {photosInPost.length === 4 &&
                        (
                            <div
                                style={{
                                    width: '100%',
                                    height: '425px',
                                    display: 'grid',
                                    gridTemplateRows: '2fr 1fr',
                                    overflow: 'hidden', // Ensures images outside bounds are hidden
                                }}
                            >
                                <div
                                    key={photosInPost[0].regUrl}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        overflow: 'hidden', // Hides overflow of individual images
                                    }}
                                >
                                    <img
                                        src={photosInPost[0].regUrl}
                                        alt="Photo"
                                        style={{
                                            height: '100%',
                                            width: 'auto',
                                            objectFit: 'cover', // Ensures the image covers its container
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', width: '100%', height: '100%' }}>
                                    {photosInPost.slice(1).map((photo) => (
                                        <div
                                            key={photo.regUrl}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                overflow: 'hidden', // Hides overflow of individual images
                                            }}
                                        >
                                            <img
                                                src={photo.regUrl}
                                                alt="Photo"
                                                style={{
                                                    height: '100%',
                                                    width: 'auto',
                                                    objectFit: 'cover', // Ensures the image covers its container
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    {photosInPost.length === 5 && (
                        <div
                            style={{
                                width: '100%',
                                height: '425px',
                                display: 'grid',
                                gridTemplateRows: '2fr 1fr', // Top row takes 2/3 height, bottom row takes 1/3
                                // gap: '5px', // Optional: adds spacing between images
                                overflow: 'hidden',
                            }}
                        >
                            {/* Top Row: Full-Width Image */}
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={photosInPost[0].regUrl}
                                    alt="Photo"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover', // Ensures the image covers its container
                                    }}
                                />
                            </div>

                            {/* Bottom Row: Four Images in 2x2 Grid */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr', // Two columns
                                    gridTemplateRows: '1fr 1fr', // Two rows
                                    gap: '5px', // Optional: adds spacing between images
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                {photosInPost.slice(1).map((photo) => (
                                    <div
                                        key={photo.regUrl}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <img
                                            src={photo.regUrl}
                                            alt="Photo"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover', // Ensures each image fills its cell
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {photosInPost.length > 5 &&
                        photosInPost.map((photo) => {
                            return <img key={photo.regUrl} src={photo.regUrl} alt="Photo" />;
                        })}
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






































































































