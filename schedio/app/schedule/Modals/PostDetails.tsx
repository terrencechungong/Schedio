import { ChevronDown, Globe, TableOfContents, CalendarClock, X, Siren, NotebookPen } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PlatformColor, PlatformIcons, PlatformName, Profile, useModalStatesContext } from "@/app/layout";
import { useState } from "react";
import styles from '../ScssModules/postdetails.module.scss';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CategorizeDropdown, InputType } from "@/app/compose/CategorizeDropdown";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Tooltip from "@mui/material/Tooltip";
import WebPostPreviewParent from "@/app/compose/SidePanelComponents/WebPostPreviews/WebPostPreviewParent";
import { ComposeSidePanelContextProvider, useComposeSidePanelContext } from "@/app/compose/composeSidePanel/ComposeSidePanelContext";

// REMEMBER TO GIVE EVERYTHING AN ELLIPSIS

export const PostDetails = () => (
    <ComposeSidePanelContextProvider>
        <PostDetailsWrapper />
    </ComposeSidePanelContextProvider>
)


export const PostDetailsWrapper = () => {
    const labelItems = [
        { id: 0, value: "tip", label: "Tip", bgColor: "#FF0000", textColor: "white" },
        { id: 1, value: "promotion", label: "Promotion", bgColor: "#FF91B3", textColor: "white" },
        { id: 2, value: "thread", label: "Thread", bgColor: "#1BC7B7", textColor: "white" },
        { id: 3, value: "motivation", label: "Motivation", bgColor: "#FFE13D", textColor: "black" },
    ]

    const statusItems: CategoryItem[] = [
        { id: 0, value: "tip", label: "Scheduled", bgColor: "#E9D5FF", textColor: "#7C3AED" },
        { id: 1, value: "promotion", label: "Awaiting Approval", bgColor: "#ffeca2", textColor: "#c58f07" },
        { id: 2, value: "thread", label: "Draft", bgColor: "#D3D3D3", textColor: "#696969" },
    ]

    const socialItems: CategoryItem[] = [
        { id: 0, value: "FB account", label: "FB account", bgColor: "white", textColor: "black", platform: PlatformName.Facebook },
        { id: 1, value: "Terrencechungong", label: "Terrencechungong", bgColor: "white", textColor: "black", platform: PlatformName.TikTok },
        { id: 2, value: "terrence_chefor", label: "terrence_chefor", bgColor: "white", textColor: "black", platform: PlatformName.Instagram },
        { id: 3, value: "terrence.c1", label: "terrence.c1", bgColor: "white", textColor: "black", platform: PlatformName.Pinterest },

    ]

    const { setShowPostDetailsFromCalendarModal, setShowSelectPostTimeModal } = useModalStatesContext();
    const [showInformation, setShowInformation] = useState(true);
    const [showComments, setShowComments] = useState(true);
    const [labelsActive, setLabelsActive] = useState(false);
    const [socialsSectionActive, setSocialsSectionActive] = useState(false);

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
    const rowReusable: React.CSSProperties = { display: 'flex', flexDirection: 'row', alignItems: 'center' };
    const labelRowStyle: React.CSSProperties = { color: '#425466', fontWeight: '600', gap: '7px', fontSize: '14px' };
    const [labelDropdownOpen, setLabelDropdownOpen] = useState(false);
    const [socialsDropdownOpen, setSocialsDropdownOpen] = useState(false);
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const [statusSectionActive, setStatusSectionActive] = useState(false);
    const [notesSectionActive, setNotesSectionActive] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [showPostPreview, setShowPostPreview] = useState(true);
    const { globalProfilesArray } = useModalStatesContext();
    const {
        webViewPlatformVisibility,
        setWebViewPlatformVisibility } = useComposeSidePanelContext();

    const PlatformIcon = ({ platform }: { platform: PlatformName }) => {
        const Icon = PlatformIcons[platform];
        return <Icon color={PlatformColor[platform]} size={16} />;
    };


    const closeEverythingInInformation = () => {
        setLabelDropdownOpen(false)
        setLabelsActive(false)
        setSocialsSectionActive(false)
        setSocialsDropdownOpen(false);
        setStatusSectionActive(false)
        setStatusDropdownOpen(false)
        // fix animation error
        setNotesSectionActive(false)
    }


    const ProfileIcon = ({ profile }: { profile: Profile }) => {
        const Icon = PlatformIcons[profile.platform as PlatformName];
        return <Icon color={PlatformColor[profile.platform]} size={17} />;
    };


    return (
        <div
            style={containerStyle}
            onClick={() => {
                closeEverythingInInformation()
                setShowPostDetailsFromCalendarModal(false)
            }
            }>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className="rounded-lg"
                style={{
                    width: '525px', height: 'auto', maxHeight: '80%', backgroundColor: "#faf5fb",
                    padding: '20px', position: 'relative', overflowY: 'auto'
                }} onClick={(e) => {
                    e.stopPropagation()
                    // close all dropdowns and deactivate them
                    closeEverythingInInformation()
                }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div
                        onClick={() => {
                            closeEverythingInInformation()
                            setShowInformation((prev) => !prev)
                        }}
                        className={styles.informationHeader}><ChevronDown className={`${!showInformation ? 'rotate-[-180deg]' : ''} transition-transform duration-300`} size={16} /> Information</div>
                    <AnimatePresence>
                        {showInformation && <motion.div
                            initial={{ height: '0px', opacity: .5 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: '0px', opacity: .5 }}
                            transition={{ duration: 0.1 }}
                            style={{
                                display: 'flex', flexDirection: 'column', gap: '15px',
                                overflow: (socialsDropdownOpen || labelDropdownOpen || statusDropdownOpen) ? '' : 'hidden'
                            }}
                        >
                            <div className={styles.informationRow}>
                                <div style={{ ...rowReusable, ...labelRowStyle }}><User size={18} /><span>Created by</span></div>
                                <div style={{ width: '60%', ...rowReusable, justifyContent: 'space-between' }}>
                                    <div style={{ ...rowReusable, gap: '5px' }}>
                                        <div className="rounded-full h-4 w-4 bg-blue-400"></div>
                                        <span style={{ color: '#425466', fontSize: '14px' }}>Terrence</span>
                                    </div>
                                    <div style={{ color: '#a0aec0' }}>Date</div>
                                </div>
                            </div>

                            <div className={styles.informationRow}>
                                <div style={{ ...rowReusable, ...labelRowStyle }}><User size={18} /><span>Last modified by</span></div>
                                <div style={{ width: '60%', ...rowReusable, justifyContent: 'space-between' }}>
                                    <div style={{ ...rowReusable, gap: '5px' }}>
                                        <div className="rounded-full h-4 w-4 bg-blue-400"></div>
                                        <span style={{ color: '#425466', fontSize: '14px' }}>Terrence</span>
                                    </div>
                                    <div style={{ color: '#a0aec0' }}>Date</div>
                                </div>
                            </div>

                            <div className={styles.informationRow}>
                                <div style={{ ...rowReusable, ...labelRowStyle }}><TableOfContents style={{ transform: 'scaleX(-1)' }} size={16} /><span>Labels</span></div>
                                <div style={{ width: '60%', ...rowReusable, justifyContent: 'space-between' }}>
                                    {!labelsActive &&
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setLabelsActive(true)
                                            }}
                                            style={{ padding: '3px' }}
                                            className="flex flex-row gap-1 flex-wrap text-sm text-black hover:bg-gray-200 w-full cursor-pointer">
                                            {labelItems.map((object) => (
                                                <div
                                                    key={object.id}
                                                    className="flex items-center rounded gap-1"
                                                    style={{ backgroundColor: object.bgColor, cursor: "pointer", padding: "4px" }}
                                                >
                                                    <p className="m-0" style={{ color: object.textColor, fontWeight: "600", fontSize: '13px' }}>
                                                        {object.label}
                                                    </p>
                                                </div>))
                                            }
                                        </div>}

                                    {labelsActive && <CategorizeDropdown className="w-full" FOR_TESTING_REMEMBER_TO_DEPRECATE={true}
                                        isOpen={labelDropdownOpen} setIsOpen={setLabelDropdownOpen}
                                    />}
                                </div>
                            </div>

                            <div className={styles.informationRow}>
                                <div style={{ ...rowReusable, ...labelRowStyle }}><Globe size={16} /><span>Socials</span></div>
                                <div style={{ width: '60%', ...rowReusable, justifyContent: 'space-between' }}>
                                    {!socialsSectionActive &&
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setSocialsSectionActive(true)
                                            }}
                                            style={{ padding: '3px' }}
                                            className="flex flex-row gap-1 flex-wrap text-sm text-black hover:bg-gray-200 w-full cursor-pointer">
                                            {[socialItems[0]].map((object) => (
                                                <div
                                                    key={object.id}
                                                    className="flex items-center rounded gap-1"
                                                    style={{ backgroundColor: object.bgColor, cursor: "pointer", padding: "4px" }}
                                                >
                                                    <div className="m-0"
                                                        style={{ color: object.textColor, fontWeight: "600", fontSize: '13px', display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center' }}>
                                                        <PlatformIcon platform={object.platform} />
                                                        <span>{object.label}</span>
                                                    </div>
                                                </div>))
                                            }
                                        </div>}

                                    {socialsSectionActive && <CategorizeDropdown className="w-full" FOR_TESTING_REMEMBER_TO_DEPRECATE={true}
                                        itemType={InputType.SOCIALS}
                                        isOpen={socialsDropdownOpen} setIsOpen={setSocialsDropdownOpen}
                                    />}
                                </div>
                            </div>


                            <div className={styles.informationRow}>
                                <div style={{ ...rowReusable, ...labelRowStyle }}><CalendarClock size={18} /><span>Scheduled</span></div>
                                <div
                                    onClick={() => setShowSelectPostTimeModal(true)}
                                    className="hover:bg-gray-200 cursor-pointer"
                                    style={{ width: '60%', ...rowReusable, justifyContent: 'flex-start', alignItems: 'center', padding: "4px" }}>
                                    <span style={{ color: '#425466', fontSize: '14px' }}>
                                        20-12-2024 19:00 (America/EST)</span>
                                </div>
                            </div>


                            <div className={styles.informationRow}>
                                <div style={{ ...rowReusable, ...labelRowStyle }}><Siren size={16} /><span>Status</span></div>
                                <div style={{ width: '60%', ...rowReusable, justifyContent: 'space-between' }}>
                                    {!statusSectionActive &&
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setStatusSectionActive(true)
                                            }}
                                            style={{ padding: '3px' }}
                                            className="flex flex-row gap-1 flex-wrap text-sm text-black hover:bg-gray-200 w-full cursor-pointer">
                                            {[statusItems[0]].map((object) => (
                                                <div
                                                    key={object.id}
                                                    className="flex items-center gap-1"
                                                    style={{ backgroundColor: object.bgColor, cursor: "pointer", padding: "4px 6px 4px", borderRadius: '18px' }}
                                                >
                                                    <div className="m-0"
                                                        style={{ color: object.textColor, fontWeight: "600", fontSize: '13px', display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center' }}>
                                                        <div className={`rounded-full h-2 w-2`} style={{ backgroundColor: object.textColor }}></div>
                                                        <span>{object.label}</span>
                                                    </div>
                                                </div>))
                                            }
                                        </div>}

                                    {statusSectionActive && <CategorizeDropdown className="w-full" FOR_TESTING_REMEMBER_TO_DEPRECATE={true}
                                        itemType={InputType.STATUS}
                                        isOpen={statusDropdownOpen} setIsOpen={setStatusDropdownOpen}
                                    />}
                                </div>
                            </div>

                            {/* Added bottom since this is the last one */}
                            <div className={styles.informationRow} style={{ paddingBottom: '30px', borderBottom: '1px solid #DCDCDC' }}>
                                <div style={{ ...rowReusable, ...labelRowStyle }}><NotebookPen size={16} /><span>Notes</span></div>
                                {notesSectionActive &&
                                    (
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            style={{ display: 'flex', alignItems: "center", justifyContent: 'center', padding: '5px', width: '60%' }}>
                                            <Textarea className="rounded-md resize-none shadow-none"
                                                style={{ width: '100%', height: '100%', fontSize: '13px', padding: '4px' }} />
                                        </div>
                                    )}
                                {!notesSectionActive && <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setNotesSectionActive(true)
                                    }}
                                    className="hover:bg-gray-200 cursor-pointer"
                                    style={{ width: '60%', ...rowReusable, justifyContent: 'flex-start', alignItems: 'center', padding: "4px" }}>
                                    <span style={{ color: '#425466', fontSize: '14px' }}>no notes</span>
                                </div>}
                            </div>

                            {/* Recycling history */}

                        </motion.div>}
                    </AnimatePresence>


                    <div
                        onClick={() =>
                            setShowComments((prev) => !prev)}
                        className={styles.informationHeader}><ChevronDown className={`${!showComments ? 'rotate-[-180deg]' : ''} transition-transform duration-300`} size={16} /> Conversation</div>
                    <AnimatePresence>

                        {showComments && <motion.div
                            initial={{ height: '0px', opacity: .5 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: '0px', opacity: .5 }}
                            transition={{ duration: 0.1 }}
                            style={{ width: '100%', overflow: 'hidden' }}
                        >
                            <div style={{ width: '100%', paddingBottom: '30px', borderBottom: '1px solid #DCDCDC', gap: '20px', display: 'flex', flexDirection: 'column' }}>

                                <div
                                    className="border border-gray-200"
                                    style={{ backgroundColor: 'rgb(255,255,255,0.6)', display: 'flex', flexDirection: 'column', padding: '7px', gap: '3px' }}>
                                    <div contentEditable={true}
                                        onInput={(e) => setCommentContent(e.currentTarget.textContent || "")}
                                        style={{ width: '100%', minHeight: '70px', outline: 'none', fontSize: '13px', position: 'relative' }}>
                                        {commentContent == "" && <span style={{ position: 'absolute', top: 0, left: 0, color: '#a0aec0' }}>Add a comment...</span>}
                                    </div>
                                    <Button style={{ alignSelf: 'flex-end', color: 'white', fontSize: '13px' }}>Comment</Button>
                                </div>
                            </div>

                        </motion.div>}
                    </AnimatePresence>


                    <div
                        onClick={() =>
                            setShowPostPreview((prev) => !prev)}
                        className={styles.informationHeader}><ChevronDown className={`${!showPostPreview ? 'rotate-[-180deg]' : ''} transition-transform duration-300`} size={16} />Post Preview</div>
                    <AnimatePresence>
                        {showPostPreview && <motion.div
                            initial={{ height: '0px', opacity: .5 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: '0px', opacity: .5 }}
                            transition={{ duration: 0.1 }}
                            style={{ width: '100%', overflow: 'hidden' }}
                        >
                            <div className={styles.webPostPreviewContainers}>
                                {
                                    globalProfilesArray.filter(p => p.active && !p.isShort).length == 0 &&
                                    <WebPostPreviewParent width='100%' profile={null} />
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
                                                        <ProfileIcon profile={profile} />
                                                        {profile.name} Preview
                                                    </div>
                                                </Tooltip>
                                                <AnimatePresence>
                                                    {webViewPlatformVisibility[profile.id] && <WebPostPreviewParent width='100%' profile={profile} />}
                                                </AnimatePresence>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </motion.div>}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div >
    );
}