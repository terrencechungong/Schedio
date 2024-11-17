"use client"
import { Button } from '@/components/ui/button'
import styles from './ScssModules/page.module.scss'
import { EllipsisVertical, Instagram, LogIn, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaLinkedin, FaPinterest, FaTiktok, FaYoutube } from 'react-icons/fa'
import { TakeActionOnUser } from '../team/SimpleUiComponents/TakeActionOnUser'
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react'
import { FaFacebook } from "react-icons/fa";
import { SiGooglemybusiness, SiThreads } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";


export default function PageComponent() {
    const [isFirstScreen, setIsFirstScreen] = useState(true);
    const socialMediaAccounts = [
        { icon: Instagram, iconColor: '#833ab4', accountType: 'Instagram Business', captionText:" profile" },
        { icon: FaFacebook, iconColor: '#405de6', accountType: 'Facebook Page', captionText:'' },
        { icon: SiThreads, accountType: 'Threads', captionText:' profile' },
        { icon: FaLinkedinIn, iconColor: '#0a66c2', accountType: 'LinkedIn', captionText:' profile' },
        { icon: FaPinterest, iconColor: 'rgb(189, 8, 28)', accountType: 'Pintrest', captionText: ' profile' },
        { icon: FaYoutube, iconColor: '#FF0000', accountType: 'Youtube', captionText:' profile' },
        { icon: FaTiktok, iconColor: '', accountType: 'TikTok', captionText:' profile' },
        { icon: SiGooglemybusiness, iconColor: '#89CFF0', accountType: 'Google Business', captionText:' profile' },
    ];

    socialMediaAccounts.map((account) => (
        <div key={account.accountType} className='bg-white hover:bg-accent' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderRadius: '9px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '13px', alignItems: 'center', cursor: 'pointer', padding: '5px' }}>
                <account.icon size={30} color={account.iconColor} />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '19px' }}>
                    <p className='text-primary' style={{ margin: 0, padding: 0, fontWeight: '500' }}>{account.accountType}</p>
                    <p style={{ margin: 0, padding: 0, fontSize: '13px', color: '#202020' }}>Connect a new {account.accountType} profile</p>
                </div>
            </div>
            <LogIn size={20} />
        </div>
    ));


    // const badge: { [key: string]: JSX.Element } = {
    //     '#0a66c2': <FaLinkedin color={color} />,
    //     '#FF0000': <FaYoutube color={color} />
    // }

    return (
        <div className='bg-accent' style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
            <AnimatePresence>
                {isFirstScreen ? (
                    <motion.div
                        key="screen1"
                        initial={{ x: 0, opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-70%", opacity: 0 }}
                        transition={{ duration: 0.25 }}

                        className={`${styles.container} bg-accent`}>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <h2 style={{ margin: 0, fontWeight:'500', fontSize:'26px' }}>Pages</h2>
                                <p style={{fontSize:'14px', color:'#202020',lineHeight:'15px'}}> Overview of all of the pages managed by Schedio</p>
                            </div>
                            <Button className='bg-primary text-white !p-7'
                                onClick={() => setIsFirstScreen(!isFirstScreen)}
                                style={{ padding: '7px !important', fontSize: '18px' }}>
                                Add Social<Plus style={{ width: '26px', height: '26px' }} />
                            </Button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap', gap: '16px' }}>


                            {/* as long as needed with wrapped text */}
                            <div style={{
                                boxShadow: '2px 2px 8px rgb(0,0,0,0.2)'
                                , display: 'flex', flexDirection: 'column', padding: '9px', backgroundColor: 'white', borderRadius: '8px', gap: '5px', width: '330px', maxWidth: '400px'
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center' }}>

                                        <div className={`${styles.socialBadge}`}>
                                            <div className={`rounded-full h-12 w-12 ${styles.profileCircle}`} style={{ backgroundColor: 'white' }}>
                                                <Avatar>
                                                    <AvatarImage width={35} height={35} src="https://github.com/shadcn.png" alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </div>

                                            <div className={`rounded-full h-5 w-5 bg-white ${styles.socialPlatformIconCircle}`} >
                                                <FaLinkedin color={'#0a66c2'} size={14} />
                                            </div>
                                        </div>


                                        <p>Terrence Chungong</p>
                                    </div>
                                    <TakeActionOnUser
                                    />

                                </div>


                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <i className='m-0' style={{ padding: 0, color: 'grey', fontSize: '14px' }}>Added: 10/12/2024</i>
                                </div>
                            </div>


                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="screen2"
                        initial={{ x: "70%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "70%", opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`${styles.container} bg-accent`}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <h3 style={{ margin: 0, fontWeight:'500', fontSize:'26px' }}>Add Pages</h3>
                            <p style={{fontSize:'14px', color:'#202020',lineHeight:'15px'}}>Add a page to start posting from Schedio</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', borderRadius: '13px', width: '100%', backgroundColor: 'white', gap: '8px', marginTop: '24px', marginBottom:'24px', boxShadow:'4px 3px 15px rgb(0,0,0,0.1)' }}>
                        {socialMediaAccounts.map((account) => (
                            <div key={account.accountType} className='bg-white hover:bg-accent' style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderRadius: '9px' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '13px', alignItems: 'center', padding: '5px' }}>
                                    <account.icon size={30} color={account.iconColor} />
                                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '19px' }}>
                                        <p className='text-primary' style={{ margin: 0, padding: 0, fontWeight: '500' }}>{account.accountType}</p>
                                        <p style={{ margin: 0, padding: 0, fontSize: '13px', color: '#202020' }}>Connect a new {account.accountType} {account.captionText}</p>
                                    </div>
                                </div>
                                <LogIn size={20} />
                            </div>
                            ))}
                        </div>
                        <Button 
                        onClick={() => setIsFirstScreen(true)}
                        className='bg-primary text-white p-5'>
                            Back
                        </Button>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

}