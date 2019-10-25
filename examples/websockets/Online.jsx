import React, { useEffect, useState } from 'react';
import { Button } from '@momentum-ui/react';
import OFFbulb from './img/OFFbulb.jpg'
import ONbulb from './img/ONbulb.jpg'
import logo from './img/logo.png'

const QUESTIONS = [
  {
    "Question": "What is love?",
    "Answer": "Don't hurt me, no more"
  }
];





export default function Online(props) {
  const { xapi, onDisconnect } = props;
  const [events, setEvents] = useState([]);
  const [hostname, setHostname] = useState();
  const [ws, setWs] = useState();
  const [count, setCount] = useState(0);
  const [temp, setTemp] = useState();
  const [ groups, setGroups ] = useState(
     [
      {
        'isActive':false,
        'id':""
      }, 
      {
        'isActive':false,
        'id':""
      },
       { 
        'isActive':false,
        'id':""
       }
      ]
  );

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


  const clearLog = () => { setEvents([]); };

  return (
    <div>
      <img src = {logo} width = {250}/>
      <br/>
      <Button onClick={clearLog}>Clear log</Button>
      
      <Button  onClick ={Twerk}> Start quiz </Button>

      <div>Count: {count}</div>
      <div>
        {groups.map( (group, key) => (
          <div key = {`${key}-${group.isActive}`}>
          <p>Group number: {key}
          <img src = {group.isActive ? ONbulb : OFFbulb} width={20} onClick = { ()=>{ 
            const updatedGroups = groups.slice();
            updatedGroups[key].isActive = !groups[key].isActive;
            console.log(updatedGroups);
              setGroups(updatedGroups);
            }
            }/>
          </p>
          </div>
        ))}
      </div>
      <div>Temp: {temp}</div>
      {/*
      <pre className="event-list">
        {events.map((event) => {
          const { timestamp, payload } = event;
          return `${timestamp.toLocaleTimeString('nb-NO')}: ${JSON.stringify(payload)}`;
        }).join('\n')}
      </pre>
      */}
      <Button color="red" onClick={onDisconnect}>Log off</Button>
    </div>
  );

}


const turnOff = (i)=>{
  console.log('swag lyf')
}
