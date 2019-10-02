import React from 'react';
import { Button, Input, Modal, ModalBody, ModalHeader, ModalFooter } from '@momentum-ui/react';

export default function Connect(props) {
  const { connecting, show, onConnect } = props;

  const refs = {};
  const setRef = name => ref => refs[name] = ref;

  const doConnect = (event) => {
    event.preventDefault();
    onConnect({
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
