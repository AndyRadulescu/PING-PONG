'use client';
import { useEffect, useState } from 'react';
import { GameManager } from '@/app/core/services/game-manager';

const Game = () => {
  const [loaded, setLoaded] = useState(false);
  const stompClient = new GameManager().stompClient;

  useEffect(() => {
    setLoaded(true);

    return () => stompClient.disconnect(() => console.log('ABORT'));
  }, []);

  const sendName = () => {
    stompClient.send('/app/msg/andy', {}, JSON.stringify({ 'name': 'some text' }));
  };

  return <div><p>Game page!</p>
    <button onClick={sendName}>Send message</button>
  </div>;
};

export default Game;
