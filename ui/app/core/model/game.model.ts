export interface BallVector {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}

export interface PlayerRacket {
  x: number;
}

export enum ThisPlayer {
  PLAYER1 = 'player1', PLAYER2 = 'player2'
}

export interface GameState {
  roomId: String;
  ballVector: BallVector;
  player1: PlayerRacket;
  player2: PlayerRacket;
  playerState: PlayerState;
  isGameFinished: boolean;
}

export interface PlayerState {
  thisPlayer: ThisPlayer;
  playerReadyCount: number;
  isThisPlayerReady: boolean;
  isStarted: boolean;
}

export interface UpdatePlayerState {
  player1?: PlayerRacket,
  player2?: PlayerRacket,
}
