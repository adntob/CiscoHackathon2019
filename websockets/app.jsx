import React, { useState } from 'react';
import { AlertBanner } from '@momentum-ui/react';

import Connect from './Connect';
import Online from './Online';

function App() {
  const [xapi, setXapi] = useState();
  const [error, setError] = useState();

  const connected = !!xapi;
  const onConnect = (xapi) => { setXapi(xapi); };
  const onError = (error) => {
    setError(error);
    if (xapi) {
      xapi.close();
      setXapi();
    }
  };
  const onDisconnect = () => {
    xapi.close();
    setError();
    setXapi();
  };

  return (
    <div>
      <AlertBanner type="error" show={!!error}>
        {error}
      </AlertBanner>
      <Connect show={!connected} onConnect={onConnect} onError={onError} />
      {connected && (
        <Online xapi={xapi} onDisconnect={onDisconnect} />
      )}
    </div>
  );
}

export default function app() {
  return <App/>;
}
