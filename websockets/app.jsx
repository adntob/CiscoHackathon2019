import React, { useState } from 'react';
import { AlertBanner } from '@momentum-ui/react';
import * as jsxapi from 'jsxapi';

import Connect from './Connect';
import Online from './Online';

function connect(opts, onError, onConnected) {
  const { hostname, username, password } = opts;
  jsxapi.connect(`wss://${hostname}`, { username, password })
    .on('error', onError)
    .on('ready', onConnected);
}

function App() {
  const [xapi, setXapi] = useState();
  const [error, setError] = useState();
  const [connecting, setConnecting] = useState(false);

  const onError = (error) => {
    setConnecting(false);
    setError(error);
    if (xapi) {
      xapi.close();
      setXapi();
    }
  };
  const onConnected = (xapi) => {
    setConnecting(false);
    setXapi(xapi);
  };
  const onConnect = (opts) => {
    setConnecting(true);
    connect(opts, onError, onConnected);
  };
  const onDisconnect = () => {
    xapi.close();
    setError();
    setXapi();
  };

  const connected = !!xapi;
  return (
    <div>
      <AlertBanner type="error" show={!!error}>
        {error}
      </AlertBanner>
      <Connect
        connecting={connecting}
        show={!connected}
        onConnect={onConnect}
      />
      {connected && (
        <Online xapi={xapi} onDisconnect={onDisconnect} />
      )}
    </div>
  );
}

export default function app() {
  return <App/>;
}
