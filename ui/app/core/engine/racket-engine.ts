import { GameState, ThisPlayer } from '@/app/core/model/game.model';
import { Client } from 'stompjs';
import { GAME_AREA_WIDTH, RACKET_SPEED, RACKET_WIDTH } from '@/app/game/game-config';

export const moveRacket = (moveRacket: MoveRacket) => {
  const { actualPlayer, gameState, updateGameState, stompClient, roomId, direction } = moveRacket;
  let newPosition = calculatePosition({ direction, actualPlayer, gameState });
  const updatedPlayer = { [actualPlayer]: { x: newPosition } };
  updateGameState(updatedPlayer);
  stompClient.send(`/app/msg/${roomId}`, {}, JSON.stringify(updatedPlayer));
};

const calculatePosition = ({ direction, actualPlayer, gameState }: {
  direction: Direction,
  actualPlayer: ThisPlayer,
  gameState: GameState
}) => {
  switch (direction) {
    case Direction.LEFT: {
      return gameState[actualPlayer].x >= 0 ? gameState[actualPlayer].x - RACKET_SPEED : gameState[actualPlayer].x;
    }
    case Direction.RIGHT: {
      return gameState[actualPlayer].x <= GAME_AREA_WIDTH - RACKET_WIDTH ? gameState[actualPlayer].x + RACKET_SPEED : gameState[actualPlayer].x;
    }
  }
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
