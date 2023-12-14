import { useEffect, useRef } from 'react';
import {
  BALL_DIAMETER,
  DEFAULT_RACKET_POSITION,
  GAME_AREA_HEIGHT,
  GAME_AREA_WIDTH,
  RACKET_HEIGHT,
  RACKET_WIDTH
} from '@/app/game/game-config';
import { useGameStateStore } from '@/app/core/store/game-state.store';
import { GameState } from '@/app/core/model/game-message';

const ball = new Image();
ball.src = '/ball.svg';

const GameArea = () => {
  const gameState: GameState = useGameStateStore((state) => state.gameState);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  console.log('rerender');

  const drawThisPlayer = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.fillRect(gameState?.player1?.x ?? DEFAULT_RACKET_POSITION, GAME_AREA_HEIGHT - RACKET_HEIGHT, RACKET_WIDTH, RACKET_HEIGHT);
    ctx.stroke();
  };

  const drawOpponentPlayer = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.fillRect(gameState?.player2?.x ?? DEFAULT_RACKET_POSITION, 0, RACKET_WIDTH, RACKET_HEIGHT);
    ctx.stroke();
  };

  const drawBall = (ctx: CanvasRenderingContext2D) => {
    ctx.drawImage(ball, GAME_AREA_WIDTH / 2 - BALL_DIAMETER / 2, GAME_AREA_HEIGHT / 2 - BALL_DIAMETER / 2, BALL_DIAMETER, BALL_DIAMETER);
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = GAME_AREA_WIDTH;
    canvas.height = GAME_AREA_HEIGHT;
    const ctx = canvas.getContext('2d')!;

    updateGame(ctx);
    const interval = setInterval(() => updateGame(ctx), 500);
    return () => clearInterval(interval);
  }, [gameState]);

  const clearGameArea = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, GAME_AREA_WIDTH, GAME_AREA_HEIGHT);
  };

  const updateGame = (ctx: CanvasRenderingContext2D) => {
    clearGameArea(ctx);
    drawThisPlayer(ctx);
    drawOpponentPlayer(ctx);
    drawBall(ctx);
  };

  return <canvas
    id="gameArea"
    className="border border-transparent rounded-md shadow-game-area"
    ref={canvasRef}
  />;
};

export default GameArea;
