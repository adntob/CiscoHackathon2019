
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
    //Filter on req.body.event.eventId to find the right sensor
    if (req.body.event.eventType === `temperature`) {
        console.log(`Temperature:`+req.body.event.data.temperature.value); 
    } else if (req.body.event.eventType === `touch`) {
        console.log(`Touch received!`); 
    } else if (req.body.event.eventType === `objectPresent`) {
        console.log(`Proximity State:`+req.body.event.data.objectPresent.state); 
    }
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

