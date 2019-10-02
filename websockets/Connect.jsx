import React, { useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalHeader, ModalFooter } from '@momentum-ui/react';
import * as jsxapi from 'jsxapi';

export default function Connect(props) {
  const { show, onError, onConnect } = props;
  const [connecting, setConnecting] = useState(false);

  const refs = {};
  const setRef = name => ref => refs[name] = ref;

  const connect = (opts) => {
    setConnecting(true);
    const { hostname, username, password } = opts;
    jsxapi.connect(`wss://${hostname}`, { username, password })
      .on('error', onError)
      .on('ready', onConnect);
  };

  const doConnect = (event) => {
    event.preventDefault();
    if (connecting) {
      return;
    }
    connect({
      hostname: refs['hostname'].value,
      username: refs['username'].value,
      password: refs['password'].value,
    });
  };

  return (
    <Modal
      applicationId="app"
      show={show}
      size="small"
      titleText="Connect to system"
      htmlId="connect-modal"
      onHide={() => {}}
    >
      <ModalHeader headerLabel="Connect to system" showCloseButton={false} />
      <ModalBody>
        <div className="row">
          <div className="columns">
            <form onSubmit={doConnect}>
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
            </form>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          children="Connect"
          color="blue"
          onClick={doConnect}
          type="submit"
          disabled={connecting}
        />
      </ModalFooter>
    </Modal>
  );
}
