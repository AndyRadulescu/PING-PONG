export interface BallVector {
  x: string;
  y: string;
}

export interface PlayerRacket {
  x: number;
}

export enum ThisPlayer {
  PLAYER1 = 'player1', PLAYER2 = 'player2'
}

export interface GameState {
  roomId: String;
  taskId: String;
  ballVector: BallVector;
  player1: PlayerRacket;
  player2: PlayerRacket;
  playerState: PlayerState;
}

export interface PlayerState {
  thisPlayer: ThisPlayer;
  playerReadyCount: number;
  isThisPlayerReady: boolean;
  isStarted: boolean;
}
