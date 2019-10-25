
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var expressWs = require('express-ws')(app);

const PORT = process.env.PORT || 5050;

app.use(
    bodyParser.urlencoded({
      extended: true
    })
);
app.use(bodyParser.json());

app.ws('/ws', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(`ws received: ${msg}`);
      ws.send(msg);
    });
  });

app.post('/',  (req, res) => {
    //Filter on req.body.event.targetName to find the right sensor
    //Project ID == blrpjplbffle57fk5fc0
    if (req.body.event.eventType === `temperature`) {
        //Sensor ID bful62ho5b7g0093cucg
        if (req.body.event.targetName === 'projects/blrpjplbffle57fk5fc0/devices/bful62ho5b7g0093cud0') {
            console.log(`Hackathon 5 Temperature:`+req.body.event.data.temperature.value);
            const data = {
                'temperature': req.body.event.data.temperature.value
            };
            expressWs.getWss().clients.forEach(c => c.send(JSON.stringify(data)));
        }
    } else if (req.body.event.eventType === `touch`) {
        //Sensor ID bfuld90lq8r000elc1jg
        
        if (req.body.event.targetName === 'projects/blrpjplbffle57fk5fc0/devices/bfulg0ho5b7g0093d8ag') {
            console.log(`Hackathon 5 Touch received!`); 
        }
    } else if (req.body.event.eventType === `objectPresent`) {
        //Sensor ID bful880lq8r000elbshg
        if (req.body.event.targetName === 'projects/blrpjplbffle57fk5fc0/devices/bful0lolq8r000elbkog') {
            console.log(`Hackathon 5 Proximity State:`+req.body.event.data.objectPresent.state); 
        }
    }
    if (req.body.event.eventType === `touch`) {

        var device_id_list = ['bhqgs5mt96bg00813kgg', 'bgrhkh8lq8r000elc5m0', 'bful571o5b7g0093ctg0', 'bfulg0ho5b7g0093d8ag']

        var device_id = req.body.event.targetName.split("/")[3]
        var device = device_id_list.findIndex(function(element){return (element === device_id)})

        const data = {
            'button_number': device
        };

        expressWs.getWss().clients.forEach(c => c.send(JSON.stringify(data)));

        console.log('Hackathon 5 Touch received, '+(device)+'!');
    }

    
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

