import GameArea from '@/app/game/game-area';
import { ReadyButton } from '@/app/game/ready-button';
import { Client } from 'stompjs';
import { useEffect } from 'react';
import { useGameStateStore } from '@/app/core/store/game-state.store';
import { Direction, moveRacket } from '@/app/core/engine/racket-engine';

const ListenerWrapper = ({ stompClient, roomId }: { stompClient: Client, roomId: string }) => {
  const gameState = useGameStateStore((state) => state.gameState);
  const updateGameState = useGameStateStore((state) => state.updateGameState);
  const keyDownEventListener = (event: KeyboardEvent) => {
    console.log(event.code);
    const actualPlayer = gameState.playerState.thisPlayer;
    switch (event.code) {
      case 'ArrowLeft': {
        moveRacket({ actualPlayer, stompClient, gameState, updateGameState, roomId, direction: Direction.LEFT });
        break;
      }
      case 'ArrowRight': {
        moveRacket({ actualPlayer, stompClient, gameState, updateGameState, roomId, direction: Direction.RIGHT });
        break;
      }
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
