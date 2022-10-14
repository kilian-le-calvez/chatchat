const express = require('express');
const app = express();
var cors = require('cors');
const http = require('http').Server(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const PORT = 8000;

app.use(cors());

io.on('connection', (socket: any) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('chat message', (msg: any) => {
    console.log('message: ', msg);
  });
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

app.get('/', (req: any, res: any) => res.send('My first REST API!'));

http.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
