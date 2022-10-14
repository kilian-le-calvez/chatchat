const express = require('express');
const db = require('./src/connect_postgres');
const app = express();
const cors = require('cors');
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

app.get('/test', async (req: any, res: any) => {
  res.status(200).send(JSON.stringify('Test success'));
});

http.listen(PORT, async () => {
  await db.connectDb();
  console.log('Listening on port ' + PORT);
});
