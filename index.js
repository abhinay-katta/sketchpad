const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server);


// to serve static files
app.use(express.static(path.join(__dirname)));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Send the index.html file
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});