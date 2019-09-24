const xapi = require('./xapi');

const codec = {
  host: '10.47.112.232',
  username: 'admin',
  password: '',
};
const number = 'fireplace@ivr.vc';

xapi.connect(codec);
xapi.dial(number);
setTimeout(() => {
  xapi.hangUp().then(() => process.exit());
}, 15 * 1000);
