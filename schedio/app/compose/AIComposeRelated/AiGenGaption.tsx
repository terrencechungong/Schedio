"use client"
import { useModalStatesContext } from '@/app/layout';
import { Loader2, X } from 'lucide-react';
import styles from '../ScssModules/aigencaption.module.scss'
import { motion } from "framer-motion";
import { SearchAudienceDropDown } from '../SimpleUIComponents/SearchAudienceDropDown';
import { SelectAiCaptionTone } from "./SelectAiCaptionTone";
import { Button } from "@/components/ui/button"
import ClipLoader from "react-spinners/ClipLoader";
import { useRef, useState } from 'react';

export const AiGenGaption: React.FC = () => {
    const { showMediaModal, setShowAiGenCaption } = useModalStatesContext();
    const [disabled, setDisabled] = useState(true);
    const [audienceValue, setAudienceValue] = useState("");
    const [aiCaptionValue, setAiCaptionValue] = useState("");
    const [captionGenerating, setCaptionGenerating] = useState(false);


    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20
    };
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleInput = (e: React.MouseEvent<HTMLDivElement>) => {
        if (textAreaRef.current) {
            console.log('value', textAreaRef.current.value)
            if (/^[\s]*$/.test(textAreaRef.current.value)) {
                setDisabled(true);
            } else {
                if ((/^[\s]*$/.test(aiCaptionValue)) || (/^[\s]*$/.test(audienceValue))) {
                    setDisabled(true);
                } else {
                    setDisabled(false);
                }
            }
        }
    }

    const handleSubmit = () => {
        if ((/^[\s]*$/.test(aiCaptionValue)) && (/^[\s]*$/.test(audienceValue))) return;
        setDisabled(true);
        setCaptionGenerating(true);

        setTimeout(() => {
            setCaptionGenerating(false);
            setDisabled(false);
        }, 1000);
    }

    return (
        <div
            style={containerStyle}
            onClick={() => setShowAiGenCaption(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div style={{ flexGrow: 1, fontWeight: '600', fontSize: '16px' }}>AI Generated Caption</div>
                    <X size={30} className={styles.createPostIcon} onClick={() => setShowAiGenCaption(false)} />
                </div>

                <div className={styles.selectAudienceAndTome}>
                    <SearchAudienceDropDown value={audienceValue} setValue={setAudienceValue} /><span style={{color:'red'}}>*</span>
                    <SelectAiCaptionTone value={aiCaptionValue} setValue={setAiCaptionValue} /><span style={{color:'red'}}>*</span>
                </div>

                <div className={styles.captionTextArea}>
                    <textarea
                        onInput={(e) => handleInput(e)}
                        ref={textAreaRef}
                        placeholder='Describe your topic (e.g., Tips for managing stress)'
                        className='bg-accent w-full h-full rounded-[4px] p-2 focus:outline-none focus:ring-1 focus:ring-primary' style={{ resize: 'none', fontSize: '14px' }} />
                </div>

                <div className={styles.genCaption}>
                    <Button color="primary"
                        className='rounded-[4px]'
                        disabled={disabled}
                        onClick={() => {
                            console.log("sdjskjd")
                            handleSubmit()
                        }}
                        style={{ alignSelf: 'flex-end', alignItems: 'center' }}>
                        {captionGenerating && <ClipLoader color='white' size={17} />}
                        Generate Caption</Button>
                </div>


            </motion.div>
        </div>
    )

}