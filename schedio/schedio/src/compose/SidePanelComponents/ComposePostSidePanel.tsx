import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import styles from '../ScssModules/compose.module.scss';
import { PostPreviewComponent } from './PostPreviewComponent';
import { useModalStatesContext } from '@/layout';
import { PostCommentsComponent } from './PostCommentsComponent';
import { SchedulePostComponent } from './SchedulePostComponent';



export const ComposePoseSidePanel: React.FC = () => {

    return (
        <div className={styles.composePostSidePanel}>
            {/* <p id="compyy"></p> */}

            {/* FIX THE TABS IN MODALS TO BE THE SAME */}
            <Tabs defaultValue="preview" className={`w-full ${styles.composePostSidePanelHeader} `} >
                <TabsList className="flex border-b border-gray-200 rounded-none bg-transparent border-b-2 pl-4 pr-4 w-full">
                    <TabsTrigger
                        value="preview"
                        className={`flex-1 px-4 py-2 text-center border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                        style={{ boxShadow: 'none' }}
                    >
                        Preview
                    </TabsTrigger>
                    <TabsTrigger
                        value="schedule"
                        className={`flex-1 px-4 py-2 text-center border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                        style={{ boxShadow: 'none' }}
                    >
                        Schedule
                    </TabsTrigger>
                    <TabsTrigger
                        value="conversation"
                        className={`flex-1 px-4 py-2 text-center border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                        style={{ boxShadow: 'none' }}
                    >
                        Conversation
                    </TabsTrigger>
                    <TabsTrigger
                        value="tools"
                        className={`flex-1 px-4 py-2 text-center border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent shadow-none`}
                        style={{ boxShadow: 'none' }}
                    >
                        Tools
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="h-full w-full m-0">
                    <PostPreviewComponent />
                </TabsContent>
                <TabsContent value="schedule" className="h-full w-full m-0">
                    <SchedulePostComponent />
                </TabsContent>
                <TabsContent value="conversation" className="h-full w-full m-0">
                    <PostCommentsComponent />
                </TabsContent>
                <TabsContent value="tools" className="h-full w-full m-0">
                    {/* <AddMediaGifTabContent /> */}
                </TabsContent>

            </Tabs>

        </div>
    )
}