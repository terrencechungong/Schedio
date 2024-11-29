// components/ImageCropper.js

import { useModalStatesContext } from '@/app/layout';
import React, { useState, useRef, useEffect, useContext, MutableRefObject } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperInput {
    previewCanvasRef: MutableRefObject<HTMLCanvasElement>
} 

const ImageCropper: React.FC<ImageCropperInput> = ({ previewCanvasRef }) => {
  const { mediaBeingEditedUrl } = useModalStatesContext();
  const [crop, setCrop] = useState<Crop>({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    aspect: 16 / 9,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

  const imageRef = useRef<HTMLImageElement | null>(null);

  const onImageLoaded = (img: HTMLImageElement) => {
    imageRef.current = img;
  };

  const onCropComplete = (crop: PixelCrop) => {
    setCompletedCrop(crop);
  };

  const onCropChange = (crop: Crop) => {
    setCrop(crop);
  };

  // Generate the cropped image preview
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imageRef.current) {
      return;
    }

    const image = imageRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set canvas dimensions to match the cropped area
    canvas.width = crop.width;
    canvas.height = crop.height;

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
    <div>
      <ReactCrop
        crop={crop}
        onChange={onCropChange}
        onComplete={onCropComplete}
        aspect={crop.aspect}
      >
        <img crossOrigin="anonymous" src={mediaBeingEditedUrl} ref={imageRef} alt="Crop me" />
      </ReactCrop>
      <div style={{display:'none'}}>
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
