import { useEffect, useRef } from 'react';

const GameArea = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const ball = new Image();
    ball.src = '/ball.png';
    ball.onload = () => {
      ctx.drawImage(ball, 10, 10, 50, 50);
    };

  }, []);

  return <canvas
    id="gameArea"
    width="1000px"
    height="600px"
    className="border border-amber-50 rounded-md"
    ref={canvasRef}
  />;
};

export default GameArea;
