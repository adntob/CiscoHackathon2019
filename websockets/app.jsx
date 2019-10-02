import React, { useState } from 'react';
import { AlertBanner } from '@momentum-ui/react';

import Connect from './Connect';
import Online from './Online';

function App() {
  const [xapi, setXapi] = useState();
  const [error, setError] = useState();

  const onConnect = (xapi) => { setXapi(xapi); };
  const onError = (error) => { setError(error); };
  const onDisconnect = () => {
    xapi.close();
    setXapi();
  };

  return (
    <div>
      <AlertBanner type="error" show={!!error}>
        {error}
      </AlertBanner>
      {xapi ? (
        <Online xapi={xapi} onDisconnect={onDisconnect} />
      ) : (
        <Connect onConnect={onConnect} onError={onError} />
      )}
    </div>
  );
}

export default function app() {
  return <App/>;
}
