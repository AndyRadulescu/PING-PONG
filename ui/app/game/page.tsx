'use client';
import { useEffect, useState } from 'react';
import { GameManager } from '@/app/core/services/game-manager';
import { useSearchParams } from 'next/navigation';

const Game = () => {
  const [loaded, setLoaded] = useState(false);
  const id = useSearchParams().get('id');
  if (!id) {
    return <div className="width-100 flex justify-center my-40">
      <h1> NO ID PROVIDED! </h1>
    </div>;
  }
  const stompClient = new GameManager(id).stompClient;

  useEffect(() => {
    setLoaded(true);

    return () => stompClient.disconnect(() => console.log('ABORT'));
  }, []);

  const sendName = () => {
    stompClient.send(`/app/msg/${id}`, {}, JSON.stringify({ 'name': 'some text' }));
  };

  return <div><p>Game page!</p>
    <button onClick={sendName}>Send message</button>
  </div>;
};

export default Game;
