const jsxapi = require('jsxapi');

let adapter = null;
let isInCall = false;
let counter = 0;

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
  trackCalls();
}

// Set up a call
function dial(number) {
  if (!adapter) return false;
  if (isInCall) {
    console.log('Can\'t dial, already in call');
    return false;
  }
  else {
    return adapter.command('Dial', { Number: number });
  }
}

function hangUp() {
  if (!adapter) return false;
  return adapter.command('Call Disconnect');
}

function trackCalls() {
  adapter.status.on('SystemUnit State NumberOfActiveCalls', (callCount) => {
    isInCall = parseInt(callCount) > 0;
    counter++;
  });
}

function canCall() {
  return !isInCall;
}

module.exports = { connect, dial, hangUp, canCall };
