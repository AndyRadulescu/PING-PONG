'use client';
import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';

const SOCKET_URL = 'ws://localhost:8080/api/ws-message';

export default function Game() {
  const client = new Client({
    brokerURL: SOCKET_URL,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
  });

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {

    console.log('initiates socket connection')
    let onConnected = () => {
      console.log('Connected!!');
      client.subscribe('/topic/message', function(msg) {
        if (msg.body) {
          const jsonBody = JSON.parse(msg.body);
          if (jsonBody.message) {
            console.log(jsonBody.message);
          }
        }
      });
    };

    let onDisconnected = () => {
      console.log('Disconnected!!');
    };

    client.onConnect = onConnected;
    client.onDisconnect = onDisconnected;

    client.activate();

    setLoaded(true);
  }, []);

  useEffect(()=>{
    return client.onWebSocketClose(true);
  })


  function sendName(){
    // client.send('/app/hello', {}, JSON.stringify({ 'name': 'fasdfas' }));
  }

  return <p>Game page!</p>;
}
