import { Client } from 'stompjs';
import { PlayerState } from '@/app/game/game-config';
import { useGameStateStore } from '@/app/core/store/game-state.store';

export function ReadyButton({ stompClient, roomId }: { stompClient: Client, roomId: string }) {
  const updateThisPlayerReady = useGameStateStore((state) => state.updateThisPlayerReady);
  const isPlayerReady = useGameStateStore((state) => state.gameState.playerState?.isThisPlayerReady);

  const onReady = () => {
    updateThisPlayerReady();
    stompClient.send(`/app/count/${roomId}`, {}, PlayerState.ADD);
  };

  if (!isPlayerReady) {
    return (
      <button
        className="mx-auto bg-green-500 hover:bg-green-700 border-green-700 text-white font-bold py-2 px-4 border rounded w-48"
        onClick={onReady}
      >
        Ready
      </button>
    );
  }
}
