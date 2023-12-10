import { Client } from 'stompjs';
import { PlayerState } from '@/app/game/game-config';

export function ReadyButton({ stompClient, roomId }: { stompClient: Client, roomId: string }) {

  const onReady = () => {
    stompClient.send(`/app/count/${roomId}`, {}, PlayerState.ADD);
  };

  return (
    <button
      className="mx-auto bg-green-500 hover:bg-green-700 border-green-700 text-white font-bold py-2 px-4 border rounded w-48"
      onClick={onReady}
      disabled
    >
      Ready
    </button>
  );
}
