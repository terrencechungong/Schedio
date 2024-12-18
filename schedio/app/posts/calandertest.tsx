import dynamic from 'next/dynamic';

// Dynamically import FullCalendar to disable SSR
const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false });
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';

const FullCalendarWrapper = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Meeting', start: '2024-12-17T10:00:00', end: '2024-12-17T12:00:00' },
    { id: 2, title: 'Workshop', start: '2024-12-17T11:00:00', end: '2024-12-17T13:00:00' },
  ]);

  // Custom JSX for event content
  const renderEventContent = (eventInfo) => {
    return (
      <div className="custom-event">
        <div className="custom-event-title">{eventInfo.event.title}</div>
        <div className="custom-event-details">
          <p>Time: {eventInfo.timeText}</p>
          <p>ID: {eventInfo.event.id}</p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%', padding: '20px', backgroundColor: '#f7fafc' }}>
      {/* <div style={{width:'100%', height:'100%'}}> */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        slotLabelFormat={{
          hour: 'numeric',   // Shows hours in numeric format
          minute: '2-digit', // Shows minutes in two-digit format
          hour12: true,      // Ensures 12-hour format (AM/PM)
        }}
        selectable={true}
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        dayHeaderContent={(args) => {
          // Custom two-line header content
          const weekday = args.date.toLocaleDateString('en-US', { weekday: 'long' }); // Full weekday name
          const date = args.date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }); // e.g., Dec 16, 2024
          return (
            <div style={{ textAlign: 'center', lineHeight: '20px' }}>
              <div style={{ fontWeight: 'bold', color: '#626f84', fontSize:'14px' }}>{weekday}</div>
              <div style={{ color: '#afbfcf', fontWeight: '500', fontSize:'14px' }}>{date}</div>
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
          .fc-daygrid-day-frame,
          .fc-daygrid-day {
            border: 1px solid #edf2f7 !important; /* Keep borders on cells */
          }

          /* Remove borders on the calendar's wrapper container */
          .fc-scrollgrid-liquid {
            border: none !important;
          }
        .fc-scrollgrid-section-body:first-of-type {
          display: none !important;
        }
          .fc-scrollgrid-section:nth-of-type(2) {
            display: none !important;
          }
        .fc-media-screen {
          max-width:100%;
          max-height: 100%;
          height: 100vh;
          width: 100%;
        }
        .fc-event {
          background-color: purple !important;
          border: 2px solid #6a0dad !important; /* Purple border */
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Subtle shadow */
          border-radius: 8px; /* Rounded corners */
          color: white !important; /* Text color */
          padding: 5px;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        /* Style for the custom event content */
        .custom-event {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .custom-event-title {
          font-weight: bold;
          font-size: 14px;
        }

        .custom-event-details p {
          margin: 0;
          font-size: 10px;
        }
      `}</style>
    </div>
  );
};

export default FullCalendarWrapper;
