'use client';
import React, { useEffect, useState } from 'react';
import { GameManager } from '@/app/core/services/game-manager';
import { useSearchParams } from 'next/navigation';
import { PlayerState } from '@/app/game/game-config';
import { stopGame } from '@/app/core/api/api';
import ListenerWrapper from '@/app/game/listener-wrapper';

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

  return (<ListenerWrapper stompClient={stompClient} roomId={roomId}></ListenerWrapper>);

};

export default Game;
