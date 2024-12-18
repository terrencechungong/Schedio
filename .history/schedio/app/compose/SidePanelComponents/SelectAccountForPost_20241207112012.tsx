import { FaLinkedin } from "react-icons/fa"
import styles from '../ScssModules/schedulepostcomponent.module.scss';
import { FaYoutube } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram } from 'lucide-react'
import { FaPinterest, FaTiktok } from 'react-icons/fa'
import { FaFacebook } from "react-icons/fa";
import { SiGooglemybusiness, SiThreads } from "react-icons/si";
import { useEffect, use, useState } from "react";
import { useModalStatesContext } from "@/app/layout";
import Tooltip from '@mui/material/Tooltip';


interface PlatFormInput {
    platformName: string;
    contentTypeIsShort: boolean;
}

export const SelectAccountForPost: React.FC<PlatFormInput> = ({ platformName, contentTypeIsShort }) => {
    // X, Threads, facebook, ig, tiktok
    const { setCheckedProfile, checkedProfile, postTypeIsShort, setPostTypeIsShort } = useModalStatesContext();
    const [accounts, setAccounts] = useState([{ id: 0, name: 'Terrence Chungong', checked: false }, { id: 1, name: 'Agha Igwacho', checked: false }]);
    const platformColors = {
        'LinkedIn': '#0a66c2',
        'Youtube': '#FF0000',
        'Facebook': '#0866ff',
        'Instagram': '#833ab4',
        'Threads': '#89CFF0',
        'TikTok': '#000000',
    };
    const platformIcons = {
        'LinkedIn': <FaLinkedin color='#0a66c2' />,
        'Youtube': <FaYoutube color='#FF0000' />,
        'Facebook': <FaFacebook color='#0866ff' />,
        'Instagram': <Instagram color='#833ab4' />,
        'Threads': <SiThreads color='#89CFF0' />,
        'TikTok': <FaTiktok color='#000000' />,
    };

    type PlatformName = 'LinkedIn' | 'Youtube' | 'Facebook' | 'Instagram' | 'Threads' | 'TikTok';

    const color = platformColors[platformName as PlatformName];
    const icon = platformIcons[platformName as PlatformName];

    // disabled depends on whats selected
    const [disabled, setDisabled] = useState(false);
    // Check over logic and simplify account data flow.

    useEffect(() => {
        // { id: account.id, name: account.name, platform: platformName, unique: false, active: true, isShortForm:contentTypeIsShort }
        // this will change to bell accounts but this will do for now since checked accounts is everything that has been checked.
        // good enough to be interactive without backend
        // its not being deactivated
        const normalPostSelected = checkedProfile.some(profile => profile.active && !profile.isShortForm);
        const shortFormSelected = checkedProfile.some(profile => profile.active && profile.isShortForm);

        if (contentTypeIsShort && normalPostSelected) {
            setDisabled(true);
        } else if (!contentTypeIsShort && shortFormSelected) {
            setDisabled(true);
        } else if (contentTypeIsShort && !normalPostSelected) {
            setDisabled(false)
        } else if (!contentTypeIsShort && !shortFormSelected) {
            setDisabled(false)
        }
        // its not disabled by default so unselectig will undisable

    }, [checkedProfile]);

    // if everything unselected and in short form then change the state to normal form
    // if this is the first selected (indicated by mode in normal form and not disabled which is given, put in short form)

    //IT WORKS I JUST NEED TO USE PROPER ACCOUNTS AND ACCOUNT IDS
    const toggleGlobalPostType = (activating: boolean) => {
        if (activating && contentTypeIsShort && !postTypeIsShort) {
            setPostTypeIsShort(true)
            return
        }
        const shortFormSelectedCount = checkedProfile.filter(profile => profile.active && profile.isShortForm).length;
        console.log(!activating, shortFormSelectedCount, contentTypeIsShort)
        if (!activating && shortFormSelectedCount < 2 && contentTypeIsShort) {
            setPostTypeIsShort(false)
        }
    }

    const setCheckedHandler = (val: boolean, account) => {
        if (!disabled) {
            setAccounts((prev) => prev.map((p) => {
                if (p.id == account.id) return { ...p, checked: val };
                return p;
            }));
            if (checkedProfile.some(profile => profile.id === account.id)) {
                setCheckedProfile((prev) =>
                    prev.map((p) => {
                        if (p.id == account.id) return { ...p, active: val };
                        return p;
                    }))
            } else {
                setCheckedProfile((prev) => [...prev, { id: account.id, name: account.name, platform: platformName, unique: false, active: true, isShortForm: contentTypeIsShort }]);
            }
            toggleGlobalPostType(val)
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
                {accounts.map((account) => <AccountRow disabled={disabled}
                    contentTypeIsShort={contentTypeIsShort}
                    checkColor={color}
                    checked={account.checked}
                    name={account.name}
                    setChecked={(val: boolean) => setCheckedHandler(val, account)} />)}
            </div>
        </div>

    )
}


interface AccountRowInput {
    contentTypeIsShort: boolean;
    checkColor: string;
    checked: boolean;
    name: string;
    setChecked: (val: boolean) => void;
    disabled: boolean;
}
const AccountRow: React.FC<AccountRowInput> = ({ checkColor, checked, name, setChecked, disabled, contentTypeIsShort }) => {

    const toolTipMessage = `Cannot use in combination with ${contentTypeIsShort ? 'a normal post' : 'a short or reel' }`
    const accountRow = (
        <div
            onClick={() => setChecked(!checked)}
            className={`${!disabled && 'hover:bg-gray-200'} p-2 rounded-md ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed'} transition-colors duration-200 ease-in-out`} style={{ display: 'flex', flexDirection: 'row', gap: '9px', alignItems: 'center' }}>
            <Checkbox
                id="terms"
                disabled={disabled}
                checked={checked}
                className={`border-[${checkColor}] data-[state=checked]:bg-[${checkColor}] data-[state=checked]:text-white shadow-none w-4 h-4`}
            />
            <Avatar style={{ width: '22px', height: '22px' }}>
                <AvatarImage style={{ width: '22px', height: '22px' }} src="https://github.com/shadcn.png" />
                <AvatarFallback style={{ width: '22px', height: '22px' }}>CN</AvatarFallback>
            </Avatar>

            <p style={{ fontWeight: '400', fontSize: '12.5px', color: 'black' }}>
                {name}
            </p>
        </div>
    );

    return disabled ? <Tooltip title={toolTipMessage} placement="top" arrow followCursor>
        {accountRow}
    </Tooltip> : accountRow

}