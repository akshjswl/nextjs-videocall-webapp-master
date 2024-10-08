// src/components/CalendarView.js
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = ({ meetings }) => {
    const tileContent = ({ date, view }) => {
        // Display the meeting if it matches the date
        const meeting = meetings.find(m => new Date(m.date).toDateString() === date.toDateString());
        if (meeting) {
            return <p>{meeting.title}</p>;
        }
    };

    return <Calendar tileContent={tileContent} />;
};

export default CalendarView;
