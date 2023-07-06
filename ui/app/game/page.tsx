'use client';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

const SOCKET_URL = 'http://localhost:8080/api/ws-message';

export default function Game() {
  const Sock = new SockJS(SOCKET_URL);
  const stompClient = over(Sock);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {

    console.log('initiates socket connection');
    let onConnected = () => {
      console.log('Connected!!');
      stompClient.subscribe('/topic/message', function(msg) {
        if (msg.body) {
          const jsonBody = JSON.parse(msg.body);
          if (jsonBody.message) {
            console.log(jsonBody.message);
          }
        }
      });
    };

    stompClient.connect({}, onConnected);

    setLoaded(true);
    return () => stompClient.disconnect(() => console.log('ABORT'));
  }, []);

  const sendName = () => {
    stompClient.send('/app/msg', {}, JSON.stringify({ 'name': 'fasdfas' }));
  };

  return <div><p>Game page!</p>
    <button onClick={sendName}>Send message</button>
  </div>;
}
