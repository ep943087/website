import React, { useEffect } from "react";
import Drawing from "./ts/Drawing";
import Simulation from "./ts/Simulation";

const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const simulation = new Simulation(canvas);
    const drawing = new Drawing(simulation);

    const drawInterval = setInterval(drawing.draw, 0);
    const updateInterval = setInterval(simulation.update, 50);

    document.onkeydown = (e: KeyboardEvent) => {
      const current = simulation.getCurrentTetromino();

      if (simulation.getGameOver()) {
        return;
      }
      
      if (e.key === 'a') {
        if (current.canMoveLeft()) {
          current.moveLeft();
        }
      } else if (e.key === 'd') {
        if (current.canMoveRight()) {
          current.moveRight();
        }
      } else if (e.key === 's') {
        if (current.canMoveDown()) {
          current.moveDown();
          simulation.resetMoveDownDelay();
        }
      } else if (e.key === 'w') {
        while (current.canMoveDown()) {
          current.moveDown();
        }
        simulation.addCurrentCellToGrid();
      } else if (e.key === 'j') {
        current.rotateLeft();
      } else if (e.key === 'k') {
        current.rotateRight();
      }
    };

    return () => {
      clearInterval(drawInterval);
      clearInterval(updateInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {

  };
};

export default useCanvas;