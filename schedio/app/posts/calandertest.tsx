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
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ChevronDownIcon } from "@heroicons/react/solid";
import { PlatformColor, PlatformIcons, PlatformName, Profile } from '../layout';

enum View {
  MONTH = "Month",
  DAY = "Day",
  WEEK = "Week"
}

const FullCalendarWrapper = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Meeting', start: '2024-12-17T10:00:00', end: '2024-12-17T11:06:00' },
    { id: 2, title: 'Workshop', start: '2024-12-17T11:00:00', end: '2024-12-17T12:06:00' },
  ]);
  const [currentView, setCurrentView] = useState<View>(View.WEEK);
  const calendarRef = useRef(null); // Create a ref for FullCalendar
  const [dateRange, setDateRange] = useState("");
  const eventTextStyle: React.CSSProperties =
  {
    display: "-webkit-box", // Enables line clamping
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2, // Limit text to 2 lines
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

  // Custom JSX for event content
  const renderEventContent = (eventInfo) => {
    return (
      <div className="custom-event"
        style={{ overflowX: 'hidden' }}
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
          }}
        >
          <div
            style={{
              display: "flex",
              gap: '3px', // Remove gaps between flex children
              // backgroundColor:'blue',
              padding: 0
            }}
          >
            <FaLinkedin color={PlatformColor.LinkedIn} size={16} />
            <SiThreads color={PlatformColor.Threads} size={16} />
            <FaFacebook color={PlatformColor.Facebook} size={16} />
            <Instagram color={PlatformColor.Instagram} size={16} />
          </div>

          <div style={{ padding: 0, margin: 0 }}>
            3:00 PM
          </div>
        </div>
      </div>
    );
  };

  const handleCalendarRendered = () => {
    const titleElement = document.querySelector(".fc-toolbar-title")?.textContent;
    setDateRange(titleElement || '')
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
        .fc-event {
          background-color: white !important;
          border: none !important; /* Purple border */
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Subtle shadow */
          border-radius: 8px; /* Rounded corners */
          color: black !important; /* Text color */
          padding: 5px;
          overflow:hidden;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
            max-width: 100%;

          align-items: flex-start;
         box-shadow: 0px 4px 19px rgba(102, 102, 102, 0.2) !important;
        }

        /* Style for the custom event content */
        .custom-event {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3px;
          color: black !important; /* Text color */
          overflowX: hidden;
            max-width: 100%;
            height: 100%;
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
