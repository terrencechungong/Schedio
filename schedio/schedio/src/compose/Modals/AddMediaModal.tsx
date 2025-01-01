// @ts-ignore
import { useModalStatesContext } from '@/layout.tsx';
// @ts-ignore
import { X } from 'lucide-react';
// @ts-ignore
import styles from '../ScssModules/addmediamodal.module.scss'
// @ts-ignore
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs.tsx";
// @ts-ignore
import { AddMediaUploadTabContent } from '../MediaRelatedComponents/AddMediaUploadTabContent.tsx';
// @ts-ignore
import { AddMediaGifTabContent } from "../MediaRelatedComponents/AddMediaGifTabContent.tsx";
// @ts-ignore
import { AddMediaPhotosTabContent } from "../MediaRelatedComponents/AddMediaPhotosTabContent.tsx";
// @ts-ignore
import { motion } from 'framer-motion';

export const AddMediaModal: React.FC = () => {
    const { setShowMediaModal } = useModalStatesContext();
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

    return (
        <div
            style={containerStyle}
            onClick={() => setShowMediaModal(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.94 }} 
                transition={{ duration: 0.1 }}
                className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <AddModalHeader />
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Tabs defaultValue="upload" className="w-full" >
                        <TabsList className="flex border-b border-gray-200 rounded-none">
                            <TabsTrigger
                                value="upload"
                                className={`flex-1 px-4 py-2 text-center border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                                style={{ boxShadow: 'none' }}
                            >
                                Upload
                            </TabsTrigger>
                            <TabsTrigger
                                value="photos"
                                className={`flex-1 px-4 py-2 text-center border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                                style={{ boxShadow: 'none' }}
                            >
                                Photos
                            </TabsTrigger>
                            <TabsTrigger
                                value="gif"
                                className={`flex-1 px-4 py-2 text-center border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                                style={{ boxShadow: 'none' }}
                            >
                                GIFs
                            </TabsTrigger>
                            <div
                                className={`flex-1 px-4 py-2 text-center border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                                style={{ boxShadow: 'none', cursor: 'pointer' }}
                            >
                                <p>Design Tools</p>
                            </div>
                        </TabsList>
                        <TabsContent value="upload">
                            <AddMediaUploadTabContent />
                        </TabsContent>
                        <TabsContent value="photos">
                            <AddMediaPhotosTabContent />
                        </TabsContent>
                        <TabsContent value="gif">
                            <AddMediaGifTabContent />
                        </TabsContent>

                    </Tabs>
                </div>
            </motion.div>
        </div>
    )
}


const AddModalHeader: React.FC = () => {
    const { setShowMediaModal } = useModalStatesContext();

    return (
    <div className={styles.addmediamodalheader}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', padding: '12px 12px 0 12px' }}>Add media</h2>
        <X
            onClick={() => setShowMediaModal(false)}
            className={styles.closeModal}
            size={30} />
    </div>
    )
}