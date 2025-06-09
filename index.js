const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('newMessage', (message) => {
    console.log('Received message:', message);
    io.emit('newMessage', { // Broadcast the message to all connected clients
      message: message,
      sender: socket.id // Include the sender's socket ID
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});