
import { CircleUser, Instagram, MessageSquareText, MoveUpRight, ThumbsUp } from 'lucide-react';
import { PostType, Profile, useModalStatesContext } from '@/layout';
import styles from '../ScssModules/postpreview.module.scss';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PreviewForShorts } from './PreviewForShorts';
import { FaLinkedin, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Constants } from '@/constants';
import WebPostPreviewParent from './WebPostPreviews/WebPostPreviewParent';
import { SiThreads } from 'react-icons/si';
import { useComposeSidePanelContext } from '../composeSidePanel/ComposeSidePanelContext';
import { useWorkspaceContext } from '@/WorkspaceProvider';

type PlatformVisibility = {
    [key: number]: boolean;
}

export const PostPreviewComponent: React.FC = () => {
    const { postVariations, postVariationKey, postTypeData } = useModalStatesContext();
    const {globalProfiles, globalProfilesArray } = useWorkspaceContext()
    // can start off as all true because they wont take effect until theyre checked anyway
    // only changes with click
    const {
        mobileViewPlatformVisibility,
        setMobileViewPlatformVisibility,
        webViewPlatformVisibility,
        setWebViewPlatformVisibility } = useComposeSidePanelContext();


    const platformIcons: { [key: string]: JSX.Element } = {
        'TikTok': <FaTiktok color='#000000' size={18} />,
        'Youtube': <FaYoutube color='#FF0000' size={20} />,
        'LinkedIn': <FaLinkedin color='#0a66c2' size={17} />,
        'Facebook': <FaFacebook color='#0866ff' size={17} />,
        'Instagram': <Instagram color='#833ab4' size={17} />,
        'Threads': <SiThreads color='#89CFF0' size={17} />,
    };

    return (
        <div className={styles.container}>
            {!(postTypeData.type == PostType.SHORT) ?
                <div className={styles.webPostPreviewContainers}>
                    {
                        globalProfilesArray.filter(p => p.active && !p.isShort).length == 0 &&
                        <WebPostPreviewParent profile={null} />
                    }
                    {
                        globalProfilesArray.filter(p => p.active && !p.isShort).map((profile) => {
                            return (
                                <div key={profile.id} className={styles.webViewAndTitleContainer}>
                                    <Tooltip title="Click to hide preview" placement="left" arrow>
                                        <div
                                            onClick={() => setWebViewPlatformVisibility(prevState =>
                                                ({ ...prevState, [profile.id]: !prevState[profile.id] }))
                                            }
                                            style={{ alignItems: 'center', gap: '4px', marginBottom: '4px' }}
                                            className='flex flex-row cursor-pointer hover:bg-gray-300 px-2 rounded-sm'>
                                            {platformIcons[profile.platform]}
                                            {profile.name} Preview
                                        </div>
                                    </Tooltip>
                                    <AnimatePresence>
                                        {webViewPlatformVisibility[profile.id] && <WebPostPreviewParent profile={profile} />}
                                    </AnimatePresence>
                                </div>
                            )
                        })
                    }
                </div> :
                <div className={styles.shortPostPreviewContainer}>
                    {globalProfilesArray.filter(p => p.active && p.isShort).map((profile) => {
                        const localPostVariationKey = profile.unique ? `${profile.platform}-${profile._id}-${postTypeData.type}` : Constants.GENERIC_TEMPLATE;
                        return (
                            <div key={profile.id} className={styles.phoneAndTitleContainer}>
                                <Tooltip title="Click to hide preview" placement="left" arrow>
                                    <div
                                        onClick={() => setMobileViewPlatformVisibility(prevState =>
                                            ({ ...prevState, [profile.id]: !prevState[profile.id] }))
                                        }
                                        style={{ alignItems: 'center', gap: '4px', marginBottom: '4px' }}
                                        className='flex flex-row cursor-pointer hover:bg-gray-300 px-2 rounded-sm'>
                                        {platformIcons[profile.platform]}
                                        {profile.name} Preview
                                    </div>
                                </Tooltip>
                                <AnimatePresence>
                                    {mobileViewPlatformVisibility[profile.id] && <PreviewForShorts
                                        platform={profile.platform} name={profile.name} localPostVariationKey={localPostVariationKey} />}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </div>
            }
        </div >
    )
}






































































































