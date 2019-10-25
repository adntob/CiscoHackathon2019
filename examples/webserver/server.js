const express = require('express');
const app = express();
const host = 'localhost';
const port = 3000;
const path = require('path');
const xapi = require('./xapi');

const codec = {
  host: '172.17.4.73',
  username: 'admin',
  password: '',
};

if (!codec.host) {
  console.error('You need to define host, username and password first. Edit server.js');
  process.exit(0);
}

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
app.use(express.static(path.resolve(__dirname, 'public')));

app.listen(port, host, () => {
  const url = `http://${host}:${port}`;
  console.log(`Example app running on ${url}`);
});
