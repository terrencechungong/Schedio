"use client"
import styles from './compose.module.scss';
import { LegacyRef, RefObject, useContext, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';
import { CreatePostHeader } from './CreatePostHeader';
import { ModalStatesContext, useModalStatesContext } from '../layout';
import { ComposePoseSidePanel } from './ComposePostSidePanel';


export default function ComposePage() {
  const divRef = useRef(null); // Reference to the div element
  const { showMediaModal, setShowMediaModal, textareaRef, setPostCaption } = useModalStatesContext();

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

  return (
    <div className={styles.container}>
      <div className={styles.composePostCenterDiv}>
        <div className={styles.createPostCard}>
          <CreatePostHeader divRef={divRef} />
          <TextAreaComponent textareaRef={textareaRef} handleInput={handleInput} setShow={setShowMediaModal} />
        </div>
      </div>
      <ComposePoseSidePanel />
    </div>
  );
}



interface TextAreaComponentInterface {
  textareaRef: LegacyRef<HTMLTextAreaElement>;
  handleInput: (event: React.FormEvent<HTMLTextAreaElement>) => void;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const TextAreaComponent: React.FC<TextAreaComponentInterface> = ({ textareaRef, handleInput, setShow }) => {

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
          onClick={() => {
            setShow(true)
          }}
          className={styles.createPostIcon} >
          <Camera />
        </div>
      </div>
    </div>
  )
}
