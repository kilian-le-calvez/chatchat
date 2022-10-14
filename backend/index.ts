import express from 'express';

const db = require('./src/connect_postgres');
const app = express();

app.get('/', (req: any, res: any) => res.send('My first REST API!'));

app.get('/test', async (req : any, res : any) => {
  res.status(200).send(JSON.stringify("Test success"));
});

const port = 8000;

app.listen(port, async () => {
  await db.connectDb()
  console.log('Listening on port ' + port);
});
