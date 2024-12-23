import { useModalStatesContext } from '@/app/layout';
import { motion } from 'framer-motion'
import { useState } from 'react';
import styles from '../ScssModules/createpostmodal.module.scss'
import { MoveLeft, MoveRight, MoveUpRight, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CreatePostFromCalendar = () => {
    const [draftSelected, setDraftSelected] = useState(false);
    const [screenPhase, setScreenPhase] = useState(0); // 0 = pickDraft, 1 = pickSocials
    const { setShowCreatePostFromCalendarModal } = useModalStatesContext();
    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20
    }
    // the primary button will say next or schedule post depending on whats clicked

    return (
        <div
            style={containerStyle}
            onClick={() => {
                setShowCreatePostFromCalendarModal(false)
            }
            }>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className="rounded-lg"
                style={{
                    width: '700px', height: 'auto', maxHeight: '80%', backgroundColor: "white",
                    padding: '20px', position: 'relative', overflowY: 'auto'
                }}
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                {screenPhase == 0 &&
                    <>
                        <div className={styles.headerWrapper}>
                            <div className={styles.modalHeader}>
                                <h4>Schedule a post</h4>
                                <div className={styles.iconWrapper}>
                                    <X size={17} />
                                </div>
                            </div>
                            <span>Select a draft to add to your content schedule, or create a new post.</span>
                        </div>
                        {/* Add a filter */}

                        <div className={styles.postPreviewsForCenter}>

                        </div>
                        {/* ++++++++++++ ADD ALTERNATIVE NO DRAFT TEXT ++++++++++++++++++++++++ */}

                        <div className={styles.modalFooter}>
                            <Button
                                // onClick={() => setCropping(false)}
                                className="p-5 tranistion-all transition-duration-200 text-black bg-accent hover:bg-gray-200 shadow-none">
                                Create new post <Plus size={16} /></Button>
                            <Button
                                onClick={() => setScreenPhase(1)}
                                className="p-5 shadow-none">
                                Next <MoveRight size={16} />
                            </Button>
                        </div>
                    </>
                }

                {screenPhase == 1 &&
                    <>
                        <div className={styles.headerWrapper}>
                            <div className={styles.modalHeader}>
                                <h4>Schedule a post</h4>
                                <div className={styles.iconWrapper}>
                                    <X size={17} />
                                </div>
                            </div>
                            <span>Select socials for your post.</span>
                        </div>

                        <div style={{ width: '100%', height: '50px' }}>

                        </div>

                        <div className={styles.modalFooter}>
                            <Button
                                onClick={() => setScreenPhase(0)}
                                className="p-5 tranistion-all transition-duration-200 text-black bg-accent hover:bg-gray-200 shadow-none">
                                <MoveLeft size={16} /> Choose another draft</Button>
                            <Button
                                // onClick={() => getCroppedPhotoBlob(previewCanvasRef.current, saveToCloudinary)}
                                className="p-5 shadow-none">
                                Schedule Post
                            </Button>
                        </div>
                    </>
                }


            </motion.div>
        </div>
    )

}