const xapi = require('./xapi');

const codec = {
  host: '',
  username: 'admin',
  password: '',
};

if (!codec.host) {
  console.error('You need to define host, username and password first. Edit main.js');
  process.exit(0);
}

const number = 'fireplace@ivr.vc';

xapi.connect(codec);
xapi.dial(number);
setTimeout(() => {
  xapi.hangUp().then(() => process.exit());
}, 15 * 1000);
