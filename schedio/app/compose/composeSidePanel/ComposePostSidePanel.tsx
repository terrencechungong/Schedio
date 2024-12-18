import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import styles from '../ScssModules/compose.module.scss';
import { PostPreviewComponent } from '../SidePanelComponents/PostPreviewComponent';
import { useModalStatesContext } from '../../layout';
import { PostCommentsComponent } from '../SidePanelComponents/PostCommentsComponent';
import { SchedulePostComponent } from '../SidePanelComponents/SchedulePostComponent';
import { ComposeSidePanelContextProvider, SidePanelPage, useComposeSidePanelContext } from './ComposeSidePanelContext';

export const ComposePoseSidePanelWrapper: React.FC = () => {

    return (
        <ComposeSidePanelContextProvider>
            <ComposePoseSidePanel />
        </ComposeSidePanelContextProvider>
    )
}


const ComposePoseSidePanel = () => {
    const {currentPage, setCurrentPage} = useComposeSidePanelContext()

    return (
        <div className={styles.composePostSidePanel}>
            {/* <p id="compyy"></p> */}

            {/* FIX THE TABS IN MODALS TO BE THE SAME */}
            <Tabs defaultValue={SidePanelPage.PREVIEW} className={`w-full ${styles.composePostSidePanelHeader} `} >
                <TabsList style={{ position: 'sticky', top: '0', width: '100%', zIndex: 10 }} className="flex border-b border-gray-200 rounded-none bg-white border-b-2 !py-[21px] w-full">
                    <TabsTrigger
                        value={SidePanelPage.PREVIEW}
                        className={`flex-1 px-4 py-3 text-center border-b-2 data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                        style={{ boxShadow: 'none', backgroundColor: 'white' }}
                        onClick={() => setCurrentPage(SidePanelPage.PREVIEW)}
                    >
                        Preview
                    </TabsTrigger>
                    <TabsTrigger
                        value={SidePanelPage.SCHEDULE}
                        className={`flex-1 px-4 py-3 text-center border-b-2 data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                        style={{ boxShadow: 'none', backgroundColor: 'white' }}
                        onClick={() => setCurrentPage(SidePanelPage.SCHEDULE)}
                    >
                        Schedule
                    </TabsTrigger>
                    <TabsTrigger
                        value={SidePanelPage.CONVERSATION}
                        className={`flex-1 px-4 py-3 text-center border-b-2 data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                        style={{ boxShadow: 'none', backgroundColor: 'white' }}
                        onClick={() => setCurrentPage(SidePanelPage.CONVERSATION)}
                    >
                        Conversation
                    </TabsTrigger>
                    <TabsTrigger
                        value={SidePanelPage.TOOLS}
                        className={`flex-1 px-4 py-3 text-center border-b-2 data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                        style={{ boxShadow: 'none', backgroundColor: 'white' }}
                        onClick={() => setCurrentPage(SidePanelPage.TOOLS)}
                    >
                        Tools
                    </TabsTrigger>
                </TabsList>
                <TabsContent value={SidePanelPage.PREVIEW} className="h-full w-full m-0">
                    <PostPreviewComponent />
                </TabsContent>
                <TabsContent value={SidePanelPage.SCHEDULE} className="h-full w-full m-0">
                    <SchedulePostComponent />
                </TabsContent>
                <TabsContent value={SidePanelPage.CONVERSATION} className="h-full w-full m-0">
                    <PostCommentsComponent />
                </TabsContent>
                <TabsContent value={SidePanelPage.TOOLS} className="h-full w-full m-0">
                    {/* <AddMediaGifTabContent /> */}
                </TabsContent>

            </Tabs>

        </div>
    )

}