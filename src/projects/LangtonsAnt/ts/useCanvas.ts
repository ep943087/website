import React, { useEffect, useState } from "react";
import Drawing from "./Drawing";
import Simulation from "./Simulation";
import { SimulationOptions, SimulationOptionsKeys } from "./types";

const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [mySimulation, setMySimulation] = useState<Simulation>({} as Simulation);
  const [options, setOptions] = useState<SimulationOptions>(Simulation.getDefaultOptions());

  const handleOptionChange = (key: SimulationOptionsKeys, value: string | string[] | number | boolean) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (Object.keys(mySimulation).length === 0) { return; }
    mySimulation.setOptions(options);
  }, [options, mySimulation]);

  const handleResetClicked = () => {
    mySimulation.initialize();
  }

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const simulation = new Simulation(canvas);
    const drawing = new Drawing(simulation);

    const drawInterval = setInterval(drawing.draw, 0);
    const updateInterval = setInterval(simulation.update, 0);

    const getMouseXY = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    canvas.onmousedown = (e: MouseEvent) => {
      if (!simulation.getOptions().edit) { return; }
      const { x, y } = getMouseXY(e);
      const ant = simulation.findAntWithXY(x, y);
      if (ant) {
        simulation.setCurrentAnt(ant);
      }
    }

    canvas.onmousemove = (e: MouseEvent) => {
      const { x, y } = getMouseXY(e);
      if (simulation.getOptions().edit) {
        const ant = simulation.getCurrentAnt();
        if (ant) {
          ant.setXY(x, y);
        }
      }
    };

    canvas.onmouseup = canvas.onmouseout = (e: MouseEvent) => {
      simulation.setCurrentAnt(null);
    };

    setMySimulation(simulation);

    return () => {
      clearInterval(drawInterval);
      clearInterval(updateInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    simulation: mySimulation,
    handleResetClicked,
    options,
    handleOptionChange,
  };
};

export default useCanvas;