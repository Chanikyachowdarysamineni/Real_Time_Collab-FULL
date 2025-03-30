// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

// Essential CORS middleware
app.use(cors({
  origin: "http://localhost:3000", // Your React app's URL
  methods: ["GET", "POST"],
  credentials: true
}));

const server = http.createServer(app);

// Socket.IO Server Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling']
});

// Socket.IO Connection Handler
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  // Add your custom event handlers here
  // socket.on('your-event', (data) => {...});
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});