// Importing necessary modules
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Create the HTTP server and Socket.IO server
const server = app.listen(8000, () => {
  console.log("Server running on port 8000");
});

const io = new Server(server, {
  cors: {
    origin: "*", // Allow any origin for now
  },
});

// Routes for scheduling meetings (already implemented)
app.post('/api/schedule', (req, res) => {
  const { title, date, time, participants } = req.body;
  const meeting = { title, date, time, participants };

  // Emit 'Meeting_Scheduled' event to all clients
  io.emit('Meeting_Scheduled', meeting);

  return res.status(201).json({
    message: 'Meeting scheduled successfully',
    meeting,
  });
});

app.get('/api/meetings', (req, res) => {
  res.json(meetings);
});

// Socket.IO logic (your code)
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  socket.on("Schedule_Meeting", (meetingDetails) => {
    // Broadcast meeting details to other users
    io.emit("Meeting_Scheduled", meetingDetails);
    console.log("Meeting Scheduled:", meetingDetails);
  });
  socket.on("Send_RoomJoin_Req", ({ roomCode, uuid }) => {
    io.emit("Get_Available", { from: uuid, roomCode: roomCode });
  });

  socket.on("Send_Available", ({ roomCode, to, uuid }) => {
    io.emit("User_Join", { to: to, remote: uuid });
    io.emit("User_Join", { to: uuid, remote: to });
  });

  socket.on("EndStream", ({ to }) => {
    io.emit("EndStream", { to });
  });

  socket.on("Send_Offer", ({ to, from, Offer }) => {
    io.emit("Get_Offer", { to: to, from, Offer });
  });

  socket.on("Send_Ans", ({ to, from, Ans }) => {
    io.emit("Get_Ans", { to: to, Ans });
  });
});
console.log("Server Start");