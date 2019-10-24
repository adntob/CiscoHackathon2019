
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5050;

app.use(
    bodyParser.urlencoded({
      extended: true
    })
);
app.use(bodyParser.json());

app.post('/',  (req, res) => {
    //Filter on req.body.event.targetName to find the right sensor
    //Project ID == blrpjplbffle57fk5fc0
    if (req.body.event.eventType === `temperature`) {
        //Sensor ID bful62ho5b7g0093cucg
        if (req.body.event.targetName === 'projects/blrpjplbffle57fk5fc0/devices/bful62ho5b7g0093cucg') {
            console.log(`Hackathon 1 Temperature:`+req.body.event.data.temperature.value);     
        }
    } else if (req.body.event.eventType === `touch`) {
        //Sensor ID bfuld90lq8r000elc1jg
        if (req.body.event.targetName === 'projects/blrpjplbffle57fk5fc0/devices/bfuld90lq8r000elc1jg') {
            console.log(`Hackathon 1 Touch received!`); 
        }
    } else if (req.body.event.eventType === `objectPresent`) {
        //Sensor ID bful880lq8r000elbshg
        if (req.body.event.targetName === 'projects/blrpjplbffle57fk5fc0/devices/bful880lq8r000elbshg') {
            console.log(`Hackathon 1 Proximity State:`+req.body.event.data.objectPresent.state); 
        }
    }
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

