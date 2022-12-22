import React, { useEffect } from "react";
import Drawing from "./Drawing";
import Simulation from "./Simulation";

const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const simulation = new Simulation(canvas);
    const drawing = new Drawing(simulation);

    document.onkeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === ' ') {
        const sijalu = simulation.getSijalu();

        if (sijalu.getIsDead()) {
          simulation.reset();
          return;
        }

        if (!sijalu.getIsJumping()) {
          sijalu.setIsMouseDown(true);
        }
        sijalu.jump();
      }
    }

    document.onkeyup = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === ' ') {
        const sijalu = simulation.getSijalu();
        sijalu.setIsMouseDown(false);
      }
    }

    const updateInterval = setInterval(simulation.update, 10);
    const drawingInterval = setInterval(drawing.draw, 10);

    return () => {
      clearInterval(updateInterval);
      clearInterval(drawingInterval);
    };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useCanvas;