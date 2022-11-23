import React, { useEffect, useState } from "react";
import Drawing from "./Drawing";
import Simulation from "./Simulation";
import { SimulationOptions, SimulationOptionsKeys, TurnPatterns } from "./types";

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

  const getCurrentPatternIndex = () => TurnPatterns.findIndex(pattern => pattern.value === options.turnPattern);

  const handlePreviousPatternClicked = () => {
    const currentPatternIndex = getCurrentPatternIndex();
    const previousPatternIndex = currentPatternIndex > 0 ? currentPatternIndex - 1 : TurnPatterns.length - 1;
    handleOptionChange('turnPattern', TurnPatterns[previousPatternIndex].value);
  };

  const handleNextPatternClicked = () => {
    const currentPatternIndex = getCurrentPatternIndex();
    const nextPatternIndex = currentPatternIndex < TurnPatterns.length-1 ? currentPatternIndex + 1 : 0;
    handleOptionChange('turnPattern', TurnPatterns[nextPatternIndex].value);
  };

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

    const getTouchXY = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    };

    canvas.onmousedown = (e: MouseEvent) => {
      const mouse = getMouseXY(e);
      simulation.handleMouseDown(mouse);
    }

    canvas.ontouchstart = (e: TouchEvent) => {
      e.preventDefault();
      const mouse = getTouchXY(e);
      simulation.handleMouseDown(mouse);
    };

    canvas.onmousemove = (e: MouseEvent) => {
      e.preventDefault();
      const mouse = getMouseXY(e);
      simulation.handleMouseMove(mouse);
    };

    canvas.ontouchmove = (e: TouchEvent) => {
      e.preventDefault();
      const mouse = getTouchXY(e);
      simulation.handleMouseMove(mouse);
    };

    canvas.onmouseup = (e: MouseEvent) => {
      e.preventDefault();
      const mouse = getMouseXY(e);
      simulation.handleMouseUp(mouse);
    };

    canvas.ontouchend = (e: TouchEvent) => {
      e.preventDefault();
      const mouse = getTouchXY(e);
      simulation.handleMouseUp(mouse);
    };

    canvas.ontouchcancel = (e: TouchEvent) => {
      e.preventDefault();
      simulation.handleMouseOut();
    };

    canvas.onmouseout = (e: MouseEvent) => {
      e.preventDefault();
      simulation.handleMouseOut();
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
    handleNextPatternClicked,
    handlePreviousPatternClicked,
  };
};

export default useCanvas;