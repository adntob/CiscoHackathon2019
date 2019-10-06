# jsxapi over WebSockets

This example provides a web application which connects to a video system, then
lists out all the XAPI events emitted.

The example shows how to use the WebSocket connectivity supported by Cisco's
video systems. The example uses the [jsxapi](https://github.com/cisco-ce/jsxapi)
JavaScript language bindings to provide a uniform programming model in the
browser, on node.js and in the macro runtime system.

## Run the example

In a terminal, run the following:

``` shell
npm run websockets
```

Open a web browser and go to the URL displayed by the command above:

"Server running at http://localhost:1234"

In the webpage, enter the hostname/ip of a video system, and the provided
credentials.
