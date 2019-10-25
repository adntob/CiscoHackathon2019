import React, { useEffect, useState } from 'react';
import { Button } from '@momentum-ui/react';


const QUESTIONS = [];

const GROUPS = [

]



export default function Online(props) {
  const { xapi, onDisconnect } = props;
  const [events, setEvents] = useState([]);
  const [hostname, setHostname] = useState();
  const [ws, setWs] = useState();
  const [count, setCount] = useState(0);
  const [temp, setTemp] = useState();

  function createWebsocket() {
    const socket = new WebSocket("ws://localhost:5050/ws");

    socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
       console.log(data);
       setTemp(data.temperature)
       setCount(count + 1);
    };
    return socket;
  }

  useEffect(() => {
    setWs(createWebsocket());
    xapi.config.get('SystemUnit Name').then(setHostname);
    return xapi.feedback.on('Event', (event) => {
      setEvents(evs => evs.concat({
        timestamp: new Date(),
        payload: event,
      }));
    });
  }, [xapi]);


  function Twerk () {
    console.log(xapi)
  }


  function turnOnOffBulb(){
    
  } 


  const clearLog = () => { setEvents([]); };

  return (
    <div>
      <h2>Scool.io{!hostname ? '' : ` on ${hostname}`}</h2>
      <Button onClick={clearLog}>Clear log</Button>
      <Button color="red" onClick={onDisconnect}>Log off</Button>
      <Button  onClick ={Twerk}> Start quiz </Button>

      <div>Count: {count}</div>
      <div>Temp: {temp}</div>
      <pre className="event-list">
        {events.map((event) => {
          const { timestamp, payload } = event;
          return `${timestamp.toLocaleTimeString('nb-NO')}: ${JSON.stringify(payload)}`;
        }).join('\n')}
      </pre>
    </div>
  );
}


