import React from 'react';
import { Button, Input } from '@momentum-ui/react';
import * as jsxapi from 'jsxapi';

export default function Connect(props) {
  const { onError, onConnect } = props;

  const refs = {};
  const setRef = name => ref => refs[name] = ref;

  const connect = (opts) => {
    const { hostname, username, password } = opts;
    jsxapi.connect(`wss://${hostname}`, { username, password })
      .on('error', onError)
      .on('ready', onConnect);
  };

  return (
    <div className="container">
      <Input
        inputRef={setRef('hostname')}
        placeholder="Hostname"
      />
      <Input
        inputRef={setRef('username')}
        placeholder="Username"
      />
      <Input
        inputRef={setRef('password')}
        placeholder="Password"
        type="password"
      />
      <Button children="Connect" onClick={() => connect({
        hostname: refs['hostname'].value,
        username: refs['username'].value,
        password: refs['password'].value,
      })} />
    </div>
  );
}
