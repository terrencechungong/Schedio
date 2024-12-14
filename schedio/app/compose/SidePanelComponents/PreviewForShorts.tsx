import styles from '../ScssModules/shortdevicepreview.module.scss'
import { useModalStatesContext } from '@/app/layout';
import { Skeleton } from '@/components/ui/skeleton';
import iphoneFrame from '../../assets/iphoneframe2.png'
import signalStrength from '../../assets/signal.png'
import battery from '../../assets/image (4).png'
import wifi from '../../assets/image (5).png'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiSolidCommentDetail } from "react-icons/bi";

export const PreviewForShorts = () => {
    const { shortVideoForPostData, postVariations, postVariationKey } = useModalStatesContext();

    return (
        <div className={styles.container} style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#1b1b19' }}>

            {/* FRAME */}
            <div style={{ position: 'absolute', top: 0, zIndex: 10 }}>
                <img src={iphoneFrame.src} style={{ width: '383px', height: '630px' }} />
            </div>



            {/* SCREEN OVERLAY */}
            <div style={{
                position: 'absolute', padding: '5px 12px 5px', top: '21px', left: '25px', width: '333px', height: '520px', zIndex: 1,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
                <div style={{ width: '100%', height: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '7px' }}>
                    <div style={{ width: '37%', textAlign: 'center' }}>
                        <p style={{ color: 'white', margin: 0, padding: 0, lineHeight: '15px' }}>8:19</p>
                    </div>
                    <div style={{ width: '37%', height: '15px', display: 'flex', flexDirection: 'row', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={signalStrength.src} style={{ width: 'auto', height: '100%' }} />
                        <img src={wifi.src} style={{ width: 'auto', height: '105%' }} />
                        <img src={battery.src} style={{ width: 'auto', height: '103%' }} />
                    </div>
                </div>
                {/* YOUTUBE OVERLAY */}
                <div style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', gap: '5px', color: 'white' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', justifyContent: 'space-between' }}>
                        <div
                            style={{
                                flexGrow: 1, alignSelf: 'flex-end', width: '100%',

                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                            dangerouslySetInnerHTML={{ __html: postVariations[postVariationKey].postCaption }}
                        >

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', color: 'white', marginBottom: '14px', width: '12%' }}>
                            <div style={{ width: 'auto', height: 'auto', display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
                                <RiThumbUpFill color='white' size={30} />
                                <p style={{ fontSize: '12px' }}>230</p>
                            </div>
                            <div style={{ width: 'auto', height: 'auto', display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
                                <RiThumbDownFill color='white' size={30} />
                                <p style={{ fontSize: '12px' }}>Dislike</p>
                            </div>
                            <div style={{ width: 'auto', height: 'auto', display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
                                <BiSolidCommentDetail color='white' size={30} style={{ transform: "scaleX(-1)" }} />
                                <p style={{ fontSize: '12px' }}>32</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}>
                            <Avatar>
                                <AvatarImage width={20} height={20} src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p style={{ color: 'white', fontWeight: 'bold', letterSpacing: '0.5px' }}>Terrence C...</p>
                        </div>
                        <Button className='bg-[#FF0000] !px-9 !py-6 rounded-none text-white' style={{ fontWeight: 'bold' }}>
                            SUBSCRIBE
                        </Button>

                    </div>
                </div>
            </div>


            {/* VIDEO */}
            <div style={{ position: 'absolute', backgroundColor: '#1b1b19', top: '17px', left: '25px', width: '333px', height: '596px', zIndex: 0, borderRadius: '10px' }}>
                <video src={shortVideoForPostData.url} style={{ width: '100%', height: '100%', borderRadius: '10px' }} controls />
            </div>

        </div>
    )
}