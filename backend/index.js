import express from 'express';
import postgresql from 'postgresql';

postgresql();
const app = express();

app.get('/', (req, res) => res.send('My first REST API!'));

app.get('/test', async (req, res) => {
  res.status(200).send(JSON.stringify("Test success"));
});

const port = 8000;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});