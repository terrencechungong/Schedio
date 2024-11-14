import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaLinkedin } from "react-icons/fa"
import styles from './schedulepostcomponent.module.scss';


export const SocialBadgeAndName = () => {

    return (
        <div className={`${styles.socialBadgeAndName} transition-transform duration-200 transform hover:scale-105`}>
            <div className={`${styles.socialBadge}`}>
                <div className={`rounded-full h-14 w-14 ${styles.profileCircle}`} style={{ backgroundColor: '#0a66c2' }}>
                    <div className='rounded-full bg-white h-12 w-12' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar>
                            <AvatarImage width={45} height={45} src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <div className={`rounded-full h-6 w-6 bg-white ${styles.socialPlatformIconCircle}`} >
                    <FaLinkedin color='#0a66c2' />
                </div>
            </div>
            <div style={{ flexWrap: 'wrap', color: '#0a66c2' }}>Terrence Chungong</div>
        </div>
    )
}