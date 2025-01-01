import { Button } from '@/components/ui/button';
import styles from '../ScssModules/schedulepostcomponent.module.scss';
import { BadgeInfo, CalendarClock, Linkedin, MoveUpRight, PencilLine, Plus, PlusIcon } from 'lucide-react';
import { CategorizeDropdown } from '../CategorizeDropdown';
import { Switch } from '@/components/ui/switch';
import NumberInputHours from '../SimpleUIComponents/number-input';
import { AvatarFallback, Avatar, AvatarImage } from '@/components/ui/avatar';
import { FaLinkedin } from "react-icons/fa";
import { SocialBadgeAndName } from '../SimpleUIComponents/SocialBadgeAndName';
import { PlatformName, useModalStatesContext } from '@/layout';
import React from 'react';
import { SelectAccountForPost } from './SelectAccountForPost';
import { useWorkspaceContext } from '@/WorkspaceProvider';
import { Constants } from '@/constants';
import { Skeleton } from '@/components/ui/skeleton';

export const SchedulePostComponent: React.FC = () => {
    const { setShowAddLabelFromSchedulePost, setShowSelectPostTimeModal, setShowPostNowModal } = useModalStatesContext();
    const { globalProfilesArray } = useWorkspaceContext()
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={styles.container}
            onClick={() => setIsOpen(false)}
        >
            <div className={styles.schedulePostHeaderWrapper}>
                <div className={styles.schedulePostHeader}>
                    <Button
                        onClick={() => setShowSelectPostTimeModal(true)}
                        className='text-primary border-primary border-[0.5px] bg-white hover:bg-[#f3eafc] pl-9 pr-9 pt-5 pb-5 shadow-none'>
                        <CalendarClock size={13} strokeWidth={1.25} />
                        Pick Time
                    </Button>
                    <Button
                        onClick={() => setShowPostNowModal(true)}
                        className='text-white bg-primary pl-9 pr-9 pt-5 pb-5'>
                        Post Now
                        <MoveUpRight size={13} strokeWidth={1.25} />
                    </Button>

                </div>
            </div>
            <div className={styles.publishPostDiv}>
                <p>PUBLISH POST</p>
                {globalProfilesArray.length == 1 && globalProfilesArray[0].name == Constants.GLOBAL_PROFILES_STILL_LOADING ?
                    <div className={styles.socialAccounts}>
                        <Skeleton className='w-full rounded-md' style={{ height: '140px' }} />
                        <Skeleton className='w-full rounded-md' style={{ height: '140px' }} />
                    </div>
                    :
                    globalProfilesArray.length == 1 && globalProfilesArray[0].name == Constants.ERROR_LOADING_PROFILES ?
                        <ProfileSectionMessage short={false} error={true} /> :
                        !globalProfilesArray.some(p => !p.isShort) ?
                            <ProfileSectionMessage short={false} error={false} />
                            :
                            <div className={styles.socialAccounts}>
                                {[PlatformName.Facebook, PlatformName.Instagram, PlatformName.Pinterest, PlatformName.LinkedIn, PlatformName.Threads].filter((platform) => (
                                    globalProfilesArray.some(profile => profile.platform == platform)
                                ), []).map((platform) => (
                                    <SelectAccountForPost contentTypeIsShort={false} platformName={platform} />
                                ))}
                            </div>

                }
                <p>PUBLISH REEL/SHORT</p>
                {globalProfilesArray.length == 1 && globalProfilesArray[0].name == Constants.GLOBAL_PROFILES_STILL_LOADING ?
                    <div className={styles.socialAccounts}>
                        <Skeleton className='w-full rounded-md' style={{ height: '140px' }} />
                        <Skeleton className='w-full rounded-md' style={{ height: '140px' }} />
                    </div>
                    :
                    globalProfilesArray.length == 1 && globalProfilesArray[0].name == Constants.ERROR_LOADING_PROFILES ?
                        <ProfileSectionMessage short={false} error={true} /> :
                        !globalProfilesArray.some(p => p.isShort) ?
                            <ProfileSectionMessage short={true} error={false} />
                            :
                            <div className={styles.socialAccounts}>
                                {[PlatformName.Facebook, PlatformName.Instagram, PlatformName.Youtube, PlatformName.TikTok].filter((platform) => (
                                    globalProfilesArray.some(profile => profile.platform == platform)
                                ), []).map((platform) => (
                                    <SelectAccountForPost contentTypeIsShort={true} platformName={platform} />
                                ))}
                            </div>

                }
                <div
                    style={{ color: 'gray', fontSize: '14px', fontWeight: 600, padding: '3px 5px 3px' }}
                    className='bg-accent border-[0.5px] border-gray shadow-none rounded-sm' >Not scheduled</div>
            </div>
            <div className={styles.categorize}>
                <p>CATEGORIZE</p>
                <div style={{ gap: '8px', display: 'flex', flexDirection: 'row', alignItems: 'centera' }}>
                    <div style={{ flexGrow: 1 }}>
                        <CategorizeDropdown isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                    <div className={`bg-accent border-lightgrey border-[0.5px] ${styles.categorizePencil}`} onClick={() => {
                        setShowAddLabelFromSchedulePost(true)
                    }} >
                        <PencilLine size={14} />
                    </div>
                </div>
            </div>
            <div className={styles.platformSpecificControls}>
                <p>LINKEDIN CONTROLS</p>
                <div className={styles.controlRow}>
                    <div className={styles.leftControlRow}>
                        <Switch id="airplane-mode" />
                        <span>Repost after</span>
                        <BadgeInfo size={15} strokeWidth={1.25} />
                    </div>
                    <NumberInputHours />
                </div>

                <div className={styles.controlRow} style={{ paddingTop: '5px' }}>
                    <div className={styles.leftControlRow}>
                        <Switch id="airplane-mode" />
                        <span>Un-Repost after</span>
                        <BadgeInfo size={15} strokeWidth={1.25} />
                    </div>
                    <NumberInputHours />
                </div>
            </div>
            <div className={styles.history} style={{ borderWidth: 0 }}>
                <p>HISTORY</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: "3px" }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3px' }}>
                        <span style={{ color: '#06402B' }}>Created by{" "}</span>
                        <Avatar className="w-8 h-8">
                            <AvatarFallback className="w-8 h-8">T</AvatarFallback>
                        </Avatar> <span style={{ color: '#808080' }}>Terrence Chungong </span>
                    </div>
                    <div style={{ color: '#808080', fontSize: '15px' }}><span style={{ color: '#06402B' }}>On{" "}</span>13 Nov 12:04</div>
                </div>
            </div>

        </div>
    )
}


const ProfileSectionMessage = ({ short, error }: { short: boolean, error: boolean }) => {
    let message: JSX.Element;
    if (error) {
        message = <p style={{ fontSize: '14px' }}>There was a problem fetching your connected pages. Refresh this page to try again. Please reach out to us if the issue persists!</p>
    } else if (short) {
        message = <p style={{ fontSize: '14px' }}>You do not have any connected accounts that support short form content. <Button className='text-sm'>Add a Page<Plus size={20} /></Button></p>
    } else {
        message = <p style={{ fontSize: '14px' }}>You do not have any connected accounts that support regular posts. <Button className='text-sm'>Add a Page<Plus size={20} /></Button></p>
    }

    return (

        <div className={styles.publishPostDivChildWrapper}>
            <div style={{
                width: '100%', display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center'
            }}>
                {message}
            </div>
        </div>
    )
}

