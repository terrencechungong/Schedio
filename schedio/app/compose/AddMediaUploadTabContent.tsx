import React from "react";
import styles from './uploadtabcontent.module.scss'
import { FcAddImage } from "react-icons/fc";
import { ImageUp, X } from "lucide-react";

interface AddMediaUploadTabContentInput {
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
}

export const AddMediaUploadTabContent: React.FC<AddMediaUploadTabContentInput> = ({ inputRef }) => {

    return (
        <div className={styles.container}>
            <div className={styles.uploadImageDiv}>
                <FcAddImage style={{ width: '105px', height: '105px' }} />
                <div style={{ textAlign: 'center' }}>
                    <p >Drag and drop your media, or click to upload files</p>
                    <i style={{ color: 'rgb(120, 120, 120)', fontSize: '14pxs' }}>image/jpeg, image/png, image/gif, video/mp4, video/quicktime</i>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '66%' }}>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgb(160, 160, 160)' }} />
                    <p style={{ paddingLeft: '30px', paddingRight: '30px' }}>or</p>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgb(160, 160, 160)' }} />
                </div>
                <div className={styles.uploadFromUrl}>
                    {/* MAKE ICONS SMALLER */}
                    <ImageUp />
                    <input placeholder="Upload from URL & press 'Enter'" className={styles.uploadUrlTextArea} />
                    <X />
                </div>
            </div>
            <div style={{paddingTop: '20px'}}>
                No Recently Used Images to show
            </div>
        </div>
    )
}