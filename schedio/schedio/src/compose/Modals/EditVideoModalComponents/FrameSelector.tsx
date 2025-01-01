// @ts-ignore
import { useModalStatesContext } from "@/layout.tsx";
// @ts-ignore
import { Button } from "@/components/ui/button.tsx";
// @ts-ignore
import { Skeleton } from "@/components/ui/skeleton.tsx";
// @ts-ignore
import { Slider } from "@/components/ui/slider.tsx";
// @ts-ignore
import Tooltip from '@mui/material/Tooltip';
// @ts-ignore
import React, { useEffect, use, useRef, useState } from "react";
// @ts-ignore
import { useEditVideoModalContext } from "./EditVideoModalContext.tsx";
// @ts-ignore
import { useToast } from "@/hooks/use-toast.tsx"

export const FrameSelector = () => {
    const { shortVideoForPostData, setShortVideoForPostData } = useModalStatesContext();
    const { setScreenPhase } = useEditVideoModalContext()
    const hasChanged = useRef(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [sliderValue, setSliderValue] = useState([0]); // ShadCN Slider uses an array
    const [videoDuration, setVideoDuration] = useState(0);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (shortVideoForPostData.thumbnail?.thumbnailIsFromVideo == true && shortVideoForPostData.thumbnail.tumbnailTimestamp) {
            setSliderValue([shortVideoForPostData.thumbnail.tumbnailTimestamp]);
            if (videoRef.current) {
                videoRef.current.currentTime = shortVideoForPostData.thumbnail.tumbnailTimestamp
            }
        }
    }, [shortVideoForPostData]);

    const handleSliderChange = (value: number[]) => {
        hasChanged.current = true;
        setSliderValue(value);
        console.log(value[0])
        if (videoRef.current) {
            videoRef.current.currentTime = value[0];
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setVideoDuration(videoRef.current.duration);
        }
    };

    const captureFrame = () => {
        if (!hasChanged.current) setScreenPhase(0)
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const naturalAspectRatio = video.videoWidth / video.videoHeight;
                const url = canvas.toDataURL("image/png"); // Capture the frame as a PNG
                setShortVideoForPostData((prev) => ({ ...prev, thumbnail: { url, naturalAspectRatio, fileType: 'image/png', thumbnailIsFromVideo: true, tumbnailTimestamp: Number(sliderValue[0].toFixed(2)) } }));
                setScreenPhase(0)
                toast({
                    description: "Thumbnail successfully updated ✅",
                    duration: 5000,
                    className: 'w-[340px]'
                });
            }
        }
    };

    return (
        <div>
            {/* Video Preview */}
            {shortVideoForPostData.defined ?
                <video
                    ref={videoRef}
                    src={shortVideoForPostData.url}
                    onLoadedMetadata={handleLoadedMetadata}
                    style={{ width: "100%", maxHeight: "400px" }}
                /> : <Skeleton style={{ width: '100%', height: '400px' }}></Skeleton>}

            {/* Slider for Frame Selection */}

            <Slider
                min={0}
                max={videoDuration}
                step={0.1}
                className={"w-full"}
                style={{ margin: '20px 0', cursor: 'pointer' }}
                value={sliderValue}
                onValueChange={handleSliderChange}
                onMouseEnter={() => setTooltipOpen(true)}
                onMouseLeave={() => setTooltipOpen(false)}
            >
            </Slider>
            {/* Hidden Canvas for Frame Capture */}
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <p>Timestamp: {`${sliderValue[0].toFixed(2)}s`}</p>
                <Button
                    onClick={() => captureFrame()}
                    className="p-5 bg-[#5cc98d] hover:bg-[#48a071] text-white shadow-none">
                    Select Frame</Button>
            </div>
        </div>
    );
};

export default FrameSelector;
