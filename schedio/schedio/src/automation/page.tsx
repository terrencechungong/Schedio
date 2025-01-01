
 
import { Button } from '@/components/ui/button'
 
import styles from './ScssModules/automation.module.scss'
 
import { Copy, Ellipsis, Plus } from 'lucide-react'
 
import { Checkbox } from '@/components/ui/checkbox';
 
import { Switch } from '@/components/ui/switch';
 
import { useState } from 'react';
 
import { useModalStatesContext } from '../layout';

export default function AutomationPage() {
    const { setShowTriggerInfoModal } = useModalStatesContext();
    const [selectedTab, setSelected] = useState(true); // true:triggers, false:notifications
    const datas = [
        {
            "CREATED": "13 Mar 04:56",
            "NAME": "New trigger (2024-11-18 09:01)",
            "TRIGGER URL": "https://api.example.com/triggers/461607",
            "ACTION": "Create draft",
            "ACTIVE": "Yes"
        },
        {
            "CREATED": "15 Feb 02:46",
            "NAME": "New trigger (2024-11-18 09:01)",
            "TRIGGER URL": "https://api.example.com/triggers/363323",
            "ACTION": "Send email",
            "ACTIVE": "Yes"
        },
        {
            "CREATED": "08 Jun 07:09",
            "NAME": "New trigger (2024-11-18 09:01)",
            "TRIGGER URL": "https://api.example.com/triggers/70ccccccccccccccccccccccccccccccccccccccccccc7786",
            "ACTION": "Publish post",
            "ACTIVE": "Yes"
        },
        {
            "CREATED": "04 Jan 09:02",
            "NAME": "Triggesdsdsdsdsdr 6009",
            "TRIGGER URL": "https://api.example.com/triggecccccccccccccccccccccccccccccccccccccccccccrs/831429",
            "ACTION": "Send email",
            "ACTIVE": "No"
        },
        {
            "CREATED": "09 Nov 16:01",
            "NAME": "Triggdssdsdsdsder 9303",
            "TRIGGER URL": "https://api.example.com/triggccccccccccccccccccccccccccccccccccccccccccccccers/968672",
            "ACTION": "Send email",
            "ACTIVE": "Yes"
        }
    ];

    const truncate = (str: string): string => {
        if (str.length <= 42) return str;
        return str.substring(0, 41).concat("...")
    }



    return (
        <div className={`bg-accent ${styles.container}`}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>Search</p>
                <p>AA runs</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '250px', display: 'flex', flexDirection: 'row' }}>
                    <p className={`border-b border-b-[2px] cursor-pointer ${selectedTab && 'border-b-primary text-primary'}`}
                        style={{ width: '115px', textAlign: 'center', padding: '6px' }}
                        onClick={() => setSelected(true)}
                    >Triggers</p>
                    <p className={`border-b border-b-[2px] cursor-pointer ${!selectedTab && 'border-b-primary text-primary'}`}
                        style={{ width: '135px', textAlign: 'center', padding: '6px' }}
                        onClick={() => setSelected(false)}
                    >Notifications</p>
                </div>
                <Button className='bg-primary text-white !p-5'
                    onClick={() => setShowTriggerInfoModal(true)}
                    style={{ padding: '5px !important', fontSize: '14px' }}>
                    Create trigger<Plus style={{ width: '18px', height: '18px' }} />
                </Button>
            </div>

            <div className={styles.tableContainer}>
                <div className={styles.tableWrapper}>
                    <table>
                        <thead>
                            {selectedTab ?
                                <tr>
                                    <th><Checkbox className='' /></th>
                                    <th>CREATED</th>
                                    <th>NAME</th>
                                    <th>TRIGGER URL</th>
                                    <th>ACTION</th>
                                    <th>ACTIVE</th>
                                    <th></th>
                                </tr> :
                                <tr>
                                    <th><Checkbox className='' /></th>
                                    <th>CREATED</th>
                                    <th>NAME</th>
                                    <th>WEBHOOK URL</th>
                                    <th>EVENT</th>
                                    <th>ACTIVE</th>
                                    <th></th>
                                </tr>
                            }
                        </thead>
                        <tbody>
                            {selectedTab ?

                                datas.map((data, index) => (
                                    <tr key={index} style={{}}>
                                        <td ><Checkbox className='' /></td>
                                        <td>{data.CREATED}</td>
                                        <td className='cursor-pointer hover:bg-gray-100'>
                                            {data.NAME}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', maxWidth: '90%' }}>
                                                <span className='text-blue-500 cursor-pointer'>{truncate(data['TRIGGER URL'])}</span>
                                                <div className={`bg-accent border-[0px] hover:brightness-90 transition duration-200 ${styles.copyUrl}`}
                                                >
                                                    <Copy size={14} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{data.ACTION}</td>
                                        <td><Switch /></td>
                                        <td>
                                            <div className={`bg-white border-[0px] hover:brightness-90 transition duration-200 ${styles.ellipsis}`}
                                            >
                                                <Ellipsis />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                :
                                datas.map((data, index) => (
                                    <tr key={index} style={{}}>
                                        <td ><Checkbox className='' /></td>
                                        <td>{data.CREATED}</td>
                                        <td className='cursor-pointer hover:bg-gray-100'>
                                            {data.NAME}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', maxWidth: '90%' }}>
                                                <span className='text-blue-500 cursor-pointer'>Not set</span>
                                                <div className={`bg-accent border-[0px] hover:brightness-90 transition duration-200 ${styles.copyUrl}`}
                                                >
                                                    <Copy size={14} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{data.ACTION}</td>
                                        <td><Switch /></td>
                                        <td>
                                            <div className={`bg-white border-[0px] hover:brightness-90 transition duration-200 ${styles.ellipsis}`}
                                            >
                                                <Ellipsis />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )

}