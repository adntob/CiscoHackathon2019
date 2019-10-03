
const jsxapi = require('jsxapi');
const http = require("http");
const red = 0;
const yellow = 12000;
const green = 25500;
const blue = 46920;
var CallId;

//create the jsxapi connection object to IP of device
const xapi = jsxapi.connect("ssh://10.47.82.161", {
    username: 'admin',
    password: ''
});

xapi.on('error', (err) => {  //handler for any errors encountered with jsxapi
    console.error(`connection failed: ${err}, exiting`);
    Hue('{"on":false, "sat":254, "bri":254,"hue":'+yellow+'}');
    process.exit(1); //just exit the app
});

//when the jsxapi connection is ready...
 
xapi.on('ready', () => {
    notify("Hue connection successful");    
    Hue('{"on":true, "sat":254, "bri":254,"hue":'+yellow+'}');
});
  
xapi.event.on('OutgoingCallIndication', (status) => {
  CallId = status.CallId;
  Hue('{"on":true, "sat":254, "bri":254,"hue":'+red+'}');
});

xapi.event.on('CallDisconnect', (status) => {
    if  (status.CallId==CallId) {
        notify('Call disconnected');
        Hue('{"on":true, "sat":254, "bri":254,"hue":'+green+'}');    
    } else {
        Hue('{"on":true, "sat":254, "bri":254,"hue":'+yellow+'}');    
    }
});


xapi.status.on('Standby', state=> {
    if (state.State === 'Off') {
        Hue('{"on":true, "sat":128, "bri":128,"hue":'+green+'}');
        notify ('Standby deactivated');
    } else if (state.State === 'Halfwake') {
        Hue('{"on":true, "sat":254, "bri":128,"hue":'+blue+'}');
    } else if (state.State === 'Standby') {
        Hue('{"on":false}');
    };
});


function notify(message) {
    xapi.command('UserInterface Message TextLine Display', {
      Text: message,
      duration: 10
    });
}

function Hue(value){
    var options = {
        //IP of Hue bridge
        host:'10.47.112.104',
        path: '/api/X1PfeFwuPotKBQnnRC7OCWKoA5KJjM9k9O55GrwD/lights/3/state',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    
    var req = http.request(options, function (res) {
        var responseString = "";
        res.on("data", function (data){
            responseString+=data;
        });
        res.on("end", function () {
            console.log(responseString);
        });
    });
    
    req.write(value);
    req.end();
    
}
