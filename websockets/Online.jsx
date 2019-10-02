import React, { useEffect, useState } from 'react';
import { Button } from '@momentum-ui/react';

export default function Online(props) {
  const { xapi, onDisconnect } = props;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    return xapi.feedback.on('Event', (event) => {
      setEvents(evs => evs.concat({
        timestamp: new Date(),
        payload: event,
      }));
    });
  }, [xapi]);

  const clearLog = () => { setEvents([]); };

  return (
    <div>
      <h2>Events</h2>
      <Button onClick={clearLog}>Clear log</Button>
      <Button color="red" onClick={onDisconnect}>Disconnect</Button>
      <pre className="event-list">
        {events.map((event) => {
          const { timestamp, payload } = event;
          return `${timestamp.toLocaleTimeString('nb-NO')}: ${JSON.stringify(payload)}`;
        }).join('\n')}
      </pre>
    </div>
  );
}
