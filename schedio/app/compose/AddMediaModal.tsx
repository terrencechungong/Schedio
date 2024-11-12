import { useModalStatesContext } from "../layout";
import { X } from 'lucide-react';
import styles from './addmediamodal.module.scss'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AddMediaUploadTabContent } from "./AddMediaUploadTabContent";
import { AddMediaGifTabContent } from "./AddMediaGifTabContent";
import { AddMediaPhotosTabContent } from "./AddMediaPhotosTabContent";

export const AddMediaModal: React.FC = () => {
    const { showMediaModal, setShowMediaModal } = useModalStatesContext();
    const containerStyle = {
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
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <AddModalHeader />
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Tabs defaultValue="upload" className="w-full" >
                        <TabsList className="flex border-b border-gray-200 rounded-none">
                            <TabsTrigger
                                value="upload"
                                className={`flex-1 px-4 py-2 text-center border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                            >
                                Upload
                            </TabsTrigger>
                            <TabsTrigger
                                value="photos"
                                className={`flex-1 px-4 py-2 text-center border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                            >
                                Photos
                            </TabsTrigger>
                            <TabsTrigger
                                value="gif"
                                className={`flex-1 px-4 py-2 text-center border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                            >
                                GIFs
                            </TabsTrigger>
                            <div
                                className={`flex-1 px-4 py-2 text-center border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                                style={{ cursor: 'pointer' }}
                            >
                                <p>Design Tools</p>
                            </div>
                        </TabsList>
                        <TabsContent value="upload">
                            <AddMediaUploadTabContent inputRef={null} />
                        </TabsContent>
                        <TabsContent value="photos">
                            <AddMediaPhotosTabContent />
                        </TabsContent>
                        <TabsContent value="gif">
                            <AddMediaGifTabContent />
                        </TabsContent>

                    </Tabs>
                </div>
            </div>
        </div>
    )
}


const AddModalHeader: React.FC = () => (
    <div className={styles.addmediamodalheader}>
        <h2>Add media</h2>
        <X size={30} />
    </div>
)