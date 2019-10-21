
const types = [
  '☀️ Sunny',
  '⛅ Partly cloudy',
  '☁️ Cloudy',
  '🌧 Rainy',
  '❄️ Snowy',
  '🌩 Lightning',
];

function predictWeather() {
  const temp = parseInt(Math.random() * 20);
  const weather = types[Math.floor(Math.random() * types.length)];
  const prediction = `Weather forecast for tomorrow: ${weather} ${temp} °C`;
  return prediction;
}

module.exports = predictWeather;
