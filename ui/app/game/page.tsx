'use client';
import { useEffect, useState } from 'react';
import { GameManager } from '@/app/core/services/game-manager';
import { useSearchParams } from 'next/navigation';
import GameArea from '@/app/game/game-area';

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

  return (
    <div className="container mx-auto px-4 h-screen flex items-center justify-center">
      {/*<button onClick={sendName}>Send message</button>*/}
      <GameArea></GameArea>
    </div>);
};

export default Game;
