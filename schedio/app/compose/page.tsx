"use client"
// subtract 10 min
import styles from './compose.module.scss';
import { LegacyRef, RefObject, useContext, useEffect, useRef, useState } from 'react';
import { Camera, EllipsisVertical, Hash, SmilePlus, WandSparkles } from 'lucide-react';
import { CreatePostHeader } from './CreatePostHeader';
import { ModalStatesContext, useModalStatesContext } from '../layout';
import { ComposePoseSidePanel } from './ComposePostSidePanel';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';


export default function ComposePage() {
  const divRef = useRef(null); // Reference to the div element
  const { showMediaModal, setShowMediaModal, textareaRef, setPostCaption } = useModalStatesContext();
  const cardRef = useRef<HTMLDivElement>(null);
  const [emojiPosition, setEmojiPosition] = useState<{ top: number; left: number } | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const moving = useRef<HTMLDivElement | null>(null);
  const hoverStates = { emojiHover: useState(false), cameraHover: useState(false), wandHover: useState(false), hashtagHover: useState(false) };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (moving.current) {
        // Update the div's position directly in the DOM
        moving.current.style.top = `${event.clientY -40}px`; // Offset to avoid overlapping the cursor
        moving.current.style.left = `${event.clientX - 309}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);



  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      setPostCaption(textareaRef.current.value)
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const div = divRef.current;
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        handleInput();
      }
    });

    if (div) {
      resizeObserver.observe(div);
    }

    return () => {
      if (div) {
        resizeObserver.unobserve(div);
      }
    };
  }, []);


  const onSmileClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (showEmoji) {
      setShowEmoji(false)
      return
    }
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // since the left of the card will change with size ill change this too
    setEmojiPosition({
      top: rect.bottom - 18,
      left: 40,
    });
    setShowEmoji(true)
  };

  const addEmoji = (emoji: EmojiClickData) => {
    if (textareaRef.current) {
      textareaRef.current.value += emoji.emoji;
      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.composePostCenterDiv}>
        {hoverStates.emojiHover[0] && (
          <div
          ref={moving}

            style={{
              position: 'absolute',
              pointerEvents: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
            }}
          >
            Add emojis
          </div>
        )}
        {hoverStates.cameraHover[0] && (
          <div
          ref={moving}

            style={{
              position: 'absolute',
              pointerEvents: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
            }}
          >
            Add media
          </div>
        )}
        {hoverStates.wandHover[0] && (
          <div
          ref={moving}

            style={{
              position: 'absolute',
              pointerEvents: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
            }}
          >
            Generate caption
          </div>
        )}
        {hoverStates.hashtagHover[0] && (
          <div
          ref={moving}

            style={{
              position: 'absolute',
              pointerEvents: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
            }}
          >
            Hashtag is hovered over!
          </div>
        )}
        <div className={styles.createPostCard} ref={cardRef}>
          <CreatePostHeader divRef={divRef} />
          <TextAreaComponent handleInput={handleInput} onSmileClick={onSmileClick} hoverStates={hoverStates} />
        </div>
        {/* single column until 1690
        then  2 columns */}

        <div className={styles.composeToolsDiv}>
          <div className={styles.toolsCard}>

          </div>
          <div className={styles.toolsCard}>

          </div>
          <div className={styles.toolsCard}>

          </div>
          <div className={styles.toolsCard}>

          </div>
          <div className={styles.toolsCard}>

          </div>

        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            display: showEmoji ? 'block' : 'none',
            top: emojiPosition?.top,
            left: emojiPosition?.left,
            paddingBottom: '10px',
          }}
        >
          <EmojiPicker
            height={375}
            previewConfig={{ showPreview: false }}
            onEmojiClick={(e) => addEmoji(e)}
          />
        </div>
      </div>
      <ComposePoseSidePanel />
    </div>
  );
}

interface HoverStates {
  emojiHover: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  cameraHover: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  wandHover: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  hashtagHover: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}


interface TextAreaComponentInterface {
  handleInput: (event: React.FormEvent<HTMLTextAreaElement>) => void;
  onSmileClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  hoverStates: HoverStates;
}

const TextAreaComponent: React.FC<TextAreaComponentInterface> = ({ handleInput, onSmileClick, hoverStates }) => {
  const { setShowMediaModal, textareaRef, setShowAiGenCaption } = useModalStatesContext();


  return (
    <div className={styles.textAreaWrapper}>
      <textarea
        className={styles.textarea}
        placeholder="What would you like to share?"
        onInput={handleInput}
        ref={textareaRef}
      ></textarea>
      <div className={styles.iconRowInCreatePost}>
        <div
          className={styles.createPostIcon}>
          <EllipsisVertical size={20} strokeWidth={1.5} />
        </div>
        <div
          onMouseEnter={() => hoverStates.emojiHover[1](true)}
          onMouseLeave={() => hoverStates.emojiHover[1](false)}
          className={styles.createPostIcon} onClick={(e) => onSmileClick(e)}>
          <SmilePlus size={20} strokeWidth={1.5} />
        </div>
        <div
          onMouseEnter={() => hoverStates.cameraHover[1](true)}
          onMouseLeave={() => hoverStates.cameraHover[1](false)}
          onClick={() => setShowMediaModal(true)}
          className={styles.createPostIcon} >
          <Camera size={20} strokeWidth={1.5} />
        </div>
        <div
          onMouseEnter={() => hoverStates.wandHover[1](true)}
          onMouseLeave={() => hoverStates.wandHover[1](false)}
          className={styles.createPostIcon} onClick={() => setShowAiGenCaption(true)}>
          <WandSparkles size={20} strokeWidth={1.5} />
        </div>
        <div
          onMouseEnter={() => hoverStates.hashtagHover[1](true)}
          onMouseLeave={() => hoverStates.hashtagHover[1](false)}
          className={styles.createPostIcon}>
          <Hash size={20} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}
