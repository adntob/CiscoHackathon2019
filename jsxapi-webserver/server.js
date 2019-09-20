const express = require('express');
const app = express();
const port = 3000;

function call(number) {
  console.log('Call: ', number);
}

app.get('/call', (req, res) => res.send('Specify who you want to call too'));
app.get('/call/:number', (req, res) => {
  const { number } = req.params;
  call(number);
  res.send('Call! ' + number);
});

app.use(express.static('public'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
