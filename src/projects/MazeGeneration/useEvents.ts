import React, { useEffect } from "react";
import Drawing from "./ts/Drawing";
import Simulation from "./ts/Simulation";

const useEvents = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  startButtonRef: React.RefObject<HTMLButtonElement>,
  mazeTypeRef: React.RefObject<HTMLSelectElement>,
  drawFadingCellsRef: React.RefObject<HTMLInputElement>,
  drawFadingWallsRef: React.RefObject<HTMLInputElement>,
  instantSolutionRef: React.RefObject<HTMLInputElement>,
) => {
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const startButton = startButtonRef.current as HTMLButtonElement;
    const mazeType = mazeTypeRef.current as HTMLSelectElement;
    const drawFadingCells = drawFadingCellsRef.current as HTMLInputElement;
    const drawFadingWalls = drawFadingWallsRef.current as HTMLInputElement;
    const instantSolution = instantSolutionRef.current as HTMLInputElement;

    drawFadingCells.checked = true;
    drawFadingWalls.checked = true;

    const simulation = new Simulation(canvas, mazeType, instantSolution);

    const drawing = new Drawing(canvas, simulation, drawFadingCells, drawFadingWalls);

    const drawingInterval = setInterval(drawing.draw, 50);
    const updateInterval = setInterval(simulation.update, 10);
    
    startButton.onclick = simulation.initialize;
    mazeType.onchange = simulation.initialize;

    window.addEventListener('resize', simulation.initialize);

    setTimeout(simulation.initialize, 100);

    return () => {
      clearInterval(drawingInterval);
      clearInterval(updateInterval);
      window.removeEventListener('resize', simulation.update);
    }
  }, [canvasRef, startButtonRef, mazeTypeRef]);
};

export default useEvents;