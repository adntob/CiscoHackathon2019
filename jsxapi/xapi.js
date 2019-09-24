const jsxapi = require('jsxapi');

let adapter = null;
let isInCall = false;

function connect(codec) {
  // Connect over ssh to a codec
  const { host, username, password } = codec;
  adapter = jsxapi.connect('ssh://' + host, {
    username,
    password,
  });

  // Handle errors
  adapter.on('error', (err) => {
    // !! Note of caution: This event might fire more than once
    console.error(`xapi error: ${err}`);
  });
}

// Set up a call
function dial(number) {
  if (!adapter) return false;
  return adapter.command('Dial', { Number: number });
}

function hangUp() {
  if (!adapter) return false;
  return adapter.command('Call Disconnect');
}

module.exports = { connect, dial, hangUp };
