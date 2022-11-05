import React, { useEffect, useState } from "react";
import Drawing from "./ts/Drawing";
import Simulation from "./ts/Simulation";
import { SimulationOptions } from "./types";

const useCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
) => {
  const [mySimulation, setSimulation] = useState<Simulation>({} as Simulation);
  const [options, setOptions] = useState<SimulationOptions>(Simulation.getInitialSimulationOptions);

  const handleRunButtonClicked = () => {
    if (mySimulation.constructor.name !== 'Simulation') {
      return;
    }
    mySimulation.initialize();
  };

  const handleChange = (name: string, value: string | boolean) => {
    setOptions(prevState => ({
      ...prevState,
      [name]: value, 
    }))
  };

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;

    const simulation = new Simulation(canvas);
    setSimulation(simulation);

    const drawing = new Drawing(canvas, simulation);

    const drawingInterval = setInterval(drawing.draw, 0);
    const updateInterval = setInterval(() => {
      for (let i=0;i<parseFloat(simulation.getSimulationOptions().speed);i++) {
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

    const handleCanvasTouch = (event: TouchEvent) => {
      event.preventDefault();
      const rect = canvas.getBoundingClientRect();
      drawing.setMousePosition({
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
      });
    }

    canvas.onmousemove = handleCanvasMouseMove;
    canvas.ontouchstart = canvas.ontouchmove = handleCanvasTouch;

    return () => {
      clearInterval(drawingInterval);
      clearInterval(updateInterval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    simulation: mySimulation,
    options,
    handleChange,
    handleRunButtonClicked,
  };
};

export default useCanvas;