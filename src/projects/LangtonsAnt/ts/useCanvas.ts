import React, { useEffect, useState } from "react";
import Drawing from "./Drawing";
import Simulation from "./Simulation";
import { SimulationOptions, SimulationOptionsKeys } from "./types";

const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [mySimulation, setMySimulation] = useState<Simulation>({} as Simulation);
  const [options, setOptions] = useState<SimulationOptions>(Simulation.getDefaultOptions());

  const handleOptionChange = (key: SimulationOptionsKeys, value: string | string[] | number) => {
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

    canvas.onclick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      simulation.setStartPosition(x, y);
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