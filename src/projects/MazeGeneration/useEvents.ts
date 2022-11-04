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
  showDijkstraAlgoRef: React.RefObject<HTMLInputElement>,
  dijkstraDiplayRef: React.RefObject<HTMLSelectElement>,
  speedRef: React.RefObject<HTMLSelectElement>,
  drawSpanningTreeRef: React.RefObject<HTMLInputElement>,
  instantDijkstraRef: React.RefObject<HTMLInputElement>,
) => {
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const startButton = startButtonRef.current as HTMLButtonElement;
    const mazeType = mazeTypeRef.current as HTMLSelectElement;
    const drawFadingCells = drawFadingCellsRef.current as HTMLInputElement;
    const drawFadingWalls = drawFadingWallsRef.current as HTMLInputElement;
    const instantSolution = instantSolutionRef.current as HTMLInputElement;
    const showDijkstraAlgo = showDijkstraAlgoRef.current as HTMLInputElement;
    const dijkstraDiplay = dijkstraDiplayRef.current as HTMLSelectElement;
    const speed = speedRef.current as HTMLSelectElement;
    const drawSpanningTree = drawSpanningTreeRef.current as HTMLInputElement;
    const instantDijkstra = instantDijkstraRef.current as HTMLInputElement;

    drawFadingCells.checked = true;
    drawFadingWalls.checked = true;
    showDijkstraAlgo.checked = true;
    speed.value = '5';

    const simulation = new Simulation(canvas, mazeType, instantSolution, instantDijkstra);

    const drawing = new Drawing(canvas, simulation, drawFadingCells, drawFadingWalls, showDijkstraAlgo, dijkstraDiplay, drawSpanningTree);

    const drawingInterval = setInterval(drawing.draw, 0);
    const updateInterval = setInterval(() => {
      for (let i=0;i<parseFloat(speed.value);i++) {
        simulation.update();        
      }
    }, 0);

    const handleCanvasMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      drawing.setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    canvas.onmousemove = handleCanvasMouseMove;
    
    startButton.onclick = simulation.initialize;
    mazeType.onchange = simulation.initialize;

    setTimeout(simulation.initialize, 100);

    return () => {
      clearInterval(drawingInterval);
      clearInterval(updateInterval);
    }
  }, [
    canvasRef, startButtonRef, mazeTypeRef, drawFadingCellsRef,
    drawFadingWallsRef, instantSolutionRef, showDijkstraAlgoRef,
    dijkstraDiplayRef, speedRef, drawSpanningTreeRef, instantDijkstraRef,
  ]);
};

export default useEvents;