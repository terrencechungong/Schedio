import { Button } from '@/components/ui/button';
import styles from '../ScssModules/schedulepostcomponent.module.scss';
import { BadgeInfo, CalendarClock, Linkedin, MoveUpRight, PencilLine, PlusIcon } from 'lucide-react';
import { CategorizeDropdown } from '../CategorizeDropdown';
import { Switch } from '@/components/ui/switch';
import NumberInputHours from '../SimpleUIComponents/number-input';
import { AvatarFallback, Avatar, AvatarImage } from '@/components/ui/avatar';
import { FaLinkedin } from "react-icons/fa";
import { SocialBadgeAndName } from '../SimpleUIComponents/SocialBadgeAndName';
import { PlatformName, useModalStatesContext } from '@/app/layout';
import React from 'react';
import { SelectAccountForPost } from './SelectAccountForPost';

export const SchedulePostComponent: React.FC = () => {
    const { setShowAddLabelFromSchedulePost, setShowSelectPostTimeModal, setShowPostNowModal } = useModalStatesContext()
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
                <div className={styles.socialAccounts}>
                    <SelectAccountForPost contentTypeIsShort={false} platformName={PlatformName.LinkedIn} />
                    <SelectAccountForPost contentTypeIsShort={false} platformName={PlatformName.Facebook} />
                    <SelectAccountForPost contentTypeIsShort={false} platformName={PlatformName.Instagram} />
                </div>
                <p>PUBLISH REEL/SHORT</p>
                <div className={styles.socialAccounts}>
                    <SelectAccountForPost contentTypeIsShort={true} platformName={PlatformName.Youtube} />
                    <SelectAccountForPost contentTypeIsShort={true} platformName={PlatformName.TikTok} />
                    <SelectAccountForPost contentTypeIsShort={true} platformName={PlatformName.Instagram} />
                </div>
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