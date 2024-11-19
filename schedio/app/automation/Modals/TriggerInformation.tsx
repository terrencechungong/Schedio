"use client"
import { motion } from "framer-motion";
import styles from '../ScssModules/triggerinformation.module.scss'
import { useModalStatesContext } from "@/app/layout";
import { Info, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateDraftDropdown } from "../SimpleUiComponents/CreateDraftDropdown";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaLinkedin } from "react-icons/fa";
import { CategorizeDropdown } from "@/app/compose/CategorizeDropdown";
import React, { useState } from "react";

export const TriggerInformation = () => {
    const { setShowTriggerInfoModal } = useModalStatesContext();
    const [socialBadgeColored, setSocialBadgeColored] = useState<{ [key: number]: boolean }>({ 0: false, 1: false, 2: false });

    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20
    };
    const [isOpen, setIsOpen] = React.useState(false)
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(now.getUTCDate()).padStart(2, "0");
    const hours = String(now.getUTCHours()).padStart(2, "0");
    const minutes = String(now.getUTCMinutes()).padStart(2, "0");

    // Combine components into the desired format
    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}`;



    return (
        <div
            style={containerStyle}
            onClick={() => setShowTriggerInfoModal(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className={`${styles.modalContainer}`} onClick={(e) => {
                    setIsOpen(false)
                    e.stopPropagation()
                }}>
                <div className={styles.header}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '9px', alignItems: 'center', alignSelf: 'center' }}>
                        <div className="rounded-full h-4 w-4 bg-gray-400"></div>
                        <p style={{ fontSize: '23px', fontWeight: '500' }}>Draft</p>
                    </div>
                    <div className={`bg-white border-[0px] hover:brightness-90 transition duration-200 ${styles.headerX}`}
                        onClick={() => setShowTriggerInfoModal(false)}
                    >
                        <X size={18} />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '360px', }}>
                    <div style={{ width: '48%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <p className="text-gray-500 text-sm">TRIGGER URL</p>
                                <div className="w-full bg-accent border-[0.4px] rounded-md h-[95px] !p-3" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                                    <p className="text-sm" style={{ fontWeight: '500' }}>https://api.schedio.com/triggers/BAyKK</p>
                                    <p className="text-sm" style={{ fontWeight: '500' }}>?{" "}<span className="text-blue-700">text=Your text here</span></p>
                                    <p className="text-sm" style={{ fontWeight: '500' }}>&{" "}<span className="text-blue-700">media_urls=https://site.com/img1.jpg</span></p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <p>Name this trigger <span className="text-red-500">*</span></p>
                                <Input type="text" placeholder="Email" className="w-full shadow-none" value={dateTimeString} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <p>What happens when triggered? <span className="text-red-500">*</span></p>
                                <CreateDraftDropdown />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <p>Pick a post template <span className="bg-red">*</span></p>
                                <CreateDraftDropdown />
                            </div>
                        </div>


                    </div>



                    <div style={{ width: '42%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '20px', borderBottom: '0.5px solid #F0F0F0' }}>
                            <p className="text-gray-500 text-sm">CHOOSE SOCIAL</p>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '15px' }}>
                                {Object.keys(socialBadgeColored).map((key) => (
                                    <RevisedBadge
                                        // Add a key for each element in a list
                                        color={socialBadgeColored[Number(key)]} // Use a color conditionally if needed
                                        clickFunction={() => setSocialBadgeColored((prev) => ({
                                            ...prev, // Spread the previous state
                                            [Number(key)]: !prev[Number(key)] // Toggle the boolean value for the current key
                                        }))}
                                    />
                                ))}

                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '20px' }}>
                            <p className="text-gray-500 text-sm">ORGANIZE</p>
                            <CategorizeDropdown isOpen={isOpen} setIsOpen={setIsOpen} />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '50px', alignItems: 'center' }}>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="text-blue-500"><Info size={15} />How does this work?</p>
                    <Button
                        className="!p-6"
                        style={{ padding: '6px' }}
                    >Save</Button>
                </div>


            </motion.div>

        </div>
    );
}

// 4523

const RevisedBadge = ({ color, clickFunction }: { color: boolean, clickFunction: () => void }) => {

    return (
        <div className={`${styles.socialBadge} transition-transform duration-100 transform hover:scale-105 active:scale-95`}
            onClick={() => clickFunction()}
            style={{ filter: (color ? '' : 'grayscale(100%)') }}>
            <div className={`rounded-full  ${styles.profileCircle}`} style={{ backgroundColor: 'white' }}>
                <Avatar>
                    <AvatarImage width={35} height={35} src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>

            <div className={`rounded-full h-5 w-5 bg-white ${styles.socialPlatformIconCircle}`} >
                <FaLinkedin color={'#0a66c2'} size={14} />
            </div>
            {/* truncate */}
            <p style={{ textAlign: 'center', color:'#0a66c2' }}>Terrence Chungong</p>
        </div>
    )
}