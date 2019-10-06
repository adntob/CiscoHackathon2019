# Web apps

<img src="images/webapps.png" style="margin-left: 25%; width: 50%;" />

The newer Webex devices with touch screens support web apps, which are basically
web views with interactive content pointing to external URLs.

Making web apps for the Cisco devices is basically like making any other web
page, but you might want to optimise for the the use case of being on a shared
device, as well as adjust sizes for big screen and tune performance.

The web engine is powered by Chromium, so most of the stuff you expect from a
full browser is available, such as HTML5 tags, EcmaScript 6 syntax, CSS3, local
storage, canvas, SVG, web sockets etc. Note that only one "tab" is supported.

Included is a web app for doing simple white boarding, with automatic line
straightening. You can use this basis or inspiration for an alternative
whiteboard with some features that you would like, such as a dedicated brain
storming app, a whiteboard with shape support, automatic OCR etc. See
http://paperjs.org/ for API, this is of course just one of thousands of
JavaScript libraries you can use to create cool web app features.

## Adding a web app to your video device

To add the web app to your video device:

* Start the UI Extensions editor
* Add new extension (web app)
* Add a name, and set the url (the ip and port for the web server on your laptop)
* Export the configuration
* It should now appear on the home screen of your video device
* Click the web app button to test it, click home to go back

The video device automatically uses the favicon on the home screen, if your web page provides one.

<img src="images/webapp-whiteboard2.png" style="margin-left: 25%; width: 50%;" />

Note that you can turn on remote debugging. This lets you use Chrome's dev
console on your laptop to view and manipulate the web app on the video device.

Config:
* Set `xConfig WebEngine RemoteDebugging: On`
* Open `10.47.90.231:9222` in Chrome on your laptop (replace ip)

For full information on what the web engine supports, see the developer guide. TODO link
