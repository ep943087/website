import { useEffect } from "react";
import Drawing from "./ts/Drawing";
import Simulation from "./ts/Simulation";

const useEvents = (canvasRef: React.RefObject<HTMLCanvasElement>) => {

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const simulation = new Simulation(canvas);
    const drawing = new Drawing(canvas, simulation);
    const drawInterval = setInterval(drawing.draw);
    const updateInterval = setInterval(simulation.update, 20);

    const handleKeyDownEvent = (event: KeyboardEvent) => {
      const snake = simulation.getSnake();
      if (event.key === 'a') {
        snake.setDirectionLeft();
      } else if (event.key === 'd') {
        snake.setDirectionRight();
      } else if (event.key === 'w') {
        snake.setDirectionUp();
      } else if (event.key === 's') {
        snake.setDirectionDown();
      }
    }

    window.addEventListener('resize', simulation.initialize);
    document.addEventListener('keydown', handleKeyDownEvent);
    return () => {
      clearInterval(drawInterval);
      clearInterval(updateInterval);
      window.removeEventListener('resize', simulation.initialize);
      document.removeEventListener('keydown', handleKeyDownEvent);
    }
  }, [canvasRef]);

  return {

  };
}

export default useEvents;