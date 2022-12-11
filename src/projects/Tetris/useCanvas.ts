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
      e.preventDefault();
      if (e.key === 'a' || e.key === 'ArrowLeft') {
        if (current.canMoveLeft()) {
          current.moveLeft();
        }
      } else if (e.key === 'd' || e.key === 'ArrowRight') {
        if (current.canMoveRight()) {
          current.moveRight();
        }
      } else if (e.key === 's' || e.key === 'ArrowDown') {
        if (current.canMoveDown()) {
          current.moveDown();
          simulation.resetMoveDownDelay();
        }
      } else if (e.key === 'w' || e.key === 'ArrowUp') {
        while (current.canMoveDown()) {
          current.moveDown();
        }
        simulation.addCurrentCellToGrid();
      } else if (e.key === 'j' || e.key === 'x') {
        current.rotateLeft();
      } else if (e.key === 'k' || e.key === 'c') {
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