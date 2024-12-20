import { ChevronDown, Globe, TableOfContents, CalendarClock, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PlatformColor, PlatformIcons, PlatformName, useModalStatesContext } from "@/app/layout";
import { useState } from "react";
import styles from '../ScssModules/postdetails.module.scss';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CategorizeDropdown, InputType } from "@/app/compose/CategorizeDropdown";

// REMEMBER TO GIVE EVERYTHING AN ELLIPSIS

export const PostDetails = () => {
    const labelItems = [
        { id: 0, value: "tip", label: "Tip", bgColor: "#FF0000", textColor: "white" },
        { id: 1, value: "promotion", label: "Promotion", bgColor: "#FF91B3", textColor: "white" },
        { id: 2, value: "thread", label: "Thread", bgColor: "#1BC7B7", textColor: "white" },
        { id: 3, value: "motivation", label: "Motivation", bgColor: "#FFE13D", textColor: "black" },
    ]
    const socialItems: CategoryItem[] = [
        { id: 0, value: "Schedio", label: "Tip", bgColor: "white", textColor: "black", platform: PlatformName.Facebook },
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

    const PlatformIcon = ({ platform }: { platform: PlatformName }) => {
        const Icon = PlatformIcons[platform];
        return <Icon color={PlatformColor[platform]} size={16} />;
    };


    return (
        <div
            style={containerStyle}
            onClick={() => setShowPostDetailsFromCalendarModal(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className="rounded-lg"
                style={{
                    width: '525px', height: '80%', backgroundColor: "#faf5fb",
                    padding: '20px', position: 'relative'
                }} onClick={(e) => {
                    e.stopPropagation()
                    // close all dropdowns and deactivate them
                    setLabelDropdownOpen(false)
                    setLabelsActive(false)
                    setSocialsSectionActive(false)
                    setSocialsDropdownOpen(false)
                }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div
                        onClick={() => setShowInformation((prev) => !prev)}
                        className={styles.informationHeader}><ChevronDown className={`${!showInformation ? 'rotate-[-180deg]' : ''} transition-transform duration-300`} size={16} /> Information</div>
                    <AnimatePresence>
                        {showInformation && <motion.div
                            initial={{ height: '0px', opacity: .5 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: '0px', opacity: .5 }}
                            transition={{ duration: 0.1 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '15px',overflow:'hidden' }}
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

                                    {labelsActive && <CategorizeDropdown FOR_TESTING_REMEMBER_TO_DEPRECATE={true}
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
                                            {socialItems.map((object) => (
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


                        </motion.div>}
                    </AnimatePresence>
                </div>


            </motion.div>
        </div>
    );
}