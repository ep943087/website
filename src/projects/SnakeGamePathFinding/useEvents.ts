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
    const updateInterval = setInterval(simulation.update, 50);

    window.addEventListener('resize', simulation.initialize);
    return () => {
      clearInterval(drawInterval);
      clearInterval(updateInterval);
      window.removeEventListener('resize', simulation.initialize);
    }
  }, [canvasRef]);

  return {

  };
}

export default useEvents;