"use client"
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
  const [showEmoji, setShowEmoji] = useState(false)

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

  useEffect(() => {
    handleInput();
  }, []);

  const onSmileClick = () => {
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
        <div className={styles.createPostCard} ref={cardRef}>
          <CreatePostHeader divRef={divRef} />
          <TextAreaComponent handleInput={handleInput} onSmileClick={onSmileClick} />
        </div>
        {showEmoji && (
          <div
            style={{
              position: 'absolute',
              top: emojiPosition?.top,
              left: emojiPosition?.left,
              paddingBottom: '10px'
            }}
          >
            <EmojiPicker height={375} previewConfig={{showPreview: false}}
              onEmojiClick={(e) => addEmoji(e)}
            />
          </div>
        )}
      </div>
      <ComposePoseSidePanel />
    </div>
  );
}



interface TextAreaComponentInterface {
  handleInput: (event: React.FormEvent<HTMLTextAreaElement>) => void;
  onSmileClick: () => void;
}

const TextAreaComponent: React.FC<TextAreaComponentInterface> = ({ handleInput, onSmileClick }) => {
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
        <div className={styles.createPostIcon}>
          <EllipsisVertical size={20} strokeWidth={1.5} />
        </div>
        <div className={styles.createPostIcon} onClick={() => onSmileClick()}>
          <SmilePlus size={20} strokeWidth={1.5} />
        </div>
        <div
          onClick={() => setShowMediaModal(true)}
          className={styles.createPostIcon} >
          <Camera size={20} strokeWidth={1.5} />
        </div>
        <div className={styles.createPostIcon} onClick={() => setShowAiGenCaption(true)}>
          <WandSparkles size={20} strokeWidth={1.5} />
        </div>
        <div className={styles.createPostIcon}>
          <Hash size={20} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}
