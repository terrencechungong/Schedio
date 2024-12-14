import styles from '../ScssModules/shortdevicepreview.module.scss'
import { useModalStatesContext } from '@/app/layout';
import { Skeleton } from '@/components/ui/skeleton';
import iphoneFrame from '../../assets/iphoneframe2.png'
import signalStrength from '../../assets/signal.png'
import battery from '../../assets/image (4).png'
import wifi from '../../assets/image (5).png'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiSolidCommentDetail } from "react-icons/bi";
import { Plus } from 'lucide-react';
import { GoHeartFill } from "react-icons/go";
import { FaCommentDots } from "react-icons/fa6";
import { RiShareForwardFill } from "react-icons/ri";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';


// NEED TO IMPLEMENT RESIZING
interface PreviewForShortsInput {
  platform: string;
}

export const PreviewForShorts: React.FC<PreviewForShortsInput> = ({ platform, showPlatform }) => {
  const { shortVideoForPostData, postVariations, postVariationKey } = useModalStatesContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state
  const [controlShowing, setControlShowing] = useState(true); // Track control visibility
  const [mouseOver, setMouseOver] = useState(false); // Track mouse hover state

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Mouse enter event to track hover state
  const handleMouseEnter = () => {
    setMouseOver(true);
  };

  // Mouse leave event to stop tracking hover state
  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  // Sync control visibility with video and mouse states
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setControlShowing(mouseOver); // Show controls only if the mouse is over
    };

    const handlePause = () => {
      setIsPlaying(false);
      setControlShowing(true); // Always show controls when paused
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [mouseOver]);

  // Update control visibility when hover state changes
  useEffect(() => {
    if (isPlaying && mouseOver) {
      setControlShowing(true);
    } else if (isPlaying && !mouseOver) {
      setControlShowing(false);
    }
  }, [isPlaying, mouseOver]);

  return (
    <motion.div
      initial={{ height: '0px' }}
      animate={{ height: '670px' }}
      exit={{ height: '0px' }}
      transition={{ duration: 0.2 }}
      className={styles.container}
      style={{
        width: "100%",
        position: "relative",
        alignSelf: 'center',
        height: '670px',
        overflow: 'hidden',
        // backgroundColor: "#1b1b19",
      }}
      onClick={() => handlePlayPause()}
    >
      {/* VIDEO */}
      <div
        style={{
          position: "absolute",
          backgroundColor: "#1b1b199c",
          top: "17px",
          left: "24px",
          width: "322px",
          height: "597px",
          zIndex: 1,
          borderRadius: "20px",
        }}
      >
        <video
          ref={videoRef}
          src={shortVideoForPostData.url}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "40px",
            objectFit: "cover", // Ensures the video fills the box
            display: shortVideoForPostData.defined ? 'block' : 'none'
          }}
          controls
          loop
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
        />
        {!shortVideoForPostData.defined && <Skeleton className='w-full h-full duration-900 !bg-primary/20'></Skeleton>}
      </div>

      {/* SCREEN OVERLAY */}
      <div
        className={`${controlShowing ? "h-[520px]" : "h-[568px]"} transition-all duration-200`}
        style={{
          position: "absolute",
          padding: "5px 12px 5px",
          top: "21px",
          left: "25px",
          width: "327px",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // backgroundColor:'yellow'
        }}
      >
        {/* Top bar with time and icons */}
        <div
          style={{
            width: "100%",
            height: "15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "5px",
          }}
        >
          <div style={{ width: "37%", textAlign: "center" }}>
            <p style={{ color: "white", margin: 0, padding: 0, lineHeight: "15px" }}>
              8:19
            </p>
          </div>
          <div
            style={{
              width: "37%",
              height: "15px",
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={signalStrength.src} style={{ width: "auto", height: "100%" }} />
            <img src={wifi.src} style={{ width: "auto", height: "105%" }} />
            <img src={battery.src} style={{ width: "auto", height: "103%" }} />
          </div>
        </div>

        {/* YOUTUBE OVERLAY */}
        {platform == 'TikTok' && <TikTokOverlay />}
        {platform == 'Youtube' && <YouTubeOverLay />}
      </div>

      {/* FRAME */}
      <div
        style={{
          position: "absolute",
          top: 0,
          zIndex: 1, width: "367px", height: "630px"
        }}
      >
        <img src={iphoneFrame.src} style={{ width: "100%", height: "100%" }} />
      </div>
    </motion.div>
  )
}



const YouTubeOverLay = () => {
  const { shortVideoForPostData, postVariations, postVariationKey } = useModalStatesContext();

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        color: "white",
      }}
    >
      {/* Post caption and reaction buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "auto",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            alignSelf: "flex-end",
            width: "90%",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          dangerouslySetInnerHTML={{
            __html: postVariations[postVariationKey].postCaption,
          }}
        ></div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            color: "white",
            marginBottom: "14px",
            width: "13%",
          }}
        >
          <div
            style={{
              width: "auto",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              alignItems: "center",
            }}
          >
            <RiThumbUpFill color="white" size={30} />
            <p style={{ fontSize: "12px" }}>230</p>
          </div>
          <div
            style={{
              width: "auto",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              alignItems: "center",
            }}
          >
            <RiThumbDownFill color="white" size={30} />
            <p style={{ fontSize: "12px" }}>Dislike</p>
          </div>
          <div
            style={{
              width: "auto",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              alignItems: "center",
            }}
          >
            <BiSolidCommentDetail
              color="white"
              size={30}
              style={{ transform: "scaleX(-1)" }}
            />
            <p style={{ fontSize: "12px" }}>32</p>
          </div>
        </div>
      </div>

      {/* Channel name and subscribe button */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <Avatar>
            <AvatarImage
              width={20}
              height={20}
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p
            style={{
              color: "white",
              fontWeight: "bold",
              letterSpacing: "0.5px",
            }}
          >
            Terrence C...
          </p>
        </div>
        <Button
          className="bg-[#FF0000] hover:bg-[#FF0000] !px-9 !py-6 rounded-none text-white"
          style={{ fontWeight: "bold" }}
        >
          SUBSCRIBE
        </Button>
      </div>
    </div>
  )
}

const TikTokOverlay = () => {
  const { shortVideoForPostData, postVariations, postVariationKey } = useModalStatesContext();

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        color: "white",
      }}
    >
      {/* Post caption and reaction buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "auto",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignSelf: "flex-end", width: "87%", }}>
          <p style={{ fontWeight: 'bold' }}>@terrencechungong</p>
          <div
            style={{
              flexGrow: 1,
              alignSelf: "flex-end",
              width: "100%",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            dangerouslySetInnerHTML={{
              __html: postVariations[postVariationKey].postCaption,
            }}
          ></div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            color: "white",
            marginBottom: "14px",
            width: "13%",
          }}
        >
          <div
            style={{
              width: "auto",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              alignItems: "center",
              position: 'relative'
            }}
          >
            <Avatar className='shadow-lg' style={{ marginBottom: '6px' }}>
              <AvatarImage
                width={20}
                height={20}
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="rounded-full bg-[#ed5a6d] h-5 w-5"
              style={{
                fontSize: "12px", position: 'absolute', bottom: '-6px',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}><Plus strokeWidth={2} size={15} /></div>
          </div>
          <div
            style={{
              width: "auto",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              alignItems: "center",
              opacity: 0.85
            }}
          >
            <GoHeartFill color="white" style={{}} size={35} />
            <p style={{ fontSize: "12px" }}>1.3K</p>
          </div>
          <div
            style={{
              width: "auto",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              alignItems: "center",
              opacity: 0.85
            }}
          >
            <FaCommentDots color="white" size={30} />
            <p style={{ fontSize: "12px" }}>608</p>
          </div>
          <div
            style={{
              width: "auto",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: 0.85
            }}
          >
            <RiShareForwardFill
              color="white"
              size={34}
            />
            <p style={{ fontSize: "12px" }}>32</p>
          </div>
          <div>
            <Avatar>
              <AvatarImage
                width={15}
                height={15}
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  )
}