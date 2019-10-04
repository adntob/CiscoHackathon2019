const express = require('express');
const app = express();
const host = 'localhost';
const port = 3000;
const xapi = require('./xapi');

const codec = {
  host: '10.47.112.232',
  username: 'admin',
  password: '',
};

xapi.connect(codec);

app.get('/call', (req, res) => res.send('Specify who you want to call too'));
app.get('/call/:number', (req, res) => {
  const { number } = req.params;
  xapi.dial(number);
  res.send('Call! ' + number);
});
app.get('/endCall', (req, res) => {
  xapi.hangUp();
  res.send(true);
});
app.get('/isInCall', (req, res) => {
  res.send(xapi.canCall() ? false : true);
});

// serve html files, assets etc from this folder:
app.use(express.static('public'));

app.listen(port, host, () => {
  const url = `http://${host}:${port}`;
  console.log(`Example app running on ${url}`);
});
