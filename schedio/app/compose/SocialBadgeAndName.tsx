import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaLinkedin } from "react-icons/fa"
import styles from './schedulepostcomponent.module.scss';
import { IconType } from "react-icons/lib";
import { FaYoutube } from "react-icons/fa";

interface SocialBadgeAndNameInput {
    color: string;
}

export const SocialBadgeAndName: React.FC<SocialBadgeAndNameInput> = ({ color }) => {

    const badge: { [key: string]: JSX.Element } = {
        '#0a66c2': <FaLinkedin color={color} />,
        '#FF0000': <FaYoutube color={color} />
    }

    return (
        <div className={`${styles.socialBadgeAndName} transition-transform duration-200 transform hover:scale-105`}>
            <div className={`${styles.socialBadge}`}>
                <div className={`rounded-full h-14 w-14 ${styles.profileCircle}`} style={{ backgroundColor: color }}>
                    <div className='rounded-full bg-white h-12 w-12' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar>
                            <AvatarImage width={45} height={45} src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <div className={`rounded-full h-6 w-6 bg-white ${styles.socialPlatformIconCircle}`} >
                    {badge[color]}
                </div>
            </div>
            <div style={{ flexWrap: 'wrap', color: color }}>Terrence Chungong</div>
        </div>
    )
}