import { useModalStatesContext } from '@/app/layout';
import { motion } from 'framer-motion';
import styles from '../ScssModules/editmediamodal.module.scss';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Crop } from 'lucide-react';
import { X } from 'lucide-react';
import adobeIcon from '../../assets/64px-Adobe_Express_logo_RGB_1024px.png';
import { useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import ImageCropper from './ImageCropper';

export const EditMediaModal = () => {
    const { setShowEditMediaModal, mediaBeingEditedUrl, setShowAdobeEditor, setPhotosInPost, photosInPost, mediaBeingEditedId, mediaIsGif } = useModalStatesContext();
    const [cropping, setCropping] = useState(false);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'row',
        overflowY: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20
    };

    const getCroppedPhotoBlob = async (canvas: HTMLCanvasElement, callback) => {
        if (!canvas) {
            console.error('Canvas element is required');
            return;
        }

        const fileType = await fetchFileType(mediaBeingEditedUrl);
        // Convert the canvas content to a Blob
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    console.error('Failed to create blob');
                    return false;
                }
                callback(blob)
            },
            'image/jpeg', // MIME type (adjust to 'image/png' or others if needed)
            0.9 // Quality (0 to 1) for JPEG and WebP
        );
    };

    const fetchFileType = async (url: string) => {
        try {
            const response = await fetch(url, { method: 'HEAD' }); // Use HEAD to get headers only
            const contentType = response.headers.get('Content-Type'); // e.g., 'image/jpeg'
            return contentType?.split('/')[1]; // Extract 'jpeg' or other type
        } catch (error) {
            console.error('Error fetching file type:', error);
            return null;
        }
    };


    const saveToCloudinary = async (blob) => {
        setPhotosInPost((prev) => prev.map((post, idx) => {
            if (post.id != mediaBeingEditedId.current) return post;
            return { ...post, beingEdited: true }
        }));
        setShowEditMediaModal(false);
        try {

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
            console.log(data)
            console.log('Uploaded image URL:', data.secure_url);
            setPhotosInPost((prev) => prev.map((post, idx) => {
                if (post.id != mediaBeingEditedId.current) return post;
                return { ...post, beingEdited: false, regUrl: data.secure_url, smallUrl: data.secure_url }
            }));
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            setPhotosInPost((prev) => prev.map((post, idx) => {
                if (post.id != mediaBeingEditedId.current) return post;
                return { ...post, beingEdited: false }
            }));
        }

    };


    return (
        <div
            style={containerStyle}
            onClick={() => setShowEditMediaModal(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div style={{ flexGrow: 1, fontWeight: '600', fontSize: '18px' }}>Edit Media</div>
                    <X size={30} className={styles.createPostIcon} onClick={() => setShowEditMediaModal(false)} />
                </div>
                <div style={{ width: '100%', height: 'auto', marginBottom: '10px' }}>
                    {!cropping && <img src={mediaBeingEditedUrl} style={{ width: '100%', height: '100%' }} />}
                    {cropping && (
                        <ImageCropper previewCanvasRef={previewCanvasRef} />
                    )}
                </div>
                {!mediaIsGif.current && <Input className='p-2 shadow-none' placeholder='Alt-text' />}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: mediaIsGif.current ? '0px' :'10px' }}>
                    <Button
                        onClick={() => {
                            setPhotosInPost((prev) => prev.filter((photo) => photo.id !== mediaBeingEditedId.current))
                            setShowEditMediaModal(false)
                        }}
                        className="p-5 bg-white hover:bg-red-100 text-red-700 shadow-none">
                        Remove
                    </Button>
                    {(!cropping && !mediaIsGif.current) && <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignSelf: 'flex-end' }}>
                        <Button
                            onClick={() => setShowAdobeEditor(true)}
                            className="p-5 bg-white text-black bg-gray-300 hover:bg-gray-400 shadow-none">Edit with <img src={adobeIcon.src} style={{ width: '20px', height: '20px' }} /></Button>
                        <Button
                            onClick={() => setCropping(true)}
                            className="p-5 bg-white hover:bg-blue-100 text-blue-700 shadow-none">
                            Crop <Crop /></Button>
                    </div>}
                    {(cropping && !mediaIsGif.current) && <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignSelf: 'flex-end' }}>
                        <Button
                            onClick={() => setCropping(false)}
                            className="p-5 bg-white text-black bg-gray-300 hover:bg-gray-400 shadow-none">Discard Crop</Button>
                        <Button
                            onClick={() => getCroppedPhotoBlob(previewCanvasRef.current, saveToCloudinary)}
                            className="p-5 bg-[#5cc98d] hover:bg-[#48a071] text-white shadow-none">
                            Save Crop <Crop /></Button>
                    </div>}
                </div>
            </motion.div>
        </div>

    )
}