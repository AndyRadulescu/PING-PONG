import { useEffect, useRef } from 'react';
import { BALL_DIAMETER, GAME_AREA_HEIGHT, GAME_AREA_WIDTH } from '@/app/game/game-config';

const GameArea = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = GAME_AREA_WIDTH;
    canvas.height = GAME_AREA_HEIGHT;
    const ctx = canvas.getContext('2d')!;

    const ball = new Image();
    ball.src = '/ball.svg';
    ball.onload = () => {
      ctx.drawImage(ball, 0, 0, BALL_DIAMETER, BALL_DIAMETER);
    };
  }, []);

  return <canvas
    id="gameArea"
    className="border border-amber-50 rounded-md"
    ref={canvasRef}
  />;
};

export default GameArea;
