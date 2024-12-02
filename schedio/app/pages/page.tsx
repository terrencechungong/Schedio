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
import { truncateString } from '../utilFunctions'


export default function PageComponent() {
    const [isFirstScreen, setIsFirstScreen] = useState(true);
    const socialMediaAccounts = [
        { icon: Instagram, iconColor: '#833ab4', accountType: 'Instagram Business', captionText: " profile" },
        { icon: FaFacebook, iconColor: '#405de6', accountType: 'Facebook Page', captionText: '' },
        { icon: SiThreads, accountType: 'Threads', captionText: ' profile' },
        { icon: FaLinkedinIn, iconColor: '#0a66c2', accountType: 'LinkedIn', captionText: ' profile' },
        { icon: FaPinterest, iconColor: 'rgb(189, 8, 28)', accountType: 'Pintrest', captionText: ' profile' },
        { icon: FaYoutube, iconColor: '#FF0000', accountType: 'Youtube', captionText: ' profile' },
        { icon: FaTiktok, iconColor: '', accountType: 'TikTok', captionText: ' profile' },
        { icon: SiGooglemybusiness, iconColor: '#89CFF0', accountType: 'Google Business', captionText: ' profile' },
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


    const profiles = [
        { name: "John Doe", platformName: "Facebook" },
        { name: "Jane Smith", platformName: "Instagram" },
        { name: "Alex Johnson", platformName: "TikTok" },
        { name: "Emily Davis", platformName: "LinkedIn" },
        { name: "Michael Brown", platformName: "YouTube" },
    ];

    return (
        <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
            <AnimatePresence>
                {isFirstScreen ? (
                    <motion.div
                        key="screen1"
                        initial={{ x: 0, opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-70%", opacity: 0 }}
                        transition={{ duration: 0.25 }}

                        className={`${styles.container}`}>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <h2 style={{ margin: 0, fontWeight: '600', fontSize: '28px', color:'#1a202c' }}>Connected Accounts</h2>
                            </div>
                            <Button className='bg-primary text-white !p-7'
                                onClick={() => setIsFirstScreen(!isFirstScreen)}
                                style={{ padding: '7px !important', fontSize: '18px' }}>
                                Add Page<Plus style={{ width: '26px', height: '26px' }} />
                            </Button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap', gap: '16px' }}>


                            {/* as long as needed with wrapped text */}
                            {profiles.map((profile, index) => (
                                <PageCard name={profile.name} platformName={profile.platformName} date=""/>
                            ))}


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
                            <h3 style={{ margin: 0, fontWeight: '500', fontSize: '26px' }}>Add Pages</h3>
                            <p style={{ fontSize: '14px', color: '#202020', lineHeight: '15px' }}>Add a page to start posting from Schedio</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', borderRadius: '13px', width: '100%', backgroundColor: 'white', gap: '8px', marginTop: '24px', marginBottom: '24px', boxShadow: '-2px 13px 10px rgb(0,0,0,0.1)' }}>
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

interface PageCardInput {
    name: string;
    date: string;
    platformName: string;
}

const PageCard: React.FC<PageCardInput> = ({name, date, platformName}) => {


    const platformColors = {
        'LinkedIn': '#0a66c2',
        'YouTube': '#FF0000',
        'Facebook': '#0866ff',
        'Instagram': '#833ab4',
        'Threads': '#89CFF0',
        'TikTok': '#000000',
    };
    const platformIcons = {
        'LinkedIn':  <FaLinkedin color='#0a66c2' size={14} /> ,
        'YouTube': <FaYoutube color='#FF0000' size={14} />,
        'Facebook': <FaFacebook color='#0866ff' size={14} />,
        'Instagram': <Instagram color='#833ab4' size={14} />,
        'Threads': <SiThreads color='#89CFF0' size={14} />,
        'TikTok': <FaTiktok color='#000000' size={14} />,
    };
    type PlatformName = 'LinkedIn' | 'YouTube' | 'Facebook' | 'Instagram' | 'Threads' | 'TikTok';

    const color = platformColors[platformName as PlatformName];
    const icon = platformIcons[platformName as PlatformName];

    return (
        <div style={{
            boxShadow: '2px 2px 8px rgb(0,0,0,0.2)'
            , display: 'flex', flexDirection: 'column', padding: '17px', backgroundColor: 'white', borderRadius: '8px', gap: '3px', width: '320px', maxWidth: '400px',
        }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center', justifyContent:'center'}}>

                    <div className={`${styles.socialBadge}`}>
                        <div className={`rounded-full ${styles.profileCircle}`} style={{ backgroundColor: 'white', border: `3px solid ${color}` }}>
                            <Avatar>
                                <AvatarImage width={35} height={35} src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className={`rounded-full h-5 w-5 bg-white ${styles.socialPlatformIconCircle}`} >
                            {icon}
                        </div>
                    </div>
                            {/*Show full name on hover if its truncated */}

                    <p>{truncateString(name, 30)}</p>
                </div>
                <div className='hover:bg-gray-100 transition duration-200 p-1 rounded-md'>
                    <TakeActionOnUser />
                </div>
            </div>
        </div>
    )
}