const xapi = require('xapi');

// Called every time a custom home screen button is tapped
function guiEvent(event) {
  console.log(event);
  if (event.PanelId === 'fireplace') {
    xapi.command('Dial', { Number: 'fireplace@ivr.vc' });
  }
}

xapi.event.on('UserInterface Extensions Panel Clicked', guiEvent);
