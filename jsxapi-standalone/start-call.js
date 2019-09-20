const jsxapi = require('jsxapi');

const videoHost = ''; // eg 10.47.92.231
const username = 'admin'; //
const password = '';
const numberToDial = ''; // eg tbjolset@cisco.com

// Connect over ssh to a codec
const xapi = jsxapi.connect('ssh://' + videoHost, {
  username,
  password,
});

// Handle errors
xapi.on('error', (err) => {
  // !! Note of caution: This event might fire more than once !!
  console.error(`xapi error: ${err}`);
});

// Set up a call
xapi.command('Dial', { Number: numberToDial });

// Fetch volume and print it
xapi.status
  .get('Audio Volume')
  .then((volume) => { console.log(volume); });
