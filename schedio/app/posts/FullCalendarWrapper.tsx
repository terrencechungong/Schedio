import dynamic from 'next/dynamic';
import { FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Instagram } from "lucide-react";
import { SiThreads } from "react-icons/si";
// Dynamically import FullCalendar to disable SSR
const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false });
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ChevronDownIcon } from "@heroicons/react/solid";
import { PlatformColor, PlatformIcons, PlatformName, Profile, useModalStatesContext } from '../layout';

// change event view for month add line for day and day


enum View {
  MONTH = "Month",
  DAY = "Day",
  WEEK = "Week"
}

const FullCalendarWrapper = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Meeting', start: '2024-12-24T10:00:00', end: '2024-12-24T11:06:00' },
    { id: 2, title: 'Workshop', start: '2024-12-24T11:00:00', end: '2024-12-24T12:06:00' },
    { id: 3, title: 'Workshop', start: '2024-12-24T11:00:00', end: '2024-12-24T12:06:00' },
    { id: 4, title: 'Workshop', start: '2024-12-24T11:00:00', end: '2024-12-24T12:06:00' },
  ]);
  const { setShowPostDetailsFromCalendarModal } = useModalStatesContext();
  const [currentView, setCurrentView] = useState<View>(View.WEEK);
  const calendarRef = useRef(null); // Create a ref for FullCalendar
  const [dateRange, setDateRange] = useState("");
  const eventTextStyle: React.CSSProperties =
  {
    display: "-webkit-box", // Enables line clamping
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2, // Limit text to 2 lines
    fontSize: '11.5px',
    overflow: "hidden", // Hide overflow text
    textOverflow: "ellipsis",
    whiteSpace: "normal", // Allow text wrapping
    wordBreak: "break-word", // Break long words if needed
    maxWidth: "100%", // Ensure it doesn’t stretch
    lineHeight: "1.2", // Adjust line spacing
  }

  const ProfileIcon = ({ profile }: { profile: Profile }) => {
    const Icon = PlatformIcons[profile.platform as PlatformName];
    return <Icon color={PlatformColor[profile.platform]} size={17} />;
  };
  const [hover, setHover] = useState(false);



  useEffect(() => {
    if (currentView == View.DAY) {
      const columnDiv = document.querySelector('[data-time="05:30:00"][class="fc-timegrid-slot fc-timegrid-slot-lane fc-timegrid-slot-minor"]');
      if (!columnDiv) return;

      const columnDivRect = columnDiv.getBoundingClientRect();

      // Calculate the line's position
      const lineTop = columnDivRect.top + window.scrollY; // Include scroll offset
      // const lineLeft = columnDivRect.left + window.scrollX; // Include scroll offs
      let liveLine = document.querySelector(".live-line-day");
      console.log("LIVE LINE", liveLine);
      if (!liveLine) {
        console.log("Creating live line");
        liveLine = document.createElement("div");
        liveLine.className = "live-line-day";
        const ball = document.createElement("div");
        ball.style.width = "13px";
        ball.style.height = "13px";
        ball.style.borderRadius = "50%"; // Perfect circle
        ball.style.backgroundColor = "#db372d";
        ball.style.flexShrink = "0"; // Prevent shrinking

        // Create the line
        const line = document.createElement("div");
        line.style.width = "100%"; // Line stretches full width
        line.style.height = "3px"; // Thickness of the line
        line.style.backgroundColor = "#db372d";

        // Style the live line container
        liveLine.style.position = "absolute";
        liveLine.style.top = `${lineTop}px`; // Dynamically position the line
        // liveLine.style.width = `100%`; // Match container width
        liveLine.style.display = `flex`; // Use flexbox for ball + line alignment
        liveLine.style.alignItems = `center`; // Vertically align ball with line
        liveLine.style.height = `auto`; // Adjust height dynamically
        liveLine.style.backgroundColor = "rgba(0,0,0,0)"; // Transparent background
        liveLine.style.zIndex = "1000";
        liveLine.style.marginLeft = "-6.5px"; // Move it 10px before the parent's left edge
        liveLine.style.width = `calc(100% + 6.5px)`; // Extend width to compensate for negative margin

        // Append ball and line to the live line container
        liveLine.appendChild(ball);
        liveLine.appendChild(line);
        columnDiv?.appendChild(liveLine);
        // indicatorContainer?.appendChild(liveLine);
      } else {
        // Clear previous children if the line is already present
        liveLine.style.display = 'flex'
        liveLine.style.top = `${lineTop}px`; // Dynamically position the line
      }
    } else {
      let liveLine = document.querySelector(".live-line-day");
      if (liveLine) {
        liveLine.style.display = 'none'
      }
    }

  }, [currentView]);

  // fix the elipsis at some point

  const eventBgSlicStyles = { height: '25%', minHeight: '22%', width: '100%', display: 'flex', flexDirection: 'column', padding: '1px 5px 1px 0', justifyContent: 'center', textOverflow: 'ellipsis', overflow: 'hidden' }
  const innerSliceText = { width: '64%', alignSelf: 'flex-end', display: 'flex', justifyContent: 'flex-end', textAlign: 'end', textOverflow: 'ellipsis', overflow: 'hidden', fontWeight: '600' }

  // Custom JSX for event content
  const renderEventContent = (eventInfo) => {
    if (currentView == View.DAY || currentView == View.WEEK) {
      return (
        <div style={{ width: '100%', position: 'relative', height: '100%', flexGrow: 1, borderRadius: '8px', boxShadow: '0px 4px 19px rgba(102, 102, 102, 0.28)' }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setShowPostDetailsFromCalendarModal(true)}
        >
          <div style={{ zIndex: 1, height: '100%', width: '100%', minHeight: '100%', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ ...eventBgSlicStyles, backgroundColor: '#FF91B3', borderRadius: '8px 8px 0 0' }}>
              <span style={{ ...innerSliceText }}>Tester</span>
            </div>
            <div style={{ ...eventBgSlicStyles, paddingRight: '5px', backgroundColor: '#1BC7B7' }}>
              <span style={{ ...innerSliceText }}>Tester</span>
            </div>
            <div style={{ ...eventBgSlicStyles, paddingRight: '5px', backgroundColor: '#FFE13D' }}>
              <span style={{ ...innerSliceText }}>Tester</span>
            </div>
            <div style={{ ...eventBgSlicStyles, paddingRight: '5px', backgroundColor: '#FF0000', borderRadius: '0 0 8px 8px' }}>
              <span style={{ ...innerSliceText }}>Tester</span>
            </div>

          </div>
          <div className={`custom-event transition-all duration-100 ${hover ? "w-[33%]" : "w-[90%]"}`}
            onMouseEnter={(e) => {
              e.stopPropagation()
              setHover(false)
            }}
            style={{ overflowX: 'hidden', position: 'absolute', top: 0, left: 0, height: '100%', backgroundColor: 'white', zIndex: 2 }}
          >
            <div
              className="clamped-text"
              style={eventTextStyle}
            >
              ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: '2px',
                justifyContent: "flex-end",
                // backgroundColor: "yellow",
                padding: 0,
                margin: 0,
                lineHeight: 1, // Fix potential extra space
                width: '100%',
                flex: '0 0 auto',
                minWidth: '100%'
                , flexShrink: 0
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: '3px', // Remove gaps between flex children
                  // backgroundColor:'blue',
                  padding: 0,
                  width: '100%',
                  flex: '0 0 auto',
                  minWidth: '100%'
                  , flexShrink: 0

                }}
              >
                <FaLinkedin
                  color={PlatformColor.LinkedIn}
                  size={17}
                  style={{ flexShrink: 0 }} // Prevent resizing
                />
                <SiThreads
                  color={PlatformColor.Threads}
                  size={17}
                  style={{ flexShrink: 0 }} // Prevent resizing
                />
                <FaFacebook
                  color={PlatformColor.Facebook}
                  size={17}
                  style={{ flexShrink: 0 }} // Prevent resizing
                />
                <Instagram
                  color={PlatformColor.Instagram}
                  size={17}
                  style={{ flexShrink: 0 }} // Prevent resizing
                />
              </div>

              <div style={{
                padding: 0,
                margin: 0,
                flexShrink: 0,
                fontSize: "11.5px",
                whiteSpace: "nowrap", // Prevent wrapping
                overflow: "hidden", // Hide overflow if container is small
                textOverflow: "ellipsis", // Optional ellipsis
              }}>
                3:00 PM
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          hello word
        </div>
      )
    }
  };

  const handleCalendarRendered = () => {
    const titleElement = document.querySelector(".fc-toolbar-title")?.textContent;
    setDateRange(titleElement || '');

    const placeLiveLine = () => {
      // Grab the two divs based on their attributes
      // const testDiv = document.querySelector('[data-time="07:30:00"][class="fc-timegrid-slot fc-timegrid-slot-lane fc-timegrid-slot-minor"]')
      const horizontalDiv = document.querySelector('[data-date="2024-12-25"][role="gridcell"][class="fc-day fc-day-wed fc-day-future fc-timegrid-col"]');
      const columnDiv = document.querySelector('[data-time="05:30:00"][class="fc-timegrid-slot fc-timegrid-slot-lane fc-timegrid-slot-minor"]');
      // console.log("dddddddddddddde",  horizontalDiv, columnDiv)
      const indicatorContainer = horizontalDiv?.querySelector('[class="fc-timegrid-now-indicator-container"]')
      if (indicatorContainer) {
        indicatorContainer.style.position = 'relative'
        indicatorContainer.style.zIndex = 40

        indicatorContainer.style.display = 'block'
      }

      // const columnDiv = document.querySelector('[data-date="2024-12-22"][class="fc-day-today"]');
      // const horizontalDiv = document.querySelector('[data-time="09:30:00"][class="fc-timegrid-slot"]');
      // console.log("dddddddddddddde", indicatorContainer, horizontalDiv, columnDiv)

      if (!columnDiv || !horizontalDiv) return; // Exit if divs aren't found
      console.log("yoooooooooo")
      // Get positions and dimensions of the divs
      const columnDivRect = columnDiv.getBoundingClientRect();
      const horizontalDivRect = horizontalDiv.getBoundingClientRect();

      // Calculate the line's position
      const lineTop = columnDivRect.top + window.scrollY; // Include scroll offset
      // const lineLeft = columnDivRect.left + window.scrollX; // Include scroll offset


      let liveLine = document.querySelector(".live-line");
      if (!liveLine) {
        console.log("Creating live line");
        liveLine = document.createElement("div");
        liveLine.className = "live-line";
        const ball = document.createElement("div");
        ball.style.width = "13px";
        ball.style.height = "13px";
        ball.style.borderRadius = "50%"; // Perfect circle
        ball.style.backgroundColor = "#db372d";
        ball.style.flexShrink = "0"; // Prevent shrinking

        // Create the line
        const line = document.createElement("div");
        line.style.width = "100%"; // Line stretches full width
        line.style.height = "3px"; // Thickness of the line
        line.style.backgroundColor = "#db372d";

        // Style the live line container
        liveLine.style.position = "absolute";
        liveLine.style.top = `${lineTop}px`; // Dynamically position the line
        // liveLine.style.width = `100%`; // Match container width
        liveLine.style.display = `flex`; // Use flexbox for ball + line alignment
        liveLine.style.alignItems = `center`; // Vertically align ball with line
        liveLine.style.height = `auto`; // Adjust height dynamically
        liveLine.style.backgroundColor = "rgba(0,0,0,0)"; // Transparent background
        liveLine.style.zIndex = "1000";
        liveLine.style.marginLeft = "-6.5px"; // Move it 10px before the parent's left edge
        liveLine.style.width = `calc(100% + 6.5px)`; // Extend width to compensate for negative margin

        // Append ball and line to the live line container
        liveLine.appendChild(ball);
        liveLine.appendChild(line);
        // columnDiv?.appendChild(liveLine);
        indicatorContainer?.appendChild(liveLine);
      } else {
        // Clear previous children if the line is already present
        liveLine.style.top = `${lineTop}px`; // Dynamically position the line
      }


    };

    //  Place the line initially and on window resize
    placeLiveLine();

    // Reposition the line every minute
    const interval = setInterval(() => {
      placeLiveLine();
    }, 60000); // 60,000ms = 1 minute

    // Also reposition on window resize
    window.addEventListener("resize", placeLiveLine);

    // Cleanup on component unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", placeLiveLine);
    };
    placeLiveLine()
  };

  const handleViewChange = (view: '.fc-dayGridMonth-button' | '.fc-timeGridWeek-button' | '.fc-timeGridDay-button') => {

    const views = {
      '.fc-dayGridMonth-button': View.MONTH,
      '.fc-timeGridWeek-button': View.WEEK,
      '.fc-timeGridDay-button': View.DAY
    }
    document.querySelector(view)?.click()
    const titleElement = document.querySelector(".fc-toolbar-title")?.textContent;
    setDateRange(titleElement || '')
    setCurrentView(views[view])

  };

  const clickButtonOnCalendar = (view: '.fc-today-button' | '.fc-prev-button' | '.fc-next-button') => {
    document.querySelector(view)?.click()
    const titleElement = document.querySelector(".fc-toolbar-title")?.textContent;
    setDateRange(titleElement || '')

  };

  return (
    <div style={{ width: '100%', height: '100vh', padding: '20px', backgroundColor: '#f7fafc' }}>
      {/* <div style={{width:'100%', height:'100%'}}> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Button className='!p-5' onClick={() => clickButtonOnCalendar('.fc-today-button')}>
            Today
          </Button>
          <div style={{ display: 'flex', gap: '3px' }}>

            <Button
              className='bg-transparent  hover:bg-gray-200 border-[0px] text-black shadow-none rounded-full !p-2 !h-9'
              onClick={() => clickButtonOnCalendar('.fc-prev-button')}>
              <ChevronLeft style={{ width: '20px', height: '20px', color: '#1f1f1f' }} />
            </Button>
            <Button className='bg-transparent hover:bg-gray-200 border-[0px] text-black shadow-none rounded-full !p-2 !h-9'
              onClick={() => clickButtonOnCalendar('.fc-next-button')}>
              <ChevronRight style={{ width: '20px', height: '20px', color: '#1f1f1f' }} />
            </Button>
          </div>
        </div>

        {/* Date Display */}

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <p style={{ fontSize: '21px', margin: 0, color: '#1f1f1f' }}>
            {dateRange}
          </p>


          <Popover>
            <PopoverTrigger asChild>
              <Button className='!p-5'>{currentView} <ChevronDownIcon className="w-3 h-3 text-white" />
              </Button>


            </PopoverTrigger>
            <PopoverContent align='end' className='w-30'>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', }}>
                <Button variant="ghost" onClick={() => handleViewChange('.fc-dayGridMonth-button')}>Month</Button>
                <Button variant="ghost" onClick={() => handleViewChange('.fc-timeGridWeek-button')}>Week</Button>
                <Button variant="ghost" onClick={() => handleViewChange('.fc-timeGridDay-button')}>Day</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <FullCalendar
        viewDidMount={handleCalendarRendered}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        ref={calendarRef}
        initialView="timeGridWeek"
        editable={true}
        views={{
          dayGridMonth: {
            dayMaxEventRows: 3, // Limit events in monthly view
          },
        }}
        slotLabelFormat={{
          hour: 'numeric',   // Shows hours in numeric format
          minute: '2-digit', // Shows minutes in two-digit format
          hour12: true,      // Ensures 12-hour format (AM/PM)
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        selectable={true}
        events={events}
        dayHeaderContent={(args) => {
          // Custom two-line header content
          const weekday = args.date.toLocaleDateString('en-US', { weekday: 'long' }); // Full weekday name
          const date = args.date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }); // e.g., Dec 16, 2024
          return (
            <div style={{ textAlign: 'center', lineHeight: '20px' }}>
              <div style={{ fontWeight: 'bold', color: '#626f84', fontSize: '14px' }}>{weekday}</div>
              {(currentView != View.MONTH) && <div style={{ color: '#afbfcf', fontWeight: '500', fontSize: '14px' }}>{date}</div>}
            </div>
          );
        }}
        eventContent={renderEventContent} // Use custom JSX for events
      />

      <style jsx global>{`
        /* Custom styles for events */
      .live-line {
  position: absolute;
  width: 2px;
  background-color: red;
  z-index: 1000;
}
.fc-timegrid-now-indicator-container {
  overflow: visible !important;
    opacity: 1 !important;
  visibility: visible !important;
}
        .fc-toolbar-chunk {
          display: flex !important;
          flex-direction: row-reverse !important;
          gap: 10px;
        }

        .fc-timegrid, fc-view-harness, fc-view {
          border-color: #edf2f7 !important;
        }

        .fc-timegrid-axis {
          border-color: #edf2f7 !important;
        }

        .fc-day {
          border-color: #edf2f7 !important;
        }
          .fc-day-today {
            background-color:#fafafa !important;
          }
        
          /* Remove outer border of the main calendar table */
          .fc-header-toolbar {
          display: none !important; 
            background-color: #f7fafc;
            margin: 0 !important;
            padding: 0 !important;          
          }
          .fc {
            background-color: white !important; /* Set the desi#edf2f7 color */
          }
          .fc-scrollgrid-section-header {
            background-color: #f7fafc;
          }
          .fc-timegrid-slot-label {
            background-color: #f7fafc;
            padding: 10px !important;
            color: #626f84;
            font-weight: 600;
            font-size: 15px;
          }
          .fc-scrollgrid-shrink {
            background-color: #f7fafc;
            padding: 10px !important;

          }
          .fc-scrollgrid {
            border: none !important; /* Remove outer border of the table */
          }

          /* Keep borders on table cells */
          .fc-timegrid-slot,
          .fc-daygrid-day-frame
          
          ${(currentView != View.MONTH) && `,
          .fc-daygrid-day`} {
            border: 1px solid #edf2f7 !important; /* Keep borders on cells */
          }

          /* Remove borders on the calendar's wrapper container */
          .fc-scrollgrid-liquid {
            border: none !important;
          }
     

        ${(currentView != View.MONTH) && `.fc-scrollgrid-section-body:first-of-type {
          display: none !important;
        }`}
          .fc-scrollgrid-section:nth-of-type(2) {
            display: none !important;
          }
        .fc-media-screen {
          max-width:100%;
          height: 87vh;
          width: 100%;
        }
          .fc-event-main {
            background-color: rgba(0,0,0,0) !important
          }
        .fc-event {
          background-color: rgba(0,0,0,0) !important;
          border: none !important; /* Purple border */
          border-radius: 8px; /* Rounded corners */
          color: #484d56 !important; /* Text color */
          font-size: 12px;
          display: flex;
          flex-direction: column;
          padding: 0 !important;
          justify-content: center;
            max-width: 100%;
          border: 0px solid black !important;
           align-items: stretch;
                    box-shadow: 0px 4px 19px rgba(102, 102, 102, 0.0) !important;

        }

        /* Style for the custom event content */
        .custom-event {
          display: flex;
                    border-radius: 8px; /* Rounded corners */

          flex-direction: column;
          justify-content: space-between;
          padding: 8px;
          color: #484d56 !important; /* Text color */
          overflowX: hidden;
            max-width: 100%;
            font-weight: 400;
            height: 100%;
            font-size:12px;
            max-height: 100%;
        }

        .custom-event-title {
          font-weight: bold;
          font-size: 14px;
        }

        .custom-event-details p {
          margin: 0;
          font-size: 10px;
        }
          .custom-event .clamped-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  max-width: 100%;
}
      `}</style>
    </div>
  );
};

export default FullCalendarWrapper;
