import { motion } from "framer-motion";
// @ts-ignore
import styles from '../ScssModules/addiconfromschedulepost.module.scss'
// @ts-ignore
import { useModalStatesContext } from "@/layout";
// @ts-ignore
import { PencilLine, PlusIcon, X } from "lucide-react";
// @ts-ignore
import { Button } from "@/components/ui/button";
// @ts-ignore
import { useRef, useState } from "react";
// @ts-ignore
import { Input } from "@/components/ui/input";




export const AddIconFromSchedulePostModal: React.FC = () => {
    const { setShowAddLabelFromSchedulePost } = useModalStatesContext();
    const [selectedLabel, setSelectedLabel] = useState("");
    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20
    }
    const labels: any[] = [" Test"];
    const [screenStage, setScreenStage] = useState(0);
    const [labelBgColor, setLabelBgColor] = useState('#FF91B3');
    // 0 for list of labels, 1 for add label, 2 for edit label
    const colorsRowOne = [
        "#FF6B6B", "#FF91B3", "#D881F1", "#C68BFF", "#C68BFF", "#A1C2FF", "#70C9FF",
        "#4ED1E0", "#39D4AC",
        // Second row (approximate)
    ];
    const colorsRowTwo = ["#35D6C1", "#1BC7B7", "#2ED674", "#A3E737", "#FFE13D", "#FFAA45",
        "#FF7D5D", "#A3A3A3"]

    return (
        <div
            style={containerStyle}
            onClick={() => setShowAddLabelFromSchedulePost(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <p style={{ fontSize: '24px', fontWeight: 600 }}>Add label</p>
                    <X onClick={() => setShowAddLabelFromSchedulePost(false)} size={30} className={styles.closeButton} />
                </div>



                {/* MIDDLE SECTION */}
                {screenStage == 0 && <div className={styles.labelColumns}>
                    {labels.map((label, index) => (
                        <div key={index} className={styles.labelRow}>

                            <div className={`${styles.label} hover:brightness-110 transition duration-200`} style={{ cursor: 'pointer', color: 'white', backgroundColor: '#FF91B3' }}>
                                {label}
                            </div>

                            <div className={`bg-accent border-[0px] hover:brightness-90 transition duration-200 ${styles.editLabel}`}
                                onClick={() => {
                                    setSelectedLabel(label.trim())
                                    setScreenStage(2)
                                }}>
                                <PencilLine size={14} />
                            </div>
                        </div>
                    ))}
                    <div className={`bg-accent border-[0px] hover:brightness-90 transition duration-200 ${styles.plusIconAddLabel}`}
                    onClick={() => setScreenStage(1)}>
                        <PlusIcon size={14} />
                    </div>
                </div>}
                {screenStage != 0 &&
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '19px', padding: '20px 0 22px' }}>

                        <Input className={`shadow-none focus:border-primary border-[0.5px] w-full bg-white ${styles.labelInput}`} placeholder="Title" value={screenStage == 2 ? selectedLabel : ''} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignSelf: 'center', alignItems: 'center' }}>

                            <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                                {colorsRowOne.map((value, index) => (
                                    <div
                                        key={index}
                                        style={{ backgroundColor: value, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        className="h-8 w-8 rounded-full transition-transform duration-200 transform hover:scale-110"
                                    >
                                        {labelBgColor == value && <div
                                            key={index}
                                            style={{ backgroundColor: 'white' }}
                                            className="h-6 w-6 rounded-full"
                                        >
                                        </div>}
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                                {colorsRowTwo.map((value, index) => (
                                    <div
                                        key={index}
                                        style={{ backgroundColor: value, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        className="h-8 w-8 rounded-full transition-transform duration-200 transform hover:scale-110"
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>

                }


                {/* FOOTER BUTTONS */}
                {screenStage == 0 && <Button className="bg-[#5cc98d] hover:bg-[#48a071] p-5" style={{ alignSelf: 'flex-end', }}>
                    Update
                </Button>}
                {
                    screenStage == 1 && (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Button
                                onClick={() => setScreenStage(0)}
                                className="bg-accent hover:bg-gray-200 text-black p-5">
                                Go back
                            </Button>

                            <Button
                                onClick={() => setScreenStage(0)}
                                className="bg-[#5cc98d] hover:bg-[#48a071] text-white p-5">
                                Create
                            </Button>
                        </div>
                    )
                }
                {/* This doesnt have any transitions */}
                {
                    screenStage == 2 && (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Button
                                onClick={() => setScreenStage(0)}
                                className="bg-accent hover:bg-gray-200 text-black p-5 shadow-none">
                                Go back
                            </Button>

                            <div style={{ display: 'flex', flexDirection: 'row', gap: '7px' }}>
                                <Button className="bg-white hover:bg-red-100 text-red-700 p-5 shadow-none">
                                    Delete
                                </Button>
                                <Button
                                    onClick={() => setScreenStage(0)}
                                    className="bg-[#5cc98d] hover:bg-[#48a071] text-white p-5 shadow-none">
                                    Save
                                </Button>
                            </div>
                        </div>
                    )
                }
            </motion.div>
        </div>

    )
}