const Webex = require('webex');
const predictWeather = require('./weather');

let webex;

// Create a new bot at https://developer.webex.com/my-apps/new/bot:
const token = 'NTA5N2NlYzktYzg3OC00ZGJkLWEyNmItZjQ0MzYyMGUxNWUzNTM5ZGE4NTgtNTll_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f';

let botDetails;

function verifyAccessToken(accessToken) {
  _initializeWebex(accessToken);
  return new Promise((resolve, reject) => {
    webex.people.get('me').then(person => {
      botDetails = person;
      console.log('Bot running:', botDetails.displayName);
      resolve(person);
    }).catch(() => {
      reject('not authenticated');
    });
  });
}

function runListener() {
  const resource = {
    description: 'messages',
    events: [ 'created', 'deleted' ] };
  _startListener(resource);
}

function _initializeWebex(accessToken) {
  webex = Webex.init({
    credentials: {
      access_token: accessToken
    }
  });
}

function _startListener(resource) {
  const resource_name = resource.description;
  webex[resource_name].listen().then(() => {
    for (let event_name of resource.events) {
      webex[resource_name].on(event_name, event_object => _forwardEvent(event_object));
    }
  }).catch(reason => {
    console.log(reason);
    process.exit(-1);
  });
}

function answer(roomId, text) {
  webex.messages.create({
    roomId,
    markdown: text,
  });
}

function _forwardEvent(event) {
  const { roomId, personId, text } = event.data;

  // Important: don't answer to own messages (=> recursive loop)
  if (personId === botDetails.id) return;

  if (text.toLowerCase().includes('weather')) {
    const weather = predictWeather();
    answer(roomId, weather);
  }
  else {
    answer(roomId, 'Dont know what to say about that. Ask **weather** for forecast');
  }
}

function run() {
  verifyAccessToken(token).then(() => console.log('Bot server started'));
  setTimeout(runListener, 1000);
}

run();
