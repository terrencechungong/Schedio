"use client"
import styles from './compose.module.scss';
import { useEffect, useRef, useState } from 'react';
// app/schedule/page.tsx
import { MessageSquareMore } from 'lucide-react';
import { Camera } from 'lucide-react';
import Editor from '@draft-js-plugins/editor';
import { EditorState } from 'draft-js';

export default function ComposePage() {
  const divRef = useRef(null);
  const [content, setContent] = useState("Type here...");

  const handleInput = (e) => {
    setContent(e.target.innerText); // Update state with div content
  };

  const adjustHeight = () => {
    if (divRef.current) {
      divRef.current.style.height = "auto"; // Reset height to auto
      divRef.current.style.height = `${divRef.current.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editorStyle = {
    flexGrow: 1,
    width: '100%',
    maxWidth: '100%',
    // minHeight: '100px',
    padding: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  };


  <div
    ref={divRef}
    contentEditable
    suppressContentEditableWarning={true}
    onInput={handleInput}
    style={{
      // minHeight: '50px',
      flexGrow: 1,
      // padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      overflow: 'hidden', // Hide overflow while resizing
      whiteSpace: 'pre-wrap',
      overflowWrap: 'break-word',
      // width: '100%', // Full width or set as needed
    }}
  >
    {content}
  </div>

  return (
    <div style={{ height: '100vh', backgroundColor: '#F5F5F5', display: 'flex', flexDirection: 'row', width: '100%', overflowX: 'hidden' }}>
      <div className={styles.composePostCenterDiv}>
        <div className={styles.createPostCard}>

          <div style={{ display: 'flex', flexDirection: 'row', height: '50px', gap: '10px', alignItems: 'center' }}>
            <div style={{ width: '45px', height: '45px', backgroundColor: '#BFDBFE', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}>
              <MessageSquareMore color='#1D4ED8' size='26px' />
            </div>
            <div>
              <h6 style={{ padding: 0, margin: 0 }}>Create a post</h6>
              <p style={{ fontSize: '13px', color: '' }}>Create a high-impact post to share your message</p>
            </div>
          </div>

          <div style={{ width: '100%', maxWidth: '100%', flexGrow: 1, border: '1px solid #e0e0e0', borderRadius: '5px', backgroundColor: '#efeded', display: 'flex', flexDirection: 'column' }}>
            <div className={styles.outerContainer}>
              <div className={styles.innerContainer}>
                <textarea className={styles.textarea} placeholder="Type here..."></textarea>
              </div>
            </div>




            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '13px', width: '100%', backgroundColor: 'white', height: '40px', alignSelf: 'flex-end', borderRadius: '0 0 5px 5px' }}>
              <div className={styles.createPostIcon} style={{ padding: '6px' }}><Camera /></div>

            </div>
          </div>
        </div>
      </div>

      <div className={styles.composePostSidePanel}>

        <p id="compyy"></p>

      </div>
    </div>
  );
}
