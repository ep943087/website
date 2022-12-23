import React, { useEffect } from "react";
import Drawing from "./Drawing";
import Simulation from "./Simulation";

const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const simulation = new Simulation(canvas);
    const drawing = new Drawing(simulation);

    canvas.onmousedown = (e: MouseEvent) => {
      e.preventDefault();
      simulation.handleJumpEvent();
    };

    canvas.onmouseout = canvas.onmouseup = (e: MouseEvent) => {
      e.preventDefault();
      simulation.handleStopJumpEvent();
    };

    canvas.ontouchstart = (e: TouchEvent) => {
      e.preventDefault();
      simulation.handleJumpEvent();
    };

    canvas.ontouchcancel = canvas.ontouchend = (e: TouchEvent) => {
      e.preventDefault();
      simulation.handleStopJumpEvent();
    };

    document.onkeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === ' ') {
        simulation.handleJumpEvent();
      }
    }

    document.onkeyup = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === ' ') {
        simulation.handleStopJumpEvent();
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