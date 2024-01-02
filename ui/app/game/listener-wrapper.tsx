import GameArea from '@/app/game/game-area';
import { ReadyButton } from '@/app/game/ready-button';
import { Client } from 'stompjs';
import { useEffect } from 'react';
import { ThisPlayer } from '@/app/core/model/game-message';
import { useGameStateStore } from '@/app/core/store/game-state.store';

const ListenerWrapper = ({ stompClient, roomId }: { stompClient: Client, roomId: string }) => {
  const gameState = useGameStateStore((state) => state.gameState);
  const updateGameState = useGameStateStore((state) => state.updateGameState);
  const keyDownEventListener = (event: KeyboardEvent) => {
    console.log(event.code);
    const actualPlayer = gameState.playerState.thisPlayer;
    if (event.code === 'ArrowLeft') {
      const updatedPlayer = { [actualPlayer]: { x: gameState[actualPlayer].x - 10 } };
      updateGameState(updatedPlayer);
      stompClient.send(`/app/msg/${roomId}`, {}, JSON.stringify(updatedPlayer));
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDownEventListener);
    return () => {
      document.removeEventListener('keydown', keyDownEventListener);
    };
  });

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

export default ListenerWrapper;
