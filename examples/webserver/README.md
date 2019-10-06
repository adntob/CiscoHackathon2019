# jsxapi with Express web server

If you want people to be able to interact with the jsxapi from their laptop or
mobile devices, a simple way is to integrate the jsxapi with a web server.
Express is a minimal Node.js web server that's easy to set up.

## Run the example

``` shell
npm run webserver
```

Visiting `http://localhost:3000` in your browser should show you a simple page
where you can place and end a call.

You can test the server itself (without the web page) by typing this in your
browser's URL bar:

`http://localhost:3000/call/fireplace@ivr.vc`

It should place a call. The following request should hang up:

`http://localhost:3000/endCall`
