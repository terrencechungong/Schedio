"use client"
// app/schedule/page.tsx
import { Button } from '@/components/ui/button';
import styles from './ScssModules/teampage.module.scss'
import { Ellipsis, Plus } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useModalStatesContext } from "@/app/layout";
import { TakeActionOnUser } from './SimpleUiComponents/TakeActionOnUser';

export default function TeamPage() {
    const { setShowUserPermissionModal, setShowAddTeamMemberModal } = useModalStatesContext();
    const members = [
        { name: 'Terrence Chungong', email: 'terrencechungong2@gmail.com', role: 'Owner', you: true },
        { name: 'Terrence Chungong', email: 'terrencechungong4@gmail.com', role: 'Member', you: false },
    ];


    return (
        <div className={`${styles.container} bg-accent`}>
            <div className={styles.header}>
                <h2>Team</h2>
                <Button className='bg-primary text-white !p-7'
                    onClick={() => setShowAddTeamMemberModal(true)}
                    style={{ padding: '7px !important', fontSize: '18px' }}>
                    Add team member <Plus style={{ width: '26px', height: '26px' }} />
                </Button>
            </div>


            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>TEAM MEMBER</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={index} style={{}}>
                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '14px', alignItems: 'center' }}>
                                        <Avatar><AvatarFallback>T</AvatarFallback></Avatar>
                                        <div>
                                            {member.name}
                                        </div>
                                    </div>
                                </td>
                                <td>{member.email}</td>
                                <td>
                                    <div className={styles.roleDiv}>
                                        <Button
                                            style={{ fontSize: '13px' }}
                                            className='bg-accent text-black shadow-none hover:bg-gray-200'
                                            onClick={() => setShowUserPermissionModal(true)}
                                        >View/Edit permissions</Button>
                                    </div>
                                </td>
                                <td>
                                    <TakeActionOnUser />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}
