# Disruptive technologies server

A web server that accepts data from Disruptive Technologies sensors (temperature, touch, proxmity).

Documentation: https://studio.disruptive-technologies.com

Hackathon project: https://studio.disruptive-technologies.com/projects/blrpjplbffle57fk5fc0/devices/bf7b1ut7rihlrv30lf3g

How to use:

* npm install, it not done already
* Setup ngrok on your laptop, so the Disruptive cloud service can call your laptop even if its on a local network
* node dtsensors/sensors.js

The running example will print out sensor data as soon as they occur.