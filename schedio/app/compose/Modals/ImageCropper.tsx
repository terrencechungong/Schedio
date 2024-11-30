// components/ImageCropper.js

import { useModalStatesContext } from '@/app/layout';
import React, { useState, useRef, useEffect, useContext, MutableRefObject } from 'react';
import ReactCrop, { Crop, PixelCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { DropdownMenuDemo } from '../SimpleUIComponents/SelectAspectRatio';

interface ImageCropperInput {
    previewCanvasRef: MutableRefObject<HTMLCanvasElement>
}

const ImageCropper: React.FC<ImageCropperInput> = ({ previewCanvasRef }) => {
    const { mediaBeingEditedUrl } = useModalStatesContext();
    const [dimensions, setDimensions] = useState(16 / 9);
    const original = useRef<number | null>(null);
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        x: 25,
        y: 25,
        width: 50,
        height: 50,
    });
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

    const imageRef = useRef<HTMLImageElement | null>(null);

    const onCropComplete = (crop: PixelCrop) => {
        setCompletedCrop(crop);
    };

    const onCropChange = (newCrop: Crop) => {
        setCrop(newCrop);
    };

    // Generate the cropped image preview
    useEffect(() => {
        if (
            !completedCrop ||
            !previewCanvasRef.current ||
            !imageRef.current ||
            !completedCrop.width ||
            !completedCrop.height
        ) {
            return;
        }

        const image = imageRef.current;
        if (!original.current) {
            original.current = image.width / image.height;
        }
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        // Set canvas dimensions to match the cropped area
        canvas.width = crop.width * scaleX;
        canvas.height = crop.height * scaleY;

        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the cropped image onto the canvas
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
        );
    }, [completedCrop]);

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <div style={{ position: 'absolute', top: '2px', left: '2px', zIndex: 30 }}>
                <DropdownMenuDemo setDimensions={setDimensions} original={original.current} />
            </div>
            <ReactCrop
                style={{ width: '100%' }}
                crop={crop}
                onChange={onCropChange}
                onComplete={onCropComplete}
                aspect={dimensions} // Enforce the aspect ratio here
                keepSelection={true} // Optional: Keep the crop area visible after interaction
            >
                <img
                style={{ width: '100%' }}
                    crossOrigin="anonymous"
                    src={mediaBeingEditedUrl}
                    ref={imageRef}
                    alt="Crop me"
                />
            </ReactCrop>
            <div style={{ display: 'none' }}>
                <canvas
                    ref={previewCanvasRef}
                    style={{
                        width: completedCrop?.width ?? 0,
                        height: completedCrop?.height ?? 0,
                    }}
                />
            </div>
        </div>
    );
};

export default ImageCropper;
