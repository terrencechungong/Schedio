"use client"
// subtract 10 min
import styles from './ScssModules/compose.module.scss';
import { LegacyRef, RefObject, useContext, useEffect, useRef, useState } from 'react';
import { AlignLeft, BadgeInfo, Camera, Check, ChevronDown, ChevronLeft, ChevronRight, EllipsisVertical, Expand, Hash, Info, Instagram, MoveLeft, Plus, SmilePlus, Video, WandSparkles, Wrench, X } from 'lucide-react';
import { CreatePostHeader } from './SimpleUIComponents/CreatePostHeader';
import { ModalStatesContext, useModalStatesContext } from '../layout';
import { ComposePoseSidePanel } from './ComposePostSidePanel';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Button } from '@/components/ui/button';
import Tooltip from '@mui/material/Tooltip';
import templateIcon from '../assets/interface.png'
import hashtagIcon from '../assets/hashchc.png'
import notepad from '../assets/check-list.png';
import browser from '../assets/savedtemps.png';
import { AnimatePresence, motion } from 'framer-motion';
import variable from '../assets/algorithm.png'
import { FaCircleCheck } from "react-icons/fa6";
import ClipLoader from "react-spinners/ClipLoader";
import { FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

export default function ComposePage() {
  const divRef = useRef(null); // Reference to the div element
  const { textareaRef, setPostCaption, imgContainer, photosInPost, mediaBeingEditedId, setMediaBeingEditedUrl, setShowEditMediaModal, mediaIsGif,
    checkedProfile, setCheckedProfile, setPostVariationKey, postVariationKey, setPostVariations, postVariations, setShowDeletionConfirmationModal, shortVideoForPostData,
    postTypeIsShort, setShowEditVideoModal
  } = useModalStatesContext();
  const cardRef = useRef<HTMLDivElement>(null);
  const [emojiPosition, setEmojiPosition] = useState<{ top: number; left: number } | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const moving = useRef<HTMLDivElement | null>(null);
  const toolRef = useRef<HTMLDivElement | null>(null)
  const [showAiGenTemplate, setShowAiGenTemplate] = useState(false);
  const [showPostInternalNotes, setShowPostInternalNotes] = useState(false);
  const previousNote = useRef("");
  const notesInput = useRef(null);
  const [selectedTemplateIdxForGroup, setSelectedTemplateIdxForGroup] = useState(0);
  const [showHashtagGroupTool, setShowHashtagGroupTool] = useState(false);
  const [showUserTemplateTools, setShowUserTemplateTools] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState(-1);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [selectedAudeince, setSelectedAudience] = useState(0);
  const [selectedHashtagGroup, setSelectedHashtagGroup] = useState(-1);
  const [postNotesSaving, setPostNotesSaving] = useState(false);
  const [postNotes, setPostNotes] = useState("");
  const typingTimerRef = useRef(null);
  const [showPlus, setShowPlus] = useState(false);
  const [isPopoverHidden, setIsPopoverHidden] = useState(false);
  const [deleteVersionPopoverHidden, setDeleteVersionPopoverHidden] = useState(true);
  const [showGenericTemplate, setShowGenericTemplate] = useState(false);
  const [showYoutubeTitlePrompt, setShowYoutubeTitlePrompt] = useState(postTypeIsShort &&
    (
      (postVariationKey == 'GenericTemplate' && checkedProfile.some(profile => profile.platform == 'Youtube' && !profile.unique && profile.active)) ||
      postVariationKey.split('-')[0] === 'Youtube'
    ));
  const [youtubeTitleIsEmpty, setYoutubeTitleIsEmpty] = useState(true);

  useEffect(() => {
    setShowYoutubeTitlePrompt(postTypeIsShort &&
      (
        (postVariationKey == 'GenericTemplate' && checkedProfile.some(profile => profile.platform == 'Youtube' && !profile.unique && profile.active)) ||
        postVariationKey.split('-')[0] === 'Youtube'
      ))
  }, [checkedProfile, postVariationKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeTitleIsEmpty(e.target.value.trim() === "");
  };

  const mockData = [
    {
      name: "Task_Manager",
      description: "A tool to efficiently manage and organize tasks.",
      addedDate: "11/25/2024",
    },
    {
      name: "Fitness_Tracker",
      description: "An app to track your workouts, diet, and progress.",
      addedDate: "11/20/2024",
    },
    {
      name: "Recipe_Finder",
      description: "Search for recipes based on available ingredients.",
      addedDate: "11/15/2024",
    },
    {
      name: "Expense_Tracker",
      description: "Keep track of daily expenses and monthly budgets.",
      addedDate: "11/10/2024",
    },
    {
      name: "Weather_App",
      description: "Get real-time weather updates and forecasts.",
      addedDate: "11/05/2024",
    },
    {
      name: "Language_Learning",
      description: "Learn a new language with interactive lessons.",
      addedDate: "11/01/2024",
    },
    {
      name: "Project_Planner",
      description: "Plan and monitor progress for team projects.",
      addedDate: "10/28/2024",
    },
    {
      name: "Habit_Tracker",
      description: "Build and maintain positive habits daily.",
      addedDate: "10/25/2024",
    },
    {
      name: "Meditation_App",
      description: "Guided meditations and mindfulness exercises.",
      addedDate: "10/20/2024",
    },
    {
      name: "Shopping_List",
      description: "Organize and manage your shopping needs.",
      addedDate: "10/15/2024",
    }
  ];
  const socialMediaTemplates = [
    {
      name: "Job Interview Tips",
      template: "Preparing for a job interview? Don't forget to do your research! Learn about the company's mission, values, and culture. This helps you understand if the company is the right fit for you and shows that you're genuinely interested in the position. Good luck!"
    },
    {
      name: "Motivational Monday",
      template: "Happy Monday! Remember, every new week brings new opportunities. Set your goals, stay positive, and make it happen. You've got this!"
    },
    {
      name: "Self-Care Reminder",
      template: "Feeling overwhelmed? Take a moment for yourself. Breathe, relax, and remember to prioritize your mental health. You can't pour from an empty cup!"
    },
    {
      name: "Fitness Inspiration",
      template: "No matter how slow you go, you're still lapping everyone on the couch. Stay consistent, stay motivated, and keep moving forward!"
    },
    {
      name: "Customer Appreciation",
      template: "Shoutout to our amazing customers! Your support means the world to us. We're here to serve you, and we love seeing your feedback. Thank you!"
    },
    {
      name: "Productivity Hack",
      template: "Feeling stuck? Try the Pomodoro Technique! Work for 25 minutes, then take a 5-minute break. It’s a great way to stay focused and boost productivity."
    },
    {
      name: "Throwback Thursday",
      template: "Throwing it back to [Insert Event]! What a great time reminiscing about how far we've come. Share your favorite throwback moments in the comments!"
    },
    {
      name: "Event Announcement",
      template: "Exciting news! We're hosting [Event Name] on [Date]. Mark your calendars and join us for a day full of fun, networking, and learning. See you there!"
    },
    {
      name: "Inspirational Quote",
      template: "\"Success is not final, failure is not fatal: It is the courage to continue that counts.\" - Winston Churchill. Keep pushing forward!"
    },
    {
      name: "Fun Fact Friday",
      template: "Did you know? The longest recorded flight of a chicken is 13 seconds. Sometimes, it's the little things that surprise us!"
    }
  ];
  const hashtagGroups = [
    {
      name: "Marketing Insights",
      hashtags: [
        "#MarketingInsights",
        "#AudienceEngagement",
        "#MarketResearch",
        "#CustomerInsights",
        "#TailoredStrategy",
        "#MarketingStrategy",
        "#CustomerFeedback",
        "#MarketAnalysis"
      ]
    },
    {
      name: "Startup Success",
      hashtags: [
        "#Startup",
        "#EntrepreneurLife",
        "#BusinessGrowth",
        "#LeanStartup",
        "#StartupTips",
        "#Innovation",
        "#StartupJourney",
        "#Bootstrapping"
      ]
    },
    {
      name: "Fitness Motivation",
      hashtags: [
        "#FitnessMotivation",
        "#HealthyLifestyle",
        "#WorkoutGoals",
        "#FitnessJourney",
        "#StayActive",
        "#FitnessTips",
        "#Wellness",
        "#StrengthTraining"
      ]
    },
    {
      name: "Travel Adventures",
      hashtags: [
        "#TravelAdventures",
        "#Wanderlust",
        "#TravelTips",
        "#ExploreTheWorld",
        "#TravelGoals",
        "#AdventureAwaits",
        "#DiscoverMore",
        "#TravelCommunity"
      ]
    },
    {
      name: "Tech Innovations",
      hashtags: [
        "#TechInnovations",
        "#FutureOfTech",
        "#AI",
        "#MachineLearning",
        "#TechTrends",
        "#DigitalTransformation",
        "#ProgrammingLife",
        "#CodeNewbie"
      ]
    },
    {
      name: "Mental Health Awareness",
      hashtags: [
        "#MentalHealth",
        "#SelfCare",
        "#Mindfulness",
        "#EndTheStigma",
        "#ItsOkayToNotBeOkay",
        "#MentalHealthMatters",
        "#Healing",
        "#PositiveVibes"
      ]
    },
    {
      name: "Foodie Heaven",
      hashtags: [
        "#Foodie",
        "#DeliciousEats",
        "#Cooking",
        "#FoodPhotography",
        "#HomeChef",
        "#FoodLover",
        "#Yummy",
        "#TastyTreats"
      ]
    },
    {
      name: "Education & Learning",
      hashtags: [
        "#Education",
        "#Learning",
        "#Knowledge",
        "#StudyTips",
        "#OnlineLearning",
        "#LifelongLearning",
        "#EdTech",
        "#StudentLife"
      ]
    }
  ];
  const templateGroups = [
    {
      audience: "Job Seekers",
      templates: [
        "Preparing for a job interview? Don't forget to research the company's mission, values, and culture. This helps you understand if the company is the right fit and shows your genuine interest. Tailor your questions and responses to align with their goals. Good luck!",
        "Looking to land your dream job? Start by crafting a standout resume. Highlight your achievements with quantifiable results, use action verbs, and tailor your resume to match the job description. A well-structured resume grabs attention!",
        "Networking 101: Reach out to connections on LinkedIn and attend industry events. A simple introduction like, 'Hi, I admire your work in [specific field]. I'd love to connect and learn more about your expertise,' can open doors you never imagined."
      ]
    },
    {
      audience: "Entrepreneurs",
      templates: [
        "Starting a business is no small feat. Begin by identifying a clear problem you want to solve. Validate your idea by speaking with potential customers. Remember, feedback is gold—iterate until your solution truly meets their needs.",
        "Every entrepreneur needs a killer pitch. Use this formula: Start with the problem, introduce your solution, explain why it’s unique, and end with a clear call to action. Keep it concise and practice until it’s second nature.",
        "Thinking of bootstrapping your business? Focus on revenue-generating activities first. Build a lean product, test it with real users, and reinvest profits into growth. Efficiency and focus are your best allies."
      ]
    },
    {
      audience: "Fitness Enthusiasts",
      templates: [
        "Struggling to stay consistent? Try scheduling your workouts like appointments. Consistency is key to building momentum. Remember, even a 30-minute session makes a difference—just show up!",
        "Your body is your temple—fuel it with care. Focus on whole, unprocessed foods, and aim for a balanced mix of proteins, carbs, and healthy fats. Meal prepping can save time and ensure you stay on track with your goals.",
        "Overcoming plateaus: If your progress has stalled, switch things up! Try new exercises, increase weights, or adjust your rep ranges. Shocking your muscles keeps them growing and keeps you motivated."
      ]
    },
    {
      audience: "Parents",
      templates: [
        "Parenting can be a juggling act! Create a shared family calendar to keep track of school events, extracurriculars, and family time. This simple tool can make life much easier for everyone.",
        "Self-care for parents: You can't pour from an empty cup. Take 15 minutes a day for yourself, whether it’s a quick walk, meditation, or reading your favorite book. A little 'me time' goes a long way!",
        "Fun family activity idea: Host a DIY craft night! Gather supplies, pick a simple project, and let everyone’s creativity shine. It’s a great way to bond and create lasting memories."
      ]
    },
    {
      audience: "Small Business Owners",
      templates: [
        "Marketing on a budget? Use free tools like Canva for graphics, Mailchimp for newsletters, and Buffer for social media scheduling. Small steps can make a big impact when done consistently.",
        "Customer retention matters! Send personalized thank-you emails, offer loyalty discounts, or host a customer appreciation day. Happy customers often become your biggest advocates.",
        "Thinking of expanding your business? Start by evaluating your current processes. Automating repetitive tasks with software can free up time and resources to focus on growth opportunities."
      ]
    },
    {
      audience: "College Students",
      templates: [
        "Finals coming up? Plan your study schedule early. Break topics into manageable chunks, use the Pomodoro technique for focus, and don’t forget to take breaks. A little planning goes a long way.",
        "Budgeting in college: Track your expenses using apps like Mint or YNAB. Set limits on discretionary spending and always look for student discounts to save money.",
        "Struggling with procrastination? Start by setting small, achievable goals. Completing even one task gives you momentum to tackle the next. Progress, not perfection!"
      ]
    },
    {
      audience: "Travel Enthusiasts",
      templates: [
        "Planning your next adventure? Create a detailed itinerary with must-see attractions, local restaurants, and transportation options. Having a plan saves time and reduces stress when you arrive.",
        "Travel hack: Save money by booking flights on weekdays and using tools like Google Flights to track price trends. Always check alternative airports for cheaper fares!",
        "Packing tip: Roll your clothes to save space, pack a portable charger, and always keep important documents in your carry-on. Being prepared makes every trip smoother."
      ]
    },
    {
      audience: "Tech Enthusiasts",
      templates: [
        "Stay ahead in tech by dedicating time each week to learn a new tool or programming language. Platforms like Coursera, Udemy, and freeCodeCamp are excellent resources for upskilling.",
        "Cybersecurity tip: Use two-factor authentication (2FA) for all your accounts and avoid reusing passwords. Protecting your data is easier than recovering from a breach!",
        "Building your first app? Focus on functionality first, then refine the UI/UX. Launching early and gathering user feedback will help you build something people truly want."
      ]
    },
    {
      audience: "Mental Health Advocates",
      templates: [
        "It’s okay to ask for help. If you’re feeling overwhelmed, consider talking to a friend, family member, or a professional counselor. You're not alone.",
        "Mindfulness tip: Spend 5 minutes a day practicing deep breathing. Focus on your breath and let go of any tension. This simple practice can help reduce stress and improve your mood.",
        "Dealing with anxiety? Create a 'safe space' in your home where you can relax and reset. Add calming elements like soft lighting, soothing music, or a favorite book."
      ]
    },
    {
      audience: "Marketers",
      templates: [
        "Struggling with content ideas? Look at trending topics in your industry and create posts that provide unique insights or solutions. Tools like BuzzSumo and Google Trends can help.",
        "Engagement tip: Ask your audience questions! Polls, quizzes, and interactive posts not only drive engagement but also give you valuable insights into your customers’ preferences.",
        "Never underestimate the power of storytelling. Share your brand’s journey, struggles, and triumphs. Authenticity resonates with audiences and builds trust."
      ]
    }
  ];

  useEffect(() => {
    const handleScreenClick = () => {
      setDeleteVersionPopoverHidden(true);
    };

    // Add event listener on mount
    document.addEventListener("click", handleScreenClick);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("click", handleScreenClick);
    };
  }, []);

  useEffect(() => {
    if (!showPostInternalNotes) return;
    if (notesInput.current) {
      notesInput.current.innerHTML = postNotes;
    }
  }, [showPostInternalNotes]);

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



  const applyHashtagGroup = () => {
    if (textareaRef.current) {
      if (selectedHashtagGroup == -1) return;
      // include unique only
      textareaRef.current.innerText += ` ${hashtagGroups[selectedHashtagGroup].hashtags.join(" ")}`;
      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  }

  const addHashtag = (hashtag: string) => {
    if (textareaRef.current) {
      // include unique only
      textareaRef.current.innerText += ` ${hashtag}`
      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  }

  const addVariableToCaption = () => {
    if (textareaRef.current) {
      if (selectedVariable == -1) return;
      const varName = mockData[selectedVariable].name;
      textareaRef.current.innerText += ` {{ ${varName} }} `;
      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  }

  const addTemplateToCaption = (usingAi = false) => {
    if (textareaRef.current) {
      const temp = usingAi ? templateGroups[selectedAudeince].templates[selectedTemplateIdxForGroup] : socialMediaTemplates[selectedTemplate].template;
      textareaRef.current.innerText = temp;
      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  }



  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (cardRef.current) {
        cardRef.current.style.height = 'auto'; // Ensure auto-height works
      }
    });

    if (imgContainer.current) {
      observer.observe(imgContainer.current);
    }

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  const setCursorToEnd = (element) => {
    // Focus the contentEditable element
    element.focus();

    // Create a range
    const range = document.createRange();

    // Check if the element has any child nodes
    if (element.childNodes.length > 0) {
      // Get the last child node
      let lastChild = element.lastChild;

      // If the last child is a text node, set the range at its end
      if (lastChild.nodeType === Node.TEXT_NODE) {
        range.setStart(lastChild, lastChild.textContent?.length || 0);
        range.setEnd(lastChild, lastChild.textContent?.length || 0);
      } else {
        // If the last child is not a text node (e.g., <br>), set the range at the end of the element
        range.setStartAfter(lastChild);
        range.setEndAfter(lastChild);
      }
    } else {
      // If there are no child nodes, create an empty text node to set the cursor
      const textNode = document.createTextNode('');
      element.appendChild(textNode);
      range.setStart(textNode, 0);
      range.setEnd(textNode, 0);
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
    if (textarea.current) {
      if (inputTextArea == null) {
        const text = textarea.current.innerText;
        // add link previews
        const highlightedText = text.replace(/(^|\s)#(\w+)\b/g, '$1<span style="color: #3b82f6;">#$2</span>');
        const urlRegex = /(^|\s)((https?:\/\/|www\.)?[A-Za-z0-9-]{1,63}(?<!-)\.[A-Za-z]{2,6}(\/[^\s]*)?)/gi;
        const lastHightlited = highlightedText.replace(urlRegex, '$1<span style="color: #3b82f6;">$2</span>')
        textarea.current.innerHTML = lastHightlited;
        setPostCaption(lastHightlited);
        // Move the cursor to the end after setting innerHTML
        if (text != '') {
          setCursorToEnd(textarea.current);
        }
      } else {
        // width
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
    if (previousNote.current == '') {
      notesInput.current.innerHTML = `
          <div contenteditable="false" style="display:inline; font-weight: bold; color: white; background-color: blue; padding:3px; border-radius:5px; margin-right:2px">
            Terrence:
          </div>
          ${notesInput.current.innerText}
        `;
      previousNote.current = "more"
      setCursorToEnd(notesInput.current);
    }

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    // Set a new typing timeout
    typingTimerRef.current = setTimeout(() => {
      setPostNotesSaving(true); // Show saving status

      // Simulate a save operation with a timeout
      setTimeout(() => {
        setPostNotesSaving(false); // Hide saving status
        // You can add your actual saving logic here
      }, 2000); // Simulated save duration (e.g., API call duration)
    }, 2000);

  };

  useEffect(() => {
    const unique = checkedProfile.reduce((acc, profile) => {
      return profile.unique && profile.active ? acc + 1 : acc;
    }, 0);
    const active = checkedProfile.reduce((acc, profile) => {
      return profile.active ? acc + 1 : acc;
    }, 0);
    setShowPlus(active > 1 && (active - unique > 1));
    setShowGenericTemplate(active > 1);
    // IF YOU CANT SHOW GENERIC SWITCH TO GENERIC (NO) AND HIDE THE OTHER PLATFORMS
  }, [checkedProfile]);

  useEffect(() => {
    const div = divRef.current;
    if (textareaRef.current && toolRef.current) {
      toolRef.current.style.maxWidth = String(Number(textareaRef.current.style.width) / 4);
      // console.log("ioerieorioeir", String(Number(textareaRef.current.style.width) / 4))
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
      textareaRef.current.innerText += emoji.emoji;
      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  }


  const platformIcons = {
    'LinkedIn': <FaLinkedin color='#0a66c2' size={17} />,
    'Youtube': <FaYoutube color='#FF0000' size={17} />,
    'Facebook': <FaFacebook color='#0866ff' size={17} />,
    'Instagram': <Instagram color='#833ab4' size={17} />,
    'Threads': <SiThreads color='#89CFF0' size={17} />,
    'TikTok': <FaTiktok color='#000000' size={17} />,
  };

  return (
    <div className={styles.container}>
      <div className={styles.composePostCenterDiv}>
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {showGenericTemplate &&
              <div className='text-gray-600' style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px 10px 7px', cursor: 'pointer', fontSize: '12px',
                borderBottom: postVariationKey == "GenericTemplate" ? '1px solid hsl(262.1, 83.3%, 57.8%)' : '1px solid whitesmoke'
              }}
                onClick={() => {
                  if (textareaRef.current) textareaRef.current.innerHTML = postVariations["GenericTemplate"].postCaption
                  setPostVariationKey("GenericTemplate")
                }}
              >
                Generic Template
              </div>
            }
            {showGenericTemplate && checkedProfile
              .filter((profile, index) => profile.unique && profile.active)
              .map((profile) => {
                const key = `${profile.platform}-${profile.name}-${profile.id}`;

                return (

                  <Popover>
                    <PopoverTrigger asChild >
                      <div
                        onClick={(e) => {

                          if (postVariationKey == key) {
                            e.nativeEvent.stopImmediatePropagation()
                            e.stopPropagation()
                            console.log("CLICKKKD")
                            setDeleteVersionPopoverHidden(false)
                          } else {
                            if (textareaRef.current) textareaRef.current.innerHTML = postVariations[key].postCaption
                            setPostVariationKey(key)
                            setDeleteVersionPopoverHidden(true)
                          }

                        }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px 10px 7px', cursor: 'pointer',
                          borderBottom: postVariationKey == key ? '1px solid hsl(262.1, 83.3%, 57.8%)' : '1px solid whitesmoke'
                        }}>
                        {platformIcons[profile.platform]}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-39 shadow-md !p-3 rounded-lg border-[0.5px] alig" hidden={(postVariationKey != key || deleteVersionPopoverHidden)}>
                      <Button
                        onClick={() => setShowDeletionConfirmationModal(true)}
                        className='text-red-700 shadow-none bg-white hover:bg-[#ffecec9e] transition transition-duration-200 color transition-color'>Delete Version</Button>
                    </PopoverContent>
                  </Popover>
                )
              })}
            {showPlus && <Popover>
              <PopoverTrigger asChild>
                <div
                  onClick={() => setIsPopoverHidden(false)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px 10px 7px', cursor: 'pointer' }}>
                  <Plus size={15} strokeWidth={2} color='black' />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 shadow-none !p-3 rounded-lg border-[0.5px] border-gray-100" hidden={isPopoverHidden}>
                <div style={{ padding: '0px', display: 'flex', flexDirection: 'column', marginBottom: '9px' }}>
                  <p style={{ fontWeight: '500', fontSize: '14px' }}>Modify post for</p>
                </div>
                <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {checkedProfile
                    .filter((profile, index) => !profile.unique && profile.active)
                    .map((profile) => (
                      <div
                        onClick={() => {
                          // if alrdy in setPostVariations set key and if not add it and set properties
                          const key = `${profile.platform}-${profile.name}-${profile.id}`;
                          if (!Object.keys(postVariations).some(postVar => postVar == key)) {
                            setPostVariations((prev) => ({
                              ...prev, [key]: {
                                postCaption: postVariations[postVariationKey].postCaption,
                                postMedia: photosInPost
                              }
                            }))
                          }
                          setCheckedProfile((prev) => prev.map((p) => {
                            if (p.id == profile.id) {
                              return { ...p, unique: true }
                            }
                            return p;
                          }))
                          setPostVariationKey(key);
                          setIsPopoverHidden(true);
                        }}
                        className='bg-gray-100 rounded-sm pr-3 !py-1 px-1' style={{ display: 'flex', gap: '3px', alignItems: 'center', fontSize: '12px', cursor: 'pointer', color: '#2d3748' }}>
                        {platformIcons[profile.platform]} {` ${profile.name}`}
                      </div>
                    ))}
                </div>
              </PopoverContent>
            </Popover>
            }
          </div>
          <div className={`rounded-lg ${styles.createPostCard}`} ref={cardRef}>
            {/* If theyhange for a specific platform it no longer inherits from generic */}
            <CreatePostHeader divRef={divRef} />
            {(youtubeTitleIsEmpty && showYoutubeTitlePrompt) && <p
              style={{ marginTop: '5px' }}
              className='text-red-600 text-sm'>YouTube Shorts must have a title.</p>}
            {showYoutubeTitlePrompt &&
              <div className="relative w-full">
                {/* YouTube Icon */}
                <FaYoutube
                  className="absolute left-3 top-1/4 translate-y-[30%] text-red-500"
                  size={20}
                />

                <Input
                  style={{ marginTop: '10px' }}
                  onChange={handleInputChange}
                  className={`${youtubeTitleIsEmpty && "border-red-500"} pl-10 focus:border-none  shadow-none`} placeholder='YouTube title' />
              </div>
            }
            <TextAreaComponent handleInput={handleInput} onSmileClick={onSmileClick} />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center', paddingTop: '8px', maxWidth: '100%', overflowX: 'auto' }} ref={imgContainer}>
              {!postTypeIsShort ? photosInPost.map((photo, index) => (
                <div
                  className={styles.photoItem}
                  onClick={() => {
                    if (photo.beingEdited) return;
                    setMediaBeingEditedUrl(photo.regUrl)
                    mediaIsGif.current = photo.isGif
                    mediaBeingEditedId.current = photo.id
                    setShowEditMediaModal(true)
                  }}
                  style={{ width: 'auto', height: 'auto', position: 'relative', }}>
                  <div className={styles.overlay} style={{ color: 'white' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-line">
                      <path d="M12 20h9" />
                      <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                      <path d="m15 5 3 3" />
                    </svg>
                  </div>
                  <div style={{ height: '55px', width: `${55 * photo.naturalAspectRatio}px` }}>
                    {!photo.beingEdited ? <img src={photo.smallUrl} style={{ width: '100%', height: '100%', borderRadius: '5px' }} /> :
                      <div className={styles.skeleton}></div>}
                  </div>
                </div>
              )) :
                (shortVideoForPostData.defined && <div
                  className={styles.photoItem}
                  style={{ width: 'auto', height: 'auto', position: 'relative', }}>
                  <div className={styles.overlay} style={{ color: 'white' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-line">
                      <path d="M12 20h9" />
                      <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                      <path d="m15 5 3 3" />
                    </svg>
                  </div>
                  <div style={{ height: '55px', width: `${55 * shortVideoForPostData.naturalAspectRatio}px` }}
                    onClick={() => {
                      setMediaBeingEditedUrl(shortVideoForPostData.url)
                      setShowEditVideoModal(true)
                    }}
                  >
                    {!shortVideoForPostData.beingEdited ? <video src={shortVideoForPostData.url} style={{ width: '100%', height: '100%', borderRadius: '5px' }} /> :
                      <div className={styles.skeleton}></div>}
                  </div>
                </div>)}
            </div>
          </div>
        </div>

        <div className={styles.toolsSection}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center' }}>
            <h4 style={{ padding: '0px 0px 10.5px', fontWeight: '500', margin: 0, color: '#303030', fontSize: '25px' }}>Tools</h4>
          </div>


          <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div className={`${'rounded-lg'} shadow-md`} style={{ width: '100%', display: 'flex', flexDirection: 'column', }}>
              <div className={`${showAiGenTemplate ? 'rounded-b-none rounded-t-lg' : 'rounded-lg'}`} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: '8px 8px 8px 10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '13px', flexShrink: 1, alignItems: 'center' }}>
                  <div className='bg-[#E7F8E9] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src={templateIcon.src} width={"27px"} height={"27px"} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center' }}>
                    <h4 style={{ color: '#2d3748', fontWeight: '600', fontSize: '16px', margin: 0 }}>AI Generated Templates</h4>
                    {/* {showAiGenTemplate && <Info color='grey' strokeWidth={2} size={19}/>}  */}
                  </div>
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

                    <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>


                      <div style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center' }}>
                        <div style={{ marginTop: '38px' }} className='rounded-md p-1 bg-white flex items-center justify-center hover:brightness-90 cursor-pointer transition duration-200'>
                          <ChevronLeft
                            onClick={() => {
                              const prev = selectedTemplateIdxForGroup == 0 ? templateGroups[selectedAudeince].templates.length - 1 : selectedTemplateIdxForGroup - 1;
                              setSelectedTemplateIdxForGroup(prev)
                            }}
                            size={24} />
                        </div>
                        <div style={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
                          <div style={{
                            display: 'flex', flexDirection: 'column', flex: '0 0 auto'
                          }}>
                            <div style={{
                              width: '100%', display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center', marginBottom: '6px', flex: '0 0 auto'
                            }}>
                              <p style={{ color: '#454d5a', fontWeight: '400', fontSize: '14px', alignSelf: 'flex-start', marginTop: '1px' }}>Audience: </p>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  overflowX: 'auto',
                                  padding: '4px 0 4px',
                                  flexGrow: 1,
                                  margin: 0,
                                }}
                              >
                                {templateGroups.map((group, idx) => (
                                  <div
                                    onClick={() => {
                                      setSelectedTemplateIdxForGroup(0)
                                      setSelectedAudience(idx)
                                    }}
                                    key={idx}
                                    className={`px-1 ${selectedAudeince === idx ? 'bg-primary text-white' : 'bg-accent text-gray'} transition-transform duration-200 transform hover:scale-110`}
                                    style={{
                                      borderRadius: '6px',
                                      fontSize: '11px',
                                      cursor: 'pointer',
                                      whiteSpace: 'nowrap', // Prevent text overflow
                                      margin: '0 5px', // Add margin instead of gap
                                      flex: '0 0 auto'
                                    }}
                                  >
                                    {group.audience}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div
                            className='rounded-md'
                            style={{
                              padding: '6px',
                              display: 'flex',
                              flexDirection: 'column',
                              overflowWrap: 'break-word',
                              fontSize: '14px',
                              wordWrap: 'break-word',
                              width: '100%',
                              whiteSpace: 'normal', // Ensures wrapping of long text
                              overflowY: 'auto',
                              flex: '0 0 auto',
                              height: '100px',
                              maxHeight: '100px',
                              border: '2px dashed lightgrey'
                            }}
                          >
                            <p className='rounded-md' style={{ padding: '1px 8px 1px', backgroundColor: '#edf2f7', alignSelf: 'flex-start', color: '#383838', fontSize: '12px', margin: '1px' }}>Template</p>
                            {templateGroups[selectedAudeince].templates[selectedTemplateIdxForGroup]}
                          </div>
                        </div>
                        <div style={{ marginTop: '38px' }} className='rounded-md p-1 bg-white flex items-center justify-center hover:brightness-90 cursor-pointer transition duration-200'>
                          <ChevronRight
                            onClick={() => {
                              setSelectedTemplateIdxForGroup((selectedTemplateIdxForGroup + 1) % (templateGroups[selectedAudeince].templates.length))
                            }}
                            size={24} />
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        gap: '10px',
                        marginTop: '13px',
                      }}
                    >
                      <Button className="text-black bg-accent shadow-none hover:bg-gray-200">
                        Expand
                      </Button>
                      <Button className="text-white shadow-none bg-primary"
                        onClick={() => addTemplateToCaption(true)}
                      >
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
                  <div className='bg-[#b2ebf778] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src={hashtagIcon.src} width={"30px"} height={"30px"} />
                  </div>
                  <h4 style={{ color: '#2d3748', fontWeight: '600', fontSize: '16px', margin: 0 }}>Saved Hashtag Groups</h4>
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

              {<div className='rounded-b-lg' style={{ backgroundColor: 'white' }}>
                <AnimatePresence>
                  {/* USE AN INFO TOOL TIP HERE */}
                  {showHashtagGroupTool && <motion.div
                    key="content2"
                    initial={{ height: '0px', opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: '0px', opacity: 0 }}
                    transition={{
                      duration: 0.3, // Adjust the duration as needed
                      ease: 'easeInOut',
                    }}

                    className='rounded-t-none rounded-b-lg' style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignSelf: 'center', backgroundColor: 'white', padding: '0px 10px 10px', overflowY: 'hidden', flex: '0 0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '100%', height: '166px', gap: '13px', overflowX: 'auto', flex: '0 0 auto', alignItems: 'center' }}>

                      {hashtagGroups.map((group, index) => (
                        <div
                          onClick={() => setSelectedHashtagGroup(index)}
                          className='rounded-md' style={{ cursor: 'pointer', border: selectedHashtagGroup == index ? '2px solid hsl(263.4, 70%, 50.4%)' : '2px dashed lightgrey', height: '140px', minWidth: '350px' }}
                        >
                          <div className={`${styles.hashtagGroupDiv}`} >
                            {group.hashtags.map((hashtag, index) => (
                              <p
                                onClick={(e) => {
                                  e.stopPropagation()
                                  addHashtag(hashtag)
                                }}
                                className={` transition-color duration-200 color hover:bg-gray-300 rounded-md bg-gray-200 text-gray-600 ${styles.hashtag}`}>{hashtag}</p>
                              // <p
                              //   onClick={(e) => {
                              //     e.stopPropagation()
                              //     addHashtag(hashtag)
                              //   }}
                              //   className={` transition-color duration-200 color rounded-md bg-purple-100 text-gray-500 hover:bg-purple-400 hover:text-white ${styles.hashtag}`}>{hashtag}</p>

                            ))}
                          </div>
                        </div>

                      ))}

                      <div className='bg-gray-200 rounded-full' style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '55px', height: '55px', alignSelf: 'center', flex: '0 0 auto' }}>
                        <p style={{ fontSize: '12px', width: '45px' }}>View All</p>
                      </div>

                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        gap: '10px',
                        marginTop: '13px',
                      }}
                    >
                      <Button className="text-black bg-accent shadow-none hover:bg-gray-200">
                        Expand
                      </Button>
                      <Button
                        onClick={() => {
                          applyHashtagGroup();
                        }}
                        className="text-white  shadow-none bg-primary">
                        Use Hashtags
                      </Button>
                    </div>

                  </motion.div>}
                </AnimatePresence>
              </div>}
            </div>


            <div className={`${'rounded-lg'} shadow-md`} style={{ width: '100%', display: 'flex', flexDirection: 'column', }}>
              <div className={`${showPostInternalNotes ? 'rounded-b-none rounded-t-lg' : 'rounded-lg'}`} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: '8px 8px 8px 10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '13px', flexShrink: 1, alignItems: 'center' }}>
                  <div className='bg-red-100 rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src={notepad.src} width={"29px"} height={"29px"} />
                  </div>
                  <h4 style={{ color: '#2d3748', fontWeight: '600', fontSize: '16px', margin: 0 }}>Post Notes</h4>
                </div>

                {showPostInternalNotes &&
                  <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                    <ChevronDown color='black' onClick={() => {
                      setPostNotes(notesInput.current.innerHTML)
                      setShowPostInternalNotes(false)
                    }} />
                  </div>
                }
                {!showPostInternalNotes &&
                  <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                    <ChevronLeft color='black' onClick={() => {
                      setShowPostInternalNotes(true)
                    }} /></div>}
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
                    {!postNotesSaving && <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center' }}>
                      <FaCircleCheck size={15} color='#6bd3a4' />
                      <p style={{ fontSize: '12px', paddingTop: '1px', color: '#454d5a' }} className="m-0">Saved</p>
                    </div>}
                    {postNotesSaving && <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}>
                      <ClipLoader color='hsl(262.1, 83.3%, 57.8%)' size={17} />
                      <p style={{ fontSize: '12px', paddingTop: '1px', color: '#454d5a' }} className="m-0">Saving...</p>
                    </div>}
                    <div className={styles.textAreaWrapper}>
                      <div
                        contentEditable={true}
                        spellCheck={false}
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

            <div className='rounded-lg shadow-md' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

              <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div className='rounded-lg' style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: '8px 8px 8px 10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '13px', flexShrink: 1, alignItems: 'center' }}>
                    <div className='bg-[#ffeeb6b8] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                      <img src={variable.src} width={"27px"} height={"27px"} />
                    </div>
                    <h4 style={{ color: '#2d3748', fontWeight: '600', fontSize: '16px', margin: 0 }}>Variables</h4>
                  </div>
                  {showVariables &&
                    <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                      <ChevronDown color='black' onClick={() => setShowVariables(false)} /></div>}
                  {!showVariables &&
                    <div className='rounded-md p-1  flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200'>
                      <ChevronLeft color='black' onClick={() => setShowVariables(true)} /></div>}
                </div>
              </div>



              {<div className='rounded-b-lg' style={{ backgroundColor: 'white' }}>
                <AnimatePresence>
                  {/* USE AN INFO TOOL TIP HERE */}
                  {showVariables && <motion.div
                    key="content2"
                    initial={{ height: '0px', opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: '0px', opacity: 0 }}
                    transition={{
                      duration: 0.3, // Adjust the duration as needed
                      ease: 'easeInOut',
                    }}

                    className='rounded-t-none rounded-b-lg' style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignSelf: 'center', backgroundColor: 'white', padding: '0px 10px 10px', overflowY: 'hidden', flex: '0 0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '100%', height: '166px', gap: '13px', overflowX: 'auto', flex: '0 0 auto', alignItems: 'center' }}>

                      {mockData.map((value, index) => (

                        <div
                          style={{
                            height: '117px',
                            width: '300px',
                            borderBottom: selectedVariable == index ? '1px solid hsl(263.4, 70%, 50.4%)' : '1px solid lightgray',
                            borderRadius: '0 0 0 0',
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '5px',
                            flex: '0 0 auto',
                            cursor: 'pointer'
                            // backgroundColor: 'white',
                          }}
                          onClick={() => setSelectedVariable(index)}
                          className='bg-white hover:bg-[#F8F8F8] transition-color color duration-200 transition-transform duration-200 transform hover:scale-105'
                        >
                          {/* Variable Name */}
                          <div
                            style={{
                              fontWeight: '600',
                              fontSize: '16px',
                              color: '#333',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {`{${value.name}}`}
                          </div>

                          {/* Variable Value */}
                          <div
                            style={{
                              fontWeight: '500',
                              fontSize: '14px',
                              color: '#007BFF',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            "this-is-the0val"
                          </div>

                          {/* Variable Description */}
                          <div
                            style={{
                              fontWeight: '400',
                              fontSize: '12px',
                              color: '#555',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2, // Ensures description wraps to two lines
                              WebkitBoxOrient: 'vertical',
                              textAlign: 'center'
                            }}
                          >
                            {value.description}
                          </div>
                        </div>
                      ))}
                      {/* <div className='bg-gray-200 rounded-full' style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '55px', height: '55px', alignSelf: 'center', flex: '0 0 auto' }}>
                        <p style={{ fontSize: '12px', width: '45px' }}>View All</p>
                      </div> */}

                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        gap: '10px',
                        marginTop: '13px',
                      }}
                    >
                      <Button className="text-black bg-accent shadow-none hover:bg-gray-200">
                        Expand
                      </Button>
                      <Button className="text-white shadow-none bg-primary"
                        onClick={() => addVariableToCaption()}
                      >
                        Use Variable
                      </Button>
                    </div>

                  </motion.div>}
                </AnimatePresence>
              </div>}
            </div>


            <div className='rounded-lg shadow-md' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className={`${showUserTemplateTools ? 'rounded-b-none rounded-t-lg' : 'rounded-lg'}`} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: '8px 8px 8px 10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '13px', flexShrink: 1, alignItems: 'center' }}>
                  <div className='bg-[#F9E7FF] rounded-md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }}>
                    <img src={browser.src} width={"27px"} height={"27px"} />
                  </div>
                  <h4 style={{ color: '#2d3748', fontWeight: '600', fontSize: '16px', margin: 0 }}>Saved Templates</h4>
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

              <div className='rounded-b-lg' style={{ backgroundColor: 'white' }}>
                <AnimatePresence>
                  {showUserTemplateTools && <motion.div
                    key="content3"
                    initial={{ height: '0px', opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: '0px', opacity: 0 }}
                    transition={{
                      duration: 0.3, // Adjust the duration as needed
                      ease: 'easeInOut',
                    }}

                    className='rounded-t-none rounded-b-lg' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignSelf: 'center', backgroundColor: 'white', padding: '0px 10px 10px', overflow: 'hidden' }}>

                    <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>


                      <div style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center' }}>
                        <div style={{ marginTop: '38px' }} className='rounded-md p-1 bg-white flex items-center justify-center hover:brightness-90 cursor-pointer transition duration-200'>
                          <ChevronLeft
                            onClick={() => {
                              const prev = selectedTemplate == 0 ? socialMediaTemplates.length - 1 : selectedTemplate - 1;
                              setSelectedTemplate(prev)
                            }}
                            size={24} />
                        </div>
                        <div style={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
                          <div style={{
                            display: 'flex', flexDirection: 'column', flex: '0 0 auto'
                          }}>
                            <div style={{
                              width: '100%', display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center', marginBottom: '6px', flex: '0 0 auto'
                            }}>
                              <p style={{ color: '#454d5a', fontWeight: '400', fontSize: '14px', alignSelf: 'flex-start', whiteSpace: 'nowrap', marginTop: '1px' }}>Template Name: </p>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  overflowX: 'auto',
                                  padding: '4px 0 4px',
                                  flexGrow: 1,
                                  margin: 0,
                                }}
                              >
                                {socialMediaTemplates.map((value, idx) => (
                                  <div
                                    onClick={() => setSelectedTemplate(idx)}
                                    key={idx}
                                    className={`px-1 ${selectedTemplate === idx ? 'bg-primary text-white' : 'bg-accent text-gray'} transition-transform duration-200 transform hover:scale-110`}
                                    style={{
                                      borderRadius: '6px',
                                      fontSize: '11px',
                                      cursor: 'pointer',
                                      whiteSpace: 'nowrap', // Prevent text overflow
                                      margin: '0 5px', // Add margin instead of gap
                                      flex: '0 0 auto'
                                    }}
                                  >
                                    {value.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div
                            className='rounded-md'
                            style={{
                              padding: '6px',
                              display: 'flex',
                              flexDirection: 'column',
                              overflowWrap: 'break-word',
                              fontSize: '14px',
                              wordWrap: 'break-word',
                              width: '100%',
                              whiteSpace: 'normal', // Ensures wrapping of long text
                              overflowY: 'auto',
                              flex: '0 0 auto',
                              height: '100px',
                              maxHeight: '100px',
                              border: '2px dashed lightgrey'
                            }}
                          >
                            <p className='rounded-md' style={{ padding: '1px 8px 1px', backgroundColor: '#edf2f7', alignSelf: 'flex-start', color: '#383838', fontSize: '12px', margin: '1px' }}>Template</p>
                            {socialMediaTemplates[selectedTemplate].template}
                          </div>
                        </div>
                        <div style={{ marginTop: '38px' }} className='rounded-md p-1 bg-white flex items-center justify-center hover:brightness-90 cursor-pointer transition duration-200'>
                          <ChevronRight
                            onClick={() => setSelectedTemplate((selectedTemplate + 1) % (socialMediaTemplates.length))}
                            size={24} />
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        gap: '10px',
                        marginTop: '13px',
                      }}
                    >
                      <Button className="text-black bg-accent shadow-none hover:bg-gray-200">
                        Expand
                      </Button>
                      <Button className="text-white shadow-none bg-primary"
                        onClick={() => addTemplateToCaption()}
                      >
                        Use Template
                      </Button>
                    </div>

                  </motion.div>}
                </AnimatePresence>
              </div>

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

interface TextAreaComponentInterface {
  handleInput: (inputTextArea: any) => void;
  onSmileClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const TextAreaComponent: React.FC<TextAreaComponentInterface> = ({ handleInput, onSmileClick }) => {
  const { setShowMediaModal, textareaRef, setShowAiGenCaption, postTypeIsShort, setShowAddShortVideoModal } = useModalStatesContext();
  const [hashtagsGenerating, setHashtagsGenerating] = useState(false);

  const generateHashtags = () => {
    setHashtagsGenerating(true);

    setTimeout(() => {
      setHashtagsGenerating(false);
      if (textareaRef.current) {
        // adding hashtags
        textareaRef.current.innerText += '#UnpopularOpinions #FascinatingBrains #WiredForConnection #SeekingAcceptance #ConformityDebate'
      }
    }, 1000);
  }

  return (
    <div className={styles.textAreaWrapper}>
      <div
        className={`${styles.textarea} ${styles.createPostPlaceholder}`}
        onInput={() => handleInput(null)}
        ref={textareaRef}
        spellCheck={false}
        contentEditable={true}
      ></div>
      <div className={styles.iconRowInCreatePost}>
        <div
          className={styles.createPostIcon}>
          <EllipsisVertical size={20} strokeWidth={1.5} />
        </div>
        <Tooltip title="Add emoji" placement="top" arrow followCursor>
          <div
            className={styles.createPostIcon} onClick={(e) => onSmileClick(e)}>
            <SmilePlus size={20} strokeWidth={1.5} />
          </div>
        </Tooltip>
        {postTypeIsShort ?
          (<Tooltip title="Select Short Video" placement="top" arrow followCursor>
            <div
              onClick={() => setShowAddShortVideoModal(true)}
              className={styles.createPostIcon} >
              <Video size={20} strokeWidth={1.5} />
            </div>
          </Tooltip>)
          :
          (<Tooltip title="Upload Media" placement="top" arrow followCursor>
            <div
              onClick={() => setShowMediaModal(true)}
              className={styles.createPostIcon} >
              <Camera size={20} strokeWidth={1.5} />
            </div>
          </Tooltip>)
        }
        <Tooltip title="AI Generated Caption" placement="top" arrow followCursor>
          <div
            className={styles.createPostIcon} onClick={() => setShowAiGenCaption(true)}>
            <WandSparkles size={20} strokeWidth={1.5} />
          </div>
        </Tooltip>
        <Tooltip title="AI Generated hashtags" placement="top" arrow followCursor>
          <div
            className={styles.createPostIcon}
            onClick={() => {
              if (hashtagsGenerating) return;
              generateHashtags();
            }}
          >
            {hashtagsGenerating && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '19px' }}>
                <ClipLoader size={15} color='black' />
              </div>
            )}
            {!hashtagsGenerating && <Hash size={20} strokeWidth={1.5} />}
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
