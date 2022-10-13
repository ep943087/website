import React, { useEffect } from "react";
import Drawing from "./ts/Drawing";
import Simulation from "./ts/Simulation";

const useEvents = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  snakeTypeRef: React.RefObject<HTMLSelectElement>,
) => {

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const snakeType = snakeTypeRef.current as HTMLSelectElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const simulation = new Simulation(canvas);
    const drawing = new Drawing(canvas, simulation, snakeType);
    const drawInterval = setInterval(drawing.draw);
    const updateInterval = setInterval(simulation.update, 50);

    window.addEventListener('resize', simulation.initialize);
    return () => {
      clearInterval(drawInterval);
      clearInterval(updateInterval);
      window.removeEventListener('resize', simulation.initialize);
    }
  }, [canvasRef, snakeTypeRef]);

  return {

  };
}

export default useEvents;