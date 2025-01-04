import { FaLinkedin } from "react-icons/fa"
import styles from '../ScssModules/schedulepostcomponent.module.scss';
import { FaYoutube } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram } from 'lucide-react'
import { FaPinterest, FaTiktok } from 'react-icons/fa'
import { FaFacebook } from "react-icons/fa";
import { SiGooglemybusiness, SiThreads } from "react-icons/si";
import { useEffect, useState } from "react";
import { PlatformColor, PlatformName, PostType, useModalStatesContext } from "@/layout";
import Tooltip from '@mui/material/Tooltip';
import { useWorkspaceContext } from "@/WorkspaceProvider";


interface PlatFormInput {
    platformName: PlatformName;
    contentTypeIsShort: boolean;
}

export const SelectAccountForPost: React.FC<PlatFormInput> = ({ platformName, contentTypeIsShort }) => {
    // X, Threads, facebook, ig, tiktok
    const { postTypeData, setPostTypeData } = useModalStatesContext();
    const { updateGlobalProfiles, globalProfilesArray } = useWorkspaceContext()
    const [accounts, setAccounts] = useState(globalProfilesArray.filter(profile => profile.platform === platformName && profile.isShort == contentTypeIsShort));

    useEffect(() => {
        setAccounts(globalProfilesArray.filter(profile => profile.platform === platformName && profile.isShort == contentTypeIsShort));
        // console.log("ACCOUNTS", accounts, globalProfilesArray.filter(profile => profile.platform === platformName && profile.isShort == contentTypeIsShort))
    }, [globalProfilesArray]);

    const platformIcons: Record<PlatformName, JSX.Element> = {
        [PlatformName.LinkedIn]: <FaLinkedin color='#0a66c2' />,
        [PlatformName.Youtube]: <FaYoutube color='#FF0000' />,
        [PlatformName.Facebook]: <FaFacebook color='#0866ff' />,
        [PlatformName.Instagram]: <Instagram color='#833ab4' />,
        [PlatformName.Threads]: <SiThreads color='#89CFF0' />,
        [PlatformName.TikTok]: <FaTiktok color='#000000' />,
        [PlatformName.Pinterest]: <FaPinterest color='#E60023' />,
    };


    const color = PlatformColor[platformName as PlatformName];
    console.log(color)
    const icon = platformIcons[platformName as PlatformName];

    // disabled depends on whats selected
    const [disabled, setDisabled] = useState(false);
    // Check over logic and simplify account data flow.

    useEffect(() => {
        // { id: account.id, name: account.name, platform: platformName, unique: false, active: true, isShortForm:contentTypeIsShort }
        // this will change to bell accounts but this will do for now since checked accounts is everything that has been checked.
        // good enough to be interactive without backend
        // its not being deactivated

        if (contentTypeIsShort && postTypeData.type == PostType.SHORT) {
            setDisabled(false);
            return
        } else if (!contentTypeIsShort && postTypeData.type == PostType.NORMAL) {
            setDisabled(false);
            return
        } else if (!postTypeData.defined) {
            setDisabled(false)
            return
        } else if (contentTypeIsShort && postTypeData.type != PostType.SHORT) {
            setDisabled(true)
            return
        } else if (!contentTypeIsShort && postTypeData.type != PostType.NORMAL) {
            setDisabled(true)
        }
        // its not disabled by default so unselectig will undisable

    }, [postTypeData]);

    // if everything unselected and in short form then change the state to normal form
    // if this is the first selected (indicated by mode in normal form and not disabled which is given, put in short form)

    //IT WORKS I JUST NEED TO USE PROPER ACCOUNTS AND ACCOUNT IDS
    const toggleGlobalPostType = (activating: boolean) => {
        // MIGHT BE 0 FOR CHECKED TYPES
        if (activating && contentTypeIsShort && postTypeData.type != PostType.SHORT) {
            setPostTypeData({ defined: true, type: PostType.SHORT })
            return
        }
        if (activating && !contentTypeIsShort && postTypeData.type != PostType.NORMAL) {
            setPostTypeData({ defined: true, type: PostType.NORMAL })
            return
        }
        // at t his point we know only shorts can be active since its being selected
        const remaingSelected = globalProfilesArray.filter(profile => profile.active && profile.isShort == contentTypeIsShort).length;
        console.log(remaingSelected, "REMAINING SELECTED");
        if (!activating && remaingSelected < 2) {
            setPostTypeData({ defined: false, type: PostType.NONE })
        }
    }

    const setCheckedHandler = (id: number) => {
        if (!disabled) {
            const active = !globalProfilesArray[id].active;
            console.log("ACTIVE", globalProfilesArray[id], active)
            updateGlobalProfiles(id, { active });
            toggleGlobalPostType(active)
        }
    }


    return (
        <div className={`rounded-md bg-accent ${styles.platformCard}`}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center', }}>
                {icon}
                <p style={{ color: 'black' }}>{platformName}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '17px' }}>
                {/* change to hashmap */}
                {accounts.map((account) => <AccountRow
                    id={account.id}
                    disabled={disabled}
                    checkColor={color}
                    setChecked={() => setCheckedHandler(account.id)} />)}
            </div>
        </div>

    )
}


interface AccountRowInput {
    checkColor: string;
    id: number;
    setChecked: () => void;
    disabled: boolean;
}
const AccountRow: React.FC<AccountRowInput> = ({ checkColor, id, setChecked, disabled }) => {
    // const platformIcons = {
    //     'LinkedIn': <FaLinkedin color='#0a66c2' />,
    //     'Youtube': <FaYoutube color='#FF0000' />,
    //     'Facebook': <FaFacebook color='#0866ff' />,
    //     'Instagram': <Instagram color='#833ab4' />,
    //     'Threads': <SiThreads color='#89CFF0' />,
    //     'TikTok': <FaTiktok color='#000000' />,
    // };
    const { globalProfilesArray } = useWorkspaceContext()
    const toolTipMessage = `Cannot use in combination with ${globalProfilesArray[id].isShort ? 'a normal post' : 'a short or reel'}`;
    const classNames = {
        '#0a66c2': "data-[state=checked]:bg-[#0a66c2] data-[state=checked]:text-white shadow-none w-4 h-4 ${styles.checkbox}",
        '#FF0000': "data-[state=checked]:bg-[#FF0000] data-[state=checked]:text-white shadow-none w-4 h-4 ${styles.checkbox}",
        '#0866ff': "data-[state=checked]:bg-[#0866ff] data-[state=checked]:text-white shadow-none w-4 h-4 ${styles.checkbox}",
        '#833ab4': "data-[state=checked]:bg-[#833ab4] data-[state=checked]:text-white shadow-none w-4 h-4 ${styles.checkbox}",
        '#89CFF0': "data-[state=checked]:bg-[#89CFF0] data-[state=checked]:text-white shadow-none w-4 h-4 ${styles.checkbox}",
        '#000000': "data-[state=checked]:bg-[#000000] data-[state=checked]:text-white shadow-none w-4 h-4 ${styles.checkbox}"
    }


    const accountRow = (
        <div
            onClick={() => setChecked()}
            className={`${!disabled && 'hover:bg-gray-200'} p-2 rounded-md ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed'} transition-colors duration-200 ease-in-out`} style={{ display: 'flex', flexDirection: 'row', gap: '9px', alignItems: 'center' }}>
            <Checkbox
                id="terms"
                disabled={disabled}
                checked={globalProfilesArray[id].active}
                style={{borderColor:checkColor}}
                className={classNames[checkColor]}
            />
            <Avatar style={{ width: '22px', height: '22px' }}>
                <AvatarImage style={{ width: '22px', height: '22px' }} src="https://github.com/shadcn.png" />
                <AvatarFallback style={{ width: '22px', height: '22px' }}>CN</AvatarFallback>
            </Avatar>

            <p style={{ fontWeight: '400', fontSize: '12.5px', color: 'black' }}>
                {globalProfilesArray[id].name}
            </p>
        </div>
    );

    return disabled ? <Tooltip title={toolTipMessage} placement="top" arrow followCursor>
        {accountRow}
    </Tooltip> : accountRow

}