'use client';
import { useEffect, useState } from 'react';
import { GameManager } from '@/app/core/services/game-manager';
import { useSearchParams } from 'next/navigation';
import GameArea from '@/app/game/game-area';
import { PlayerState } from '@/app/game/game-config';
import { stopGame } from '@/app/core/api/api';
import { ReadyButton } from '@/app/game/ready-button';

const Game = () => {
  const id = useSearchParams().get('id');

  if (!id) {
    return <div className="width-100 flex justify-center my-40">
      <h1> NO ID PROVIDED! </h1>
    </div>;
  }

  let stompClient = new GameManager(id).stompClient;
  useEffect(() => {
    return () => {
      stompClient.send(`/app/count/${id}`, {}, PlayerState.REMOVE);
      void stopGame(id);
      stompClient.disconnect(() => console.log('ABORT'));
    };
  }, []);

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="container flex flex-col">
        <div className="mx-auto py-10">
          <GameArea></GameArea>
        </div>
        <ReadyButton stompClient={stompClient} roomId={id}></ReadyButton>
      </div>
    </div>
  );

};

export default Game;
