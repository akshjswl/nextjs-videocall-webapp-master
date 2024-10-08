"use client"; // Marking the component as a Client Component

import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const HomePage = () => {
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
  });

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("connect", () => {
      console.log("Connected with Socket ID:", socket.id);
      
      // Simulate joining a room
      socket.emit("Send_RoomJoin_Req", { roomCode: "123", uuid: "user1" });
    });

    socket.on("Get_Available", (data) => {
      console.log("Room available:", data);
    });

    socket.on("User_Join", (data) => {
      console.log("User joined:", data);
    });

    socket.on("Meeting_Scheduled", (data) => {
      console.log("Meeting Scheduled:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails({ ...meetingDetails, [name]: value });
  };

  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    // Emit the meeting scheduled event to the server
    socket.emit("Schedule_Meeting", meetingDetails);
    console.log("Meeting scheduled:", meetingDetails);
    // Reset the form
    setMeetingDetails({
      title: '',
      date: '',
      time: '',
      duration: '',
    });
  };

  return (
    <div>
      <h1>Socket.IO Test Page</h1>
      <form onSubmit={handleScheduleMeeting}>
        <input
          type="text"
          name="title"
          value={meetingDetails.title}
          onChange={handleChange}
          placeholder="Meeting Title"
          required
        />
        <input
          type="date"
          name="date"
          value={meetingDetails.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={meetingDetails.time}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="duration"
          value={meetingDetails.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          required
        />
        <button type="submit">Schedule Meeting</button>
      </form>
    </div>
  );
};

export default HomePage;
