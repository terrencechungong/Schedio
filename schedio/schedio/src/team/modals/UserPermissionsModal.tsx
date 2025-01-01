import { useModalStatesContext } from "@/layout";
import { motion } from "framer-motion";
import styles from '../ScssModules/userpermissions.module.scss';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const UserPermissionsModal = () => {

    const { setShowUserPermissionModal } = useModalStatesContext();

    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: '50px',
        paddingBottom: '80px',
        zIndex: 20
    };

    const permissions = [
        { name: "Add team members", description: "Allows adding new team members to the system.", granted: true },
        { name: "Remove team members", description: "Allows removing existing team members.", granted: false },
        { name: "Assign roles and permissions", description: "Grants the ability to assign roles and set permissions.", granted: true },
        { name: "Manage billing and subscription", description: "Access to manage billing and subscription settings.", granted: true },
        { name: "Access analytics", description: "Allows viewing analytics for posts and campaigns.", granted: true },
        { name: "Approve posts", description: "Permission to approve or reject posts before publishing.", granted: false },
        { name: "Draft posts", description: "Allows creating drafts for posts.", granted: true },
        { name: "Edit posts", description: "Allows editing drafts or published posts.", granted: true },
        { name: "Publish posts", description: "Grants the ability to publish posts immediately.", granted: false },
        { name: "View comments", description: "Permission to view comments and responses.", granted: true },
        { name: "Moderate comments", description: "Allows moderating user-generated comments.", granted: false },
    ];



    return (
        <div
            style={containerStyle}
            onClick={() => setShowUserPermissionModal(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <h3>{`{{usernames}} Permissions`}</h3>
                    <Button
                        onClick={() => setShowUserPermissionModal(false)}
                        className="shadow-none bg-transparent text-black hover:bg-accent !p-2">
                        <X
                            style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                            size={50} />
                    </Button>
                </div>

                <div className={styles.permissionsContainer}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '7px', flexWrap: 'wrap' }}>
                        <div className="rounded-md bg-gray-300" style={{
                            width: '90px', height: '20px', color: 'black', display: 'flex', flexDirection: 'row', paddingLeft: '5px', gap: '5px',
                            alignItems: 'center', fontSize: '13px', cursor: 'pointer',
                        }}>
                            <div style={{ height: '9px', width: '9px', borderRadius: '25px', backgroundColor: 'rgb(42, 222, 42)', boxShadow: '0px 0px 5px greenyellow' }}></div>
                            <p style={{ fontSize: '13px', paddingTop: '1px' }} className="m-0">Admin</p>
                        </div>
                        <div className="rounded-md bg-gray-300" style={{
                            width: '90px', height: '20px', color: 'black', display: 'flex', flexDirection: 'row', paddingLeft: '5px', gap: '5px',
                            alignItems: 'center', fontSize: '13px', cursor: 'pointer',
                        }}>
                            <div style={{ height: '9px', width: '9px', borderRadius: '25px', backgroundColor: 'rgb(42, 222, 42)', boxShadow: '0px 0px 5px greenyellow' }}></div>
                            <p style={{ fontSize: '13px', paddingTop: '1px' }} className="m-0">Viewer</p>
                        </div>
                    </div>

                    <div style={{ flexGrow: 1, overflowY: 'auto', borderBottom: '0.5px solid #eaeaea' }}>
                        <table >
                            <thead>
                                <tr>
                                    <th>PERMISSION NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>GRANTED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {permissions.map((permission, index) => (
                                    <tr key={index}>
                                        <td style={{ color: '#383838' }}>{permission.name}</td>
                                        <td style={{ color: '#383838' }}>
                                            {permission.description}
                                        </td>
                                        <td>
                                            <Switch />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flexGrow: 1, alignItems: 'flex-end', gap: '8px', justifyContent: 'flex-end' }}>
                    {/* <Button>Discard</Button> */}
                    <Button
                        onClick={() => setShowUserPermissionModal(false)}
                        className="bg-white text-red-600 hover:bg-red-100 shadow-none">Discard</Button>
                    <Button className="bg-[#5cc98d] hover:bg-[#48a071] text-white shadow-none">Save changes</Button>
                </div>

            </motion.div>
        </div>
    );
}