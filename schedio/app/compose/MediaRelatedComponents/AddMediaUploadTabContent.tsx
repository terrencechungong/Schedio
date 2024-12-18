import React, { useRef, useState } from "react";
import styles from '../ScssModules/uploadtabcontent.module.scss'
import { FcAddImage } from "react-icons/fc";
import { ImageUp, X } from "lucide-react";
import { useModalStatesContext } from "@/app/layout";
import { generateRandom4Digit } from "@/app/utilFunctions";


export const AddMediaUploadTabContent: React.FC = () => {
    const fileInputRef = useRef(null);
    const inputRef = useRef(null);
    const { setShowMediaModal, setPhotosInPost, addOrUpdatePhotoInPost } = useModalStatesContext();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          // Enter key was pressed
          handleImageUrl()
          // Perform your desired action here
        }
      };

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const url = URL.createObjectURL(file);
            const img = new Image();
            // use cloudinary
            img.onload = async () => {
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                const naturalAspectRatio = width / height;
                const fileType = file.type;
                const id = `${url}-${generateRandom4Digit()}`;

                const photoObj = {
                    naturalAspectRatio,
                    smallUrl: url,
                    regUrl: url,
                    fileType,
                    id,
                    isGif: false,
                };

                addOrUpdatePhotoInPost({ ...photoObj, beingEdited: true });
                // setPhotosInPost((prev) => [...prev, { ...photoObj, beingEdited: true }]);

                setShowMediaModal(false);
                URL.revokeObjectURL(url);
                const blob = new Blob([file], { type: file.type });

                const formData = new FormData();
                formData.append('file', blob);
                formData.append('upload_preset', 'unsigned_preset'); // Replace with your unsigned preset name
                formData.append('folder', 'schedio'); // Optional: specify folder
                formData.append('api_key', 'hxLvIJhrYmQ2Q_GHJTueLwyIAIA'); // Optional: specify folder

                const uploadResponse = await fetch(
                    'https://api.cloudinary.com/v1_1/dtwy7cntj/image/upload',
                    { method: 'POST', body: formData }
                );

                const data = await uploadResponse.json();
                // setPhotosInPost((prev) => prev.map((post, idx) => {
                //     if (post.id != id) return post;
                //     return { ...post, beingEdited: false, regUrl: data.secure_url, smallUrl: data.secure_url }
                // }));
                addOrUpdatePhotoInPost({ ...photoObj, beingEdited: false, regUrl: data.secure_url, smallUrl: data.secure_url });

            };

            img.onerror = () => {
                URL.revokeObjectURL(url);
            };

            img.src = url; // Start loading the image
        } else {
            console.error('No file selected');
        }
    };


    // MUST CONFIRM THE FILE TYPR AND USE TOAST
    async function handleImageUrl() {
        if (!inputRef.current) return;
        const url = inputRef.current.value;
        try {
            // Create a new Image object
            const img = new Image();

            // Set crossOrigin to 'anonymous' to attempt CORS-enabled image loading
            img.crossOrigin = 'anonymous';

            // Create a promise that resolves when the image loads or rejects if there's an error
            const imgLoadPromise = new Promise((resolve, reject) => {
                img.onload = () => {
                    // Check if image dimensions are accessible
                    if (img.naturalWidth && img.naturalHeight) {
                        resolve();
                    } else {
                        reject(new Error('Unable to access image dimensions.'));
                    }
                };

                img.onerror = () => {
                    reject(new Error('Error loading image.'));
                };
            });

            // Start loading the image
            img.src = url;

            // Wait for the image to load
            await imgLoadPromise;

            // Get image dimensions
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            const naturalAspectRatio = width / height;

            // Determine file type based on MIME type or file extension
            let fileType = '';
            if (img.currentSrc) {
                // Attempt to fetch the MIME type using a HEAD request
                const response = await fetch(img.currentSrc, { method: 'HEAD' });
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.startsWith('image/')) {
                    fileType = contentType;
                } else {
                    // Fallback to file extension
                    fileType = `image/${img.currentSrc.split('.').pop().toLowerCase()}`;
                }
            } else {
                // Fallback to file extension
                fileType = `image/${url.split('.').pop().toLowerCase()}`;
            }

            const id = `${url}-${generateRandom4Digit()}`;

            const photoObj = {
                naturalAspectRatio,
                smallUrl: url,
                regUrl: url,
                fileType,
                id,
                isGif: fileType.toLowerCase().includes('gif'),
            };
            // Proceed with your function
            // setPhotosInPost((prev) => [...prev, { ...photoObj, beingEdited: false }]);
            addOrUpdatePhotoInPost({ ...photoObj, beingEdited: false })
            setShowMediaModal(false);
        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error(error);
        }
    }



    return (
        <div className={styles.container}>
            <div
                onClick={() => { if (fileInputRef.current) fileInputRef.current.click() }}
                className={`${styles.uploadImageDiv} bg-accent`}>
                <FcAddImage style={{ width: '105px', height: '105px' }} />
                <div style={{ textAlign: 'center' }}>
                    <p >Drag and drop your media, or click to upload files</p>
                    <i style={{ color: 'rgb(120, 120, 120)', fontSize: '14px' }}>image/jpeg, image/png, image/gif, video/mp4, video/quicktime</i>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '66%' }}>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgb(160, 160, 160)' }} />
                    <p style={{ paddingLeft: '30px', paddingRight: '30px' }}>or</p>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgb(160, 160, 160)' }} />
                </div>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={styles.uploadFromUrl}>
                    {/* MAKE ICONS SMALLER */}
                    <ImageUp size={18} />
                    <input ref={inputRef} placeholder="Enter a valid URL & press 'Enter'" className={styles.uploadUrlTextArea} onKeyDown={handleKeyDown}  />
                    <X size={17} style={{ cursor: 'pointer' }} />
                </div>
            </div>
            <div style={{ paddingTop: '20px' }}>
                No Recently Used Images to show
            </div>
            <input style={{ display: 'none' }} ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
        </div>
    )
}