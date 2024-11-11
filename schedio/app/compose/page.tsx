"use client"
import styles from './compose.module.scss';
import { LegacyRef, RefObject, useContext, useEffect, useRef } from 'react';
import { MessageSquareMore } from 'lucide-react';
import { Camera } from 'lucide-react';
import { CreatePostHeader } from './CreatePostHeader';
import { ModalStatesContext, useModalStatesContext } from '../layout';
import { Backdrop } from '../Backdrop';


export default function ComposePage() {
  const divRef = useRef(null); // Reference to the div element
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const { showMediaModal, setShowMediaModal } = useModalStatesContext();

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
      {showMediaModal && <Backdrop children={(<p></p>)} handleClose={() => setShowMediaModal(false)} />}
      <div className={styles.composePostCenterDiv}>
        <div className={styles.createPostCard}>
          <CreatePostHeader divRef={divRef} />
          <TextAreaComponent textareaRef={textareaRef} handleInput={handleInput} setShow={setShowMediaModal} />
        </div>
      </div>

      <div className={styles.composePostSidePanel}>
        <p id="compyy"></p>
      </div>
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
        placeholder="Type here..."
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