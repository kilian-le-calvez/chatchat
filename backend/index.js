const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('My first REST API!'));

const { Client } = require('pg')

const connectDb = async () => {
  const client = new Client()
  await client.connect()
  const res = await client.query('SELECT $1::text as message', ['Hello world!'])
  console.log(res.rows[0].message) // Hello world!
  await client.end()
}

const port = 8000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
  connectDb();
});