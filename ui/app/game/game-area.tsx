import { useEffect, useRef } from 'react';
import { BALL_DIAMETER, GAME_AREA_HEIGHT, GAME_AREA_WIDTH, RACKET_HEIGHT, RACKET_WIDTH } from '@/app/game/game-config';

const GameArea = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawThisPlayer = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.fillRect(375, GAME_AREA_HEIGHT - RACKET_HEIGHT, RACKET_WIDTH, RACKET_HEIGHT);
    ctx.stroke();
  };

  const drawOpponentPlayer = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.fillRect(375, 0, RACKET_WIDTH, RACKET_HEIGHT);
    ctx.stroke();
  };

  const drawBall = (ctx: CanvasRenderingContext2D) => {
    const ball = new Image();
    ball.src = '/ball.svg';
    ball.onload = () => {
      ctx.drawImage(ball, GAME_AREA_WIDTH / 2 - BALL_DIAMETER / 2, GAME_AREA_HEIGHT / 2 - BALL_DIAMETER / 2, BALL_DIAMETER, BALL_DIAMETER);
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = GAME_AREA_WIDTH;
    canvas.height = GAME_AREA_HEIGHT;
    const ctx = canvas.getContext('2d')!;
    drawThisPlayer(ctx);
    drawOpponentPlayer(ctx);
    drawBall(ctx);
  }, []);

  return <canvas
    id="gameArea"
    className="border border-transparent rounded-md shadow-game-area"
    ref={canvasRef}
  />;
};

export default GameArea;
