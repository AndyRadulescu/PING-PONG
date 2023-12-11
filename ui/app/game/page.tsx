'use client';
import { useEffect, useState } from 'react';
import { GameManager } from '@/app/core/services/game-manager';
import { useSearchParams } from 'next/navigation';
import GameArea from '@/app/game/game-area';
import { PlayerState } from '@/app/game/game-config';
import { stopGame } from '@/app/core/api/api';
import { ReadyButton } from '@/app/game/ready-button';

const Game = () => {
  const roomId = useSearchParams().get('id');

  if (!roomId) {
    return <div className="width-100 flex justify-center my-40">
      <h1> NO ID PROVIDED! </h1>
    </div>;
  }

  let stompClient = new GameManager(roomId).stompClient;
  useEffect(() => {
    return () => {
      stompClient.send(`/app/count/${roomId}`, {}, PlayerState.REMOVE);
      void stopGame(roomId);
      stompClient.disconnect(() => console.log('ABORT'));
    };
  }, []);

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="container flex flex-col">
        <div className="mx-auto py-10">
          <GameArea></GameArea>
        </div>
        <ReadyButton stompClient={stompClient} roomId={roomId}></ReadyButton>
      </div>
    </div>
  );

};

export default Game;
