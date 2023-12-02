export const GAME_AREA_WIDTH = 1000;
export const GAME_AREA_HEIGHT = 600;
export const BALL_DIAMETER = 30;
export const RACKET_WIDTH = 250;
export const RACKET_HEIGHT = 25;

export const DEFAULT_RACKET_POSITION = /*GAME_AREA_WIDTH / 2 - RACKET_WIDTH / 2*/ 0;
export const MAX_BALL_RANGE_X = GAME_AREA_WIDTH - BALL_DIAMETER;
export const MAX_BALL_RANGE_Y = GAME_AREA_HEIGHT - BALL_DIAMETER;

export enum PlayerState {
  ADD = 'add',
  REMOVE = 'remove'
}
