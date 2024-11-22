"use client"
// subtract 10 min
import styles from './ScssModules/compose.module.scss';
import { LegacyRef, RefObject, useContext, useEffect, useRef, useState } from 'react';
import { Camera, Check, ChevronDown, ChevronLeft, ChevronRight, EllipsisVertical, Expand, Hash, MoveLeft, SmilePlus, WandSparkles, Wrench, X } from 'lucide-react';
import { CreatePostHeader } from './SimpleUIComponents/CreatePostHeader';
import { ModalStatesContext, useModalStatesContext } from '../layout';
import { ComposePoseSidePanel } from './ComposePostSidePanel';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import lightbulb from '@/app/assets/light-bulb-with-removebg-preview (2).png'
import { GetInspirationHeader, PostTemplatesHeader, UseHashtagsHeader, UseVariablesHeader, VariablesHeader } from './SimpleUIComponents/ToolCardHeader';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import templateIcon from '../assets/interface.png'
import hashtagIcon from '../assets/hashtag.png'
import notepad from '../assets/notepad.png';
import variableIcon from '../assets/independent-variable.png'
import browser from '../assets/browser.png';
import settings from '../assets/settings.png';
import settings1 from '../assets/settings (1).png';
import { AnimatePresence, motion } from 'framer-motion';
import variable from '../assets/variable2.png'

export default function ComposePage() {
  const divRef = useRef(null); // Reference to the div element
  const { showMediaModal, setShowMediaModal, textareaRef, setPostCaption } = useModalStatesContext();
  const cardRef = useRef<HTMLDivElement>(null);
  const [emojiPosition, setEmojiPosition] = useState<{ top: number; left: number } | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const moving = useRef<HTMLDivElement | null>(null);
  const toolRef = useRef<HTMLDivElement | null>(null)
  const [showAiGenTemplate, setShowAiGenTemplate] = useState(false);
  const [showPostInternalNotes, setShowPostInternalNotes] = useState(false);
  const hoverStates = { emojiHover: useState(false), cameraHover: useState(false), wandHover: useState(false), hashtagHover: useState(false) };
  const previousNote = useRef("");
  const notesInput = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [showHashtagGroupTool, setShowHashtagGroupTool] = useState(false);
  const [showUserTemplateTools, setShowUserTemplateTools] = useState(false);
  const [showVariables, setShowVariables] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (moving.current) {
        // Update the div's position directly in the DOM
        moving.current.style.top = `${event.clientY - 40}px`; // Offset to avoid overlapping the cursor
        moving.current.style.left = `${event.clientX - 309}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  const setCursorToEnd = (element) => {
    // Focus the contentEditable element
    element.focus();

    // Create a range
    const range = document.createRange();

    // Get the last child node
    const lastChild = element.lastChild;

    // Set the range to the end of the content
    if (lastChild) {
      range.setStart(lastChild, lastChild.textContent?.length || 0);
      range.setEnd(lastChild, lastChild.textContent?.length || 0);
    }

    // Get the selection object
    const selection = window.getSelection();
    if (selection) {
      // Remove all ranges and add the new range
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };


  const handleInput = (inputTextArea = null) => {
    const textarea = inputTextArea == null ? textareaRef : inputTextArea;
    console.log(textarea, inputTextArea)
    if (textarea.current) {
      console.log("sdhsdhs")
      if (inputTextArea == null) {
        setPostCaption(textarea.current.value)
      } else {
        // width
        console.log()
      }
      textarea.current.style.height = 'auto';
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
    if (cardRef.current && toolRef.current) {
      toolRef.current.style.maxWidth = cardRef.current.style.width
    }
  };

  const handleNotesInput = (e: React.MouseEvent<HTMLDivElement>) => {
    // MAKE IT UNDEETABLE
    if (!notesInput.current) return
    console.log("tjrerkejr", previousNote.current, notesInput.current.innerText)
    if (previousNote.current == '') {
      notesInput.current.innerHTML = `
          <div contenteditable="false" style="display:inline; font-weight: bold; color: white; background-color: blue; padding:3px; border-radius:5px; margin-right:2px">
            Terrence:
          </div>
          ${notesInput.current.innerText}
        `;
      previousNote.current = "more"
    }
    setCursorToEnd(notesInput.current);
  }

  useEffect(() => {
    const div = divRef.current;
    if (textareaRef.current && toolRef.current) {
      toolRef.current.style.maxWidth = String(Number(textareaRef.current.style.width) / 4);
      console.log("ioerieorioeir", String(Number(textareaRef.current.style.width) / 4))
    }
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        handleInput(null);
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
        <div className={`rounded-lg ${styles.createPostCard}`} ref={cardRef}>
          <CreatePostHeader divRef={divRef} />
          <TextAreaComponent handleInput={handleInput} onSmileClick={onSmileClick} hoverStates={hoverStates} />
        </div>


        <div className={styles.toolsSection}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center', marginBottom: '5px' }}>
            <h4 style={{ padding: '0px 0px 12.5px', fontWeight: '500', margin: 0, color: '#303030', fontSize: '20px' }}>TOOLS</h4>
            <div className='bg-transparent' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '21px', minHeight: '21px', paddingBottom: '12.5px' }}>
              <img src={settings1.src} width={"20px"} height={"20px"} />
            </div>
          </div>


          <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div className={`${'rounded-lg'} shadow-md`} style={{ width: '100%', display: 'flex', flexDirection: 'column', }}>
              <div className={`${showAiGenTemplate ? 'rounded-b-none rounded-t-lg' : 'rounded-lg'}`} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: '8px 8px 8px 10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '13px', flexShrink: 1, alignItems: 'center' }}>
                  <div className='bg-[#E7F8E9] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src={templateIcon.src} width={"27px"} height={"27px"} />
                  </div>
                  <h4 style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>AI Generated Templates</h4>
                </div>


                {showAiGenTemplate &&

                  <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                    <ChevronDown color='black' onClick={() => setShowAiGenTemplate(false)} />
                  </div>


                }
                {!showAiGenTemplate && (
                  <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                    <ChevronLeft color='black' onClick={() => setShowAiGenTemplate(true)} />
                  </div>)}
              </div>

              {/* Categories Section */}
              <div className='rounded-b-lg' style={{ backgroundColor: 'white' }}>
                <AnimatePresence>
                  {showAiGenTemplate && <motion.div
                    key="content"
                    initial={{ height: '0px', opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: '0px', opacity: 0 }}
                    transition={{
                      duration: 0.3, // Adjust the duration as needed
                      ease: 'easeInOut',
                    }}

                    className='rounded-t-none rounded-b-lg' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignSelf: 'center', backgroundColor: 'white', padding: '0px 10px 10px', overflow: 'hidden' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignSelf: 'center', gap: '5px', justifyContent: 'center', marginBottom: '14px' }}>
                      <p style={{ color: 'black' }}>Category</p>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          overflowX: 'scroll',
                          padding: '4px',
                          maxWidth: '50%',
                          margin: 0,
                          // boxSizing: 'border-box', // Ensures padding is included in the width calculation
                        }}
                      >
                        {Array.from({ length: 9 }).map((_, idx) => (
                          <div
                            onClick={() => setSelectedIndex(idx)}
                            key={idx}
                            className={`px-1 ${selectedIndex === idx ? 'bg-primary text-white' : 'bg-accent text-gray'} transition-transform duration-200 transform hover:scale-110`}
                            style={{
                              borderRadius: '6px',
                              fontSize: '11px',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap', // Prevent text overflow
                              // flexShrink: 0, // Prevent child from shrinking or stretching
                              margin: '0 5px', // Add margin instead of gap
                            }}
                          >
                            Item {idx + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      style={{
                        width: '89%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        alignSelf: 'center',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <div className='rounded-md p-1 bg-white flex items-center justify-center hover:brightness-90 cursor-pointer transition duration-200'>
                        <MoveLeft size={24} />
                      </div>
                      <div
                        style={{
                          overflowWrap: 'break-word',
                          fontSize: '14px',
                          wordWrap: 'break-word',
                          maxWidth: '82%',
                          whiteSpace: 'normal', // Ensures wrapping of long text
                          flexGrow: 1,
                        }}
                      >
                        Preparing for a job interview? Don't forget to do your research! Learn about the company's mission, values, and culture.

                        This helps you understand if the company is the right fit for you and shows that you're genuinely interested in the position. Good luck!
                      </div>
                      <div className='rounded-md p-1 bg-white flex items-center justify-center hover:brightness-90 cursor-pointer transition duration-200'>
                        <MoveRight size={24} />
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        gap: '10px',
                        marginTop: '13px',
                      }}
                    >
                      <Button className="text-black bg-accent shadow-none hover:bg-gray-200">
                        Expand
                      </Button>
                      <Button className="text-primary hover:bg-[#d9c6ed] shadow-none bg-[#E9D5FF]">
                        Use Inspiration
                      </Button>
                    </div>

                  </motion.div>}
                </AnimatePresence>
              </div>
            </div>

            <div className='rounded-lg shadow-md' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className={`${showHashtagGroupTool ? 'rounded-b-none rounded-t-lg' : 'rounded-lg'}`} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: '8px 8px 8px 10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '13px', flexShrink: 1, alignItems: 'center' }}>
                  <div className='bg-[#ffeeb6] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src={hashtagIcon.src} width={"27px"} height={"27px"} />
                  </div>
                  <h4 style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>Saved Hashtag Groups</h4>
                </div>


                {showHashtagGroupTool &&

                  <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                    <ChevronDown color='black' onClick={() => setShowHashtagGroupTool(false)} />
                  </div>


                }
                {!showHashtagGroupTool && (
                  <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                    <ChevronLeft color='black' onClick={() => setShowHashtagGroupTool(true)} />
                  </div>)}
              </div>

              <div className='rounded-b-lg' style={{ backgroundColor: 'white' }}>
                <AnimatePresence>

                  {showHashtagGroupTool && <motion.div
                    key="content2"
                    initial={{ height: '0px', opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: '0px', opacity: 0 }}
                    transition={{
                      duration: 0.3, // Adjust the duration as needed
                      ease: 'easeInOut',
                    }}

                    className='rounded-t-none rounded-b-lg' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignSelf: 'center', backgroundColor: 'white', padding: '0px 10px 10px', overflow: 'hidden' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignSelf: 'center', gap: '5px', justifyContent: 'center', marginBottom: '14px' }}>
                      <p style={{ color: 'black' }}>Group name</p>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          overflowX: 'scroll',
                          padding: '4px',
                          maxWidth: '50%',
                          margin: 0,
                          // boxSizing: 'border-box', // Ensures padding is included in the width calculation
                        }}
                      >
                        {Array.from({ length: 9 }).map((_, idx) => (
                          <div
                            onClick={() => setSelectedIndex(idx)}
                            key={idx}
                            className={`px-1 ${selectedIndex === idx ? 'bg-primary text-white' : 'bg-accent text-gray'} transition-transform duration-200 transform hover:scale-110`}
                            style={{
                              borderRadius: '6px',
                              fontSize: '11px',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap', // Prevent text overflow
                              // flexShrink: 0, // Prevent child from shrinking or stretching
                              margin: '0 5px', // Add margin instead of gap
                            }}
                          >
                            Item {idx + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      style={{
                        width: '89%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        alignSelf: 'center',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <div className='rounded-md p-1 bg-white flex items-center justify-center hover:brightness-90 cursor-pointer transition duration-200'>
                        <MoveLeft size={24} />
                      </div>
                      <div
                        style={{
                          overflowWrap: 'break-word',
                          fontSize: '14px',
                          wordWrap: 'break-word',
                          maxWidth: '80%',
                          whiteSpace: 'normal', // Ensures wrapping of long text
                          flexGrow: 1,
                        }}
                      >
                        #SocialMedia #MarketingTips #DigitalMarketing #ContentCreation
                        #SocialMediaStrategy #BrandGrowth #OnlineMarketing #SocialMediaManager #MarketingGoals

                      </div>
                      <div className='rounded-md p-1 bg-white flex items-center justify-center hover:brightness-90 cursor-pointer transition duration-200'>
                        <MoveRight size={24} />
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        gap: '10px',
                        marginTop: '13px',
                      }}
                    >
                      <Button className="text-black bg-accent shadow-none hover:bg-gray-200">
                        Expand
                      </Button>
                      <Button className="text-primary hover:bg-[#d9c6ed] shadow-none bg-[#E9D5FF]">
                        Use Hashtags
                      </Button>
                    </div>

                  </motion.div>}
                </AnimatePresence>
              </div>
            </div>


            <div className={`${'rounded-lg'} shadow-md`} style={{ width: '100%', display: 'flex', flexDirection: 'column', }}>
              <div className={`${showPostInternalNotes ? 'rounded-b-none rounded-t-lg' : 'rounded-lg'}`} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: '8px 8px 8px 10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '13px', flexShrink: 1, alignItems: 'center' }}>
                  <div className='bg-red-100 rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src={notepad.src} width={"27px"} height={"27px"} />
                  </div>
                  <h4 style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>Post Notes</h4>
                </div>

                {showPostInternalNotes &&
                  <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                    <ChevronDown color='black' onClick={() => {
                      console.log("dsjadskjds")
                      setShowPostInternalNotes(false)
                    }
                    } />
                  </div>
                }
                {!showPostInternalNotes &&
                  <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                    <ChevronLeft color='black' onClick={() => setShowPostInternalNotes(true)} /></div>}
              </div>
              < div className='rounded-b-lg' style={{ backgroundColor: 'white' }}>
                <AnimatePresence>
                  {showPostInternalNotes && <motion.div
                    key="content"
                    initial={{ height: '0px', opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: '0px', opacity: 0 }}
                    transition={{
                      duration: 0.3, // Adjust the duration as needed
                      ease: 'easeInOut',
                    }}
                    className='rounded-t-none rounded-b-lg' style={{ maxWidth: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignSelf: 'center', backgroundColor: 'white', padding: '0px 10px 10px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '7px', alignItems: 'center' }}>
                      <div style={{ height: '19px', width: '19px', borderRadius: '26px', backgroundColor: '#13b27a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check color='white' size={16} strokeWidth={3} />
                      </div>
                      <p style={{ fontSize: '15px', paddingTop: '1px', color: 'black' }} className="m-0">Saved</p>
                    </div>

                    <div className={styles.textAreaWrapper}>
                      <div
                        contentEditable={true}
                        ref={notesInput}
                        className={`${styles.editableDiv} ${styles.textarea}`}
                        onInput={(e) => {
                          handleInput(notesInput)
                          handleNotesInput(e)
                        }}
                      >
                      </div>
                    </div>
                  </motion.div>}
                </AnimatePresence>
              </div>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

              <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div className='rounded-lg shadow-md' style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: '8px 8px 8px 10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexShrink: 1, alignItems: 'center' }}>
                    <div className='bg-purple-100 rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                      <img src={variable.src} width={"27px"} height={"27px"} />
                    </div>
                    <h4 style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>Variables</h4>
                  </div>
                  {showVariables &&
                    <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                      <ChevronDown color='black' onClick={() => setShowVariables(false)} /></div>}
                  {!showVariables &&
                    <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                      <ChevronLeft color='black' onClick={() => setShowVariables(true)} /></div>}
                </div>
              </div>
            </div>

            <div className='rounded-lg shadow-md' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className={`${showUserTemplateTools ? 'rounded-b-none rounded-t-lg' : 'rounded-lg'}`} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: '8px 8px 8px 10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '13px', flexShrink: 1, alignItems: 'center' }}>
                  <div className='bg-[#F9E7FF] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src={browser.src} width={"27px"} height={"27px"} />
                  </div>
                  <h4 style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>Saved Templates</h4>
                </div>


                {showUserTemplateTools &&

                  <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                    <ChevronDown color='black' onClick={() => setShowUserTemplateTools(false)} />
                  </div>


                }
                {!showUserTemplateTools && (
                  <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                    <ChevronLeft color='black' onClick={() => setShowUserTemplateTools(true)} />
                  </div>)}
              </div>

              {<div className='rounded-b-lg' style={{ backgroundColor: 'white' }}>
                <AnimatePresence>

                  {showUserTemplateTools && <motion.div
                    key="content2"
                    initial={{ height: '0px', opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: '0px', opacity: 0 }}
                    transition={{
                      duration: 0.3, // Adjust the duration as needed
                      ease: 'easeInOut',
                    }}

                    className='rounded-t-none rounded-b-lg' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignSelf: 'center', backgroundColor: 'white', padding: '0px 10px 10px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '100%', height: '140px', gap: '13px' }}>
                      <div className={`${styles.toolBoxDashDiv} =rounded-md bg-blue-100`} style={{ width: '140px', border: '3px dashed navy', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
                        {/* Truncate function */}
                        <p>Added * 10/12/120</p>
                        <p>{`{{ name }}`}</p>
                        <p> eefefeffe erfefe ...</p>
                      </div>

                      <div className={`${styles.toolBoxDashDiv} =rounded-md bg-blue-100`} style={{ width: '140px', border: '3px dashed navy', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
                        <p>Added * 10/12/120</p>
                        <p>{`{{ name }}`}</p>
                        <p> eefefeffe erfefe ...</p>
                      </div>

                      <div className={`${styles.toolBoxDashDiv} =rounded-md bg-blue-100`} style={{ width: '140px', border: '3px dashed navy', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
                        <p>Added * 10/12/120</p>
                        <p>{`{{ name }}`}</p>
                        <p> eefefeffe erfefe ...</p>
                      </div>

                      <div className={`${styles.toolBoxDashDiv} =rounded-md bg-blue-100`} style={{ width: '140px', border: '3px dashed navy', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
                        <p>Added * 10/12/120</p>
                        <p>{`{{ name }}`}</p>
                        <p> eefefeffe erfefe ...</p>
                      </div>

                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        gap: '10px',
                        marginTop: '13px',
                      }}
                    >
                      <Button className="text-black bg-accent shadow-none hover:bg-gray-200">
                        Expand
                      </Button>
                      <Button className="text-primary hover:bg-[#d9c6ed] shadow-none bg-[#E9D5FF]">
                        Use Template
                      </Button>
                    </div>

                  </motion.div>}
                </AnimatePresence>
              </div>}

            </div>

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
  handleInput: (inputTextArea: any) => void;
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
        onInput={() => handleInput(null)}
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
