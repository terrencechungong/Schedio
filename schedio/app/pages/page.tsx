"use client"
import { Button } from '@/components/ui/button'
import styles from './ScssModules/page.module.scss'
import { EllipsisVertical, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaLinkedin, FaYoutube } from 'react-icons/fa'
import { TakeActionOnUser } from '../team/SimpleUiComponents/TakeActionOnUser'
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react'


export default function PageComponent() {
    const [isFirstScreen, setIsFirstScreen] = useState(true);


    // const badge: { [key: string]: JSX.Element } = {
    //     '#0a66c2': <FaLinkedin color={color} />,
    //     '#FF0000': <FaYoutube color={color} />
    // }

    return (
        <div style={{width:'100%', height:'100vh', overflow:'hidden'}}>
        <AnimatePresence>
            {isFirstScreen ? (
                <motion.div
                key="screen1"
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ duration: 0.3 }}

                    className={`${styles.container} bg-accent`}>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                            <h2 style={{ margin: 0 }}>Pages</h2>
                            <p> Overview of all of the pages managed by Schedio</p>
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
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`${styles.container} bg-accent`}>
                    <Button className='bg-primary text-white !p-7'
                        onClick={() => setIsFirstScreen(!isFirstScreen)}
                        style={{ padding: '7px !important', fontSize: '18px' }}>
                        Add Social<Plus style={{ width: '26px', height: '26px' }} />
                    </Button>

                </motion.div>
            )}
        </AnimatePresence>
        </div>
    )

}