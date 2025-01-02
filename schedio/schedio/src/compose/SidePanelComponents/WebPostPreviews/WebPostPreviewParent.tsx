import React from 'react';
import styles from '../../ScssModules/postpreview.module.scss';
import { CircleUser, MessageSquareText, MoveUpRight, ThumbsUp } from 'lucide-react';
import { PlatformName, PostType, Profile, useModalStatesContext } from '@/layout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaTiktok, FaYoutube } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Constants } from '@/constants';
import { ImageSection } from './ImageSection';
import { useComposeSidePanelContext } from '../../composeSidePanel/ComposeSidePanelContext';
import { SidePanelPage } from '../../composeSidePanel/ComposeSidePanelContext';
import { BiRepost } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaComment } from "react-icons/fa6";
import { PiShareFatFill } from "react-icons/pi";
import { useWorkspaceContext } from '@/WorkspaceProvider';

interface WebPostPreviewParentProps {
    profile: Profile | null;
    width?: string;
}

const WebPostPreviewParent: React.FC<WebPostPreviewParentProps> = ({ profile, width }) => {
    const { postVariations, postTypeData } = useModalStatesContext();
    const {globalProfilesArray} = useWorkspaceContext();
    const { currentPage, setCurrentPage } = useComposeSidePanelContext();
    const [localPostVariationKey, setLocalPostVariationKey] = useState(
        profile == null ? Constants.GENERIC_TEMPLATE :
            (profile.unique ? `${profile.platform}-${profile._id}-${postTypeData.type}` : Constants.GENERIC_TEMPLATE));

    useEffect(() => {
        setLocalPostVariationKey((
            profile == null ? Constants.GENERIC_TEMPLATE :
                (profile.unique ? `${profile.platform}-${profile._id}-${postTypeData.type}` : Constants.GENERIC_TEMPLATE)));
    }, [globalProfilesArray])

    return (
        <motion.div
            initial={
                currentPage == SidePanelPage.PREVIEW ?
                    { height: '0px', opacity: 0.3 } : { height: 'auto', opacity: 1 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: '0px', opacity: 0.3 }}
            transition={{ duration: 0.1 }}
            style={{ overflowY: 'hidden', width: ( !width || width == "") ? '80%' : width }}
        >
            <div className={styles.genericPostPreviewContainer}>
                <Header profile={profile} />
                <div className={styles.genericPostPreviewCaption}>
                    <div
                        style={{ color: 'black' }}
                        dangerouslySetInnerHTML={{ __html: postVariations[localPostVariationKey].postCaption }}
                    >
                    </div>
                </div>

                <ImageSection localPostVariationKey={localPostVariationKey} />
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <FooterHeader profile={profile} />
                    <Footer profile={profile} />
                </div>
            </div>
        </motion.div>
    )
};


const FooterHeader = ({ profile }: { profile: Profile | null }) => {
    const linkedinSubText = {
        fontSize: '12.5px',
        color: '#666666'
    }
    if (profile == null) {
        return <></>
    }
    if (profile.platform == PlatformName.LinkedIn) {
        return (
            <div style={{
                display: 'flex', flexDirection: 'row', width: '95%', alignSelf: 'center',
                padding: '8px 0 8px', justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                    <img src="/assets/linkedininteractions.png" style={{ width: '39px' }} />
                    <p style={linkedinSubText}>190</p>
                </div>
                <div>
                    <p style={linkedinSubText}>14 comments</p>
                </div>
            </div>
        )
    }
    if (profile.platform == PlatformName.Facebook) {
        return (
            <div style={{
                display: 'flex', flexDirection: 'row', width: '95%', alignSelf: 'center',
                padding: '8px 0 8px', justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                    <img src="/assets/facebookinteractions.png" style={{ width: '30px' }} />
                    <p style={linkedinSubText}>276</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center' }}>
                        <p style={linkedinSubText}>23</p>
                        <FaComment size={16} color="#606770" style={{ transform: "scaleX(-1)" }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '0px', alignItems: 'center' }}>
                        <p style={linkedinSubText}>7</p>
                        <PiShareFatFill color="#606770" stroke='2' size={18} />
                    </div>
                </div>
            </div>
        )
    }
}

const Footer = ({ profile }: { profile: Profile | null }) => {

    const linkedInIconWrapper: React.CSSProperties = {
        display: "flex",
        flexDirection: 'row' as const,
        gap: '4px',
        fontSize: '12px',
        alignItems: 'center',
        color: '#404040',
        fontWeight: '500'
    }

    return (
        <>
            {profile == null && (
                <div className={styles.genericPostPreviewFooter}>
                    <div style={linkedInIconWrapper}>
                        <ThumbsUp size={16} />
                        Like
                    </div>
                    <div style={linkedInIconWrapper}>
                        <MessageSquareText size={16} />
                        Comment
                    </div>
                    <div style={linkedInIconWrapper}>
                        <MoveUpRight size={16} />
                    </div>
                </div>
            )}
            {profile?.platform == PlatformName.LinkedIn && (
                <div className={styles.linkedInPostPreviewFooter}>
                    <div style={{ ...linkedInIconWrapper, gap: '4px' }}>
                        <img src="/assets/likebuttonLinkedin.png" style={{ width: '14.5px' }} />
                        <span>Like</span>
                    </div>
                    <div style={{ ...linkedInIconWrapper, gap: '2px' }}>
                        <img src="/assets/linkedincomment.png" style={{ width: '22px' }} />
                        <span>Comment</span>
                    </div>
                    <div style={linkedInIconWrapper}>
                        <BiRepost size={20} />
                        <span>Repost</span>
                    </div>
                    <div style={linkedInIconWrapper}>
                        <RiSendPlaneFill size={16} />
                        <span>Send</span>
                    </div>
                </div>
            )}
            {profile?.platform == PlatformName.Facebook && (
                <div className={styles.facebookPostPreviewFooter}>
                    <ThumbsUp size={16} />
                    <MessageSquareText size={16} />
                    <MoveUpRight size={16} />
                </div>
            )}
        </>
    );
}



const Header = ({ profile }: { profile: Profile | null }) => {
    const linkedinSubText = {
        fontSize: '11px',
        color: '#666666'
    }
    return (
        <>
            {profile == null && (
                <div className={styles.genericPostPreviewHeader}>
                    <Avatar>
                        <AvatarFallback style={{ backgroundColor: '#7d4ecd', color: 'white' }}>GP</AvatarFallback>
                    </Avatar>
                    <p style={{ fontSize: '14px' }}>Post Preview</p>
                </div>
            )}
            {profile?.platform == PlatformName.LinkedIn && (
                <div className={styles.linkedInPostPreviewHeader}>
                    <Avatar style={{ height: '45px', width: '45px' }}>
                        <AvatarFallback style={{ backgroundColor: '#7d4ecd', color: 'white' }}>GP</AvatarFallback>
                    </Avatar>
                    {/* add linked in header stuff */}
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '14px', justifyContent: 'space-between' }}>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: 'black',
                            marginBottom: '1px'
                        }}>{profile?.name} <span style={{ ...linkedinSubText, fontWeight: 'normal' }}>&bull; 3rd+</span></p>
                        <p style={linkedinSubText}>CEO and Co-Founder @ Meta </p>
                        <p style={linkedinSubText}>3h</p>
                    </div>
                </div>
            )}
            {profile?.platform == PlatformName.Instagram && (
                <div className={styles.instagramInPostPreviewHeader}>
                    <Avatar>
                        <AvatarFallback style={{ backgroundColor: '#7d4ecd', color: 'white' }}>GP</AvatarFallback>
                    </Avatar>
                    <p style={{ fontSize: '14px' }}>Post Preview</p>
                </div>
            )}
            {profile?.platform == PlatformName.Facebook && (
                <div className={styles.facebookPostPreviewHeader}>
                    <Avatar>
                        <AvatarFallback style={{ backgroundColor: '#7d4ecd', color: 'white' }}>GP</AvatarFallback>
                    </Avatar>
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '18px' }}>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'black'
                        }}>Post Preview</p>
                        <p style={{
                            fontSize: '13px',
                            fontWeight: '500',
                            color: 'grey'
                        }}>November 2</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default WebPostPreviewParent;

