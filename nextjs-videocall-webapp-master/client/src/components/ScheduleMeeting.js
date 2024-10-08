// src/components/ScheduleMeeting.js
import React, { useState } from 'react';

const ScheduleMeeting = ({ onSchedule }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [participants, setParticipants] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare the meeting data
        const meetingData = {
            title,
            date,
            time,
            participants: participants.split(','),
        };
        // Trigger the parent function to handle scheduling
        onSchedule(meetingData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Meeting Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Date</label>
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Time</label>
                <input 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Participants (comma-separated emails)</label>
                <input 
                    type="text" 
                    value={participants} 
                    onChange={(e) => setParticipants(e.target.value)} 
                    className="border p-2 w-full"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Schedule Meeting</button>
        </form>
    );
};

export default ScheduleMeeting;
