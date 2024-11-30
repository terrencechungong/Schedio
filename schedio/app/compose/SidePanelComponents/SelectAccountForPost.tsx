import { FaLinkedin } from "react-icons/fa"
import styles from '../ScssModules/schedulepostcomponent.module.scss';
import { FaYoutube } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram } from 'lucide-react'
import {  FaPinterest, FaTiktok } from 'react-icons/fa'
import { FaFacebook } from "react-icons/fa";
import { SiGooglemybusiness, SiThreads } from "react-icons/si";
import { useState } from "react";


interface PlatFormInput {
    platformName: string;
}

export const SelectAccountForPost: React.FC<PlatFormInput> = ({platformName}) => {
    // X, Threads, facebook, ig, tiktok
    const [accounts, setAccounts] = useState([{ id: 0, name: 'Terrence Chungong', checked: false }, { id: 1, name: 'Agha Igwacho', checked: false }]);
    const platformColors = {
        'LinkedIn': '#0a66c2',
        'Youtube': '#FF0000',
        'Facebook': '#405de6',
        'Instagram': '#833ab4',
        'Threads': '#89CFF0',
        'TikTok': '#000000',
    };
    const platformIcons = {
        'LinkedIn':  <FaLinkedin color='#0a66c2' /> ,
        'Youtube': <FaYoutube color='#FF0000' />,
        'Facebook': <FaFacebook color='#405de6' />,
        'Instagram': <Instagram color='#833ab4' />,
        'Threads': <SiThreads color='#89CFF0' />,
        'TikTok': <FaTiktok color='#000000' />,
    };
    type PlatformName = 'LinkedIn' | 'Youtube' | 'Facebook' | 'Instagram' | 'Threads' | 'TikTok';

    const color = platformColors[platformName as PlatformName];
    const icon = platformIcons[platformName as PlatformName];


    return (
        <div className={`rounded-md bg-accent ${styles.platformCard}`}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center', }}>
                {icon}
                <p style={{ color: 'black' }}>{platformName}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '17px' }}>
                {accounts.map((account) => <AccountRow checkColor={color} checked={account.checked} name={account.name}
                    setChecked={(val: boolean) => setAccounts((prev) => prev.map((p) => {
                        if (p.id == account.id) return { ...p, checked: val };
                        return p;
                    }))} />)}
            </div>
        </div>

    )
}


interface AccountRowInput {
    checkColor: string;
    checked: boolean;
    name: string;
    setChecked: (val: boolean) => void
}
const AccountRow: React.FC<AccountRowInput> = ({ checkColor, checked, name, setChecked }) => {

    return (
        <div
            onClick={() => setChecked(!checked)}
            className='hover:bg-gray-200 p-2 rounded-md cursor-pointer transition-colors duration-200 ease-in-out' style={{ display: 'flex', flexDirection: 'row', gap: '9px', alignItems: 'center' }}>
            <Checkbox
                id="terms"
                checked={checked}
                className={`border-[${checkColor}] data-[state=checked]:bg-[${checkColor}] data-[state=checked]:text-white shadow-none w-4 h-4`}
            />
            <Avatar style={{ width: '22px', height: '22px' }}>
                <AvatarImage style={{ width: '22px', height: '22px' }} src="https://github.com/shadcn.png" />
                <AvatarFallback style={{ width: '22px', height: '22px' }}>CN</AvatarFallback>
            </Avatar>

            <p style={{ fontWeight: '400', fontSize: '12.5px', color:'black' }}>
                {name}
            </p>
        </div>
    )
}