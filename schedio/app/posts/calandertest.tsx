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
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        eventContent={renderEventContent} // Use custom JSX for events
      />

      <style jsx global>{`
        /* Custom styles for events */
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
