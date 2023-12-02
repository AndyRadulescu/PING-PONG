export interface BallVector {
  x: string;
  y: string;
}

export interface PlayerRacket {
  x: number;
}

export interface GameState {
  roomId: String;
  taskId: String;
  ballVector: BallVector;
  player1: PlayerRacket;
  player2: PlayerRacket;
}

export interface PlayerState{
  taskId: String
  playerNumber: number
}
