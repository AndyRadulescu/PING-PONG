import { GameState, ThisPlayer } from '@/app/core/model/game-message';
import { Client } from 'stompjs';
import { RACKET_SPEED } from '@/app/game/game-config';

export const moveRacket = (moveRacket: MoveRacket) => {
  const { actualPlayer, gameState, updateGameState, stompClient, roomId, direction } = moveRacket;
  let newPosition = direction === Direction.LEFT ? gameState[actualPlayer].x - RACKET_SPEED : gameState[actualPlayer].x + RACKET_SPEED;
  const updatedPlayer = { [actualPlayer]: { x: newPosition } };
  updateGameState(updatedPlayer);
  stompClient.send(`/app/msg/${roomId}`, {}, JSON.stringify(updatedPlayer));
};

export type MoveRacket = {
  actualPlayer: ThisPlayer,
  gameState: GameState,
  updateGameState: (gameState: Partial<GameState>) => void,
  stompClient: Client,
  roomId: string,
  direction: Direction
}

export enum Direction {LEFT = 'left', RIGHT = 'right'}
