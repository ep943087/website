import React, { useEffect, useState } from "react";
import Drawing from "./Drawing";
import Simulation from "./Simulation";
import { EditType, SimulationOptions } from "./types";

const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [mySimulation, setMySimulation] = useState<Simulation>({} as Simulation);
  const [options, setOptions] = useState<SimulationOptions>(Simulation.getDefaultOptions());

  const handleChange = (name: string, value: string | boolean) => {
    setOptions(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleClearButtonClicked = () => {
    mySimulation.clear();
  };

  const handleFileInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const files = evt.currentTarget.files;
    if (!files) {
      return;
    }
    const f = files[0];
    var reader = new FileReader();
    reader.onload = ((theFile) => (
      (e) => {
          if (e?.target?.result) {
            mySimulation.copyImage(e.target.result as string);
          }
        }
      ))(f);
    reader.readAsDataURL(f);
  };

  const copyImage = (img: string) => {
    mySimulation.copyImage(img);
  };

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;

    const simulation = new Simulation(canvas);
    const drawing = new Drawing(canvas, simulation);

    const simulationInterval = setInterval(simulation.update, 0);
    const drawingInterval = setInterval(drawing.draw, 0);

    setMySimulation(simulation);

    canvas.onmousedown = canvas.ontouchstart = () => {
      simulation.setIsMouseDown(true);

      if (simulation.getOptions().editMode && simulation.getIsMouseDown()) {
        simulation.penDraw();
      }
    };

    canvas.onmouseout = canvas.ontouchcancel = () => {
      simulation.setIsMouseDown(false);
    }

    canvas.onmouseup = canvas.ontouchend = () => {
      simulation.setIsMouseDown(false);
      const { editType, editMode } = simulation.getOptions();
      if (editMode && (editType === EditType.fill || editType === EditType.fillDelete)) {
        simulation.fill();
      }
    };

    canvas.onmousemove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      simulation.setMousePosition(
        e.clientX - rect.left,
        e.clientY - rect.top,
      );

      if (simulation.getOptions().editMode && simulation.getIsMouseDown()) {
        simulation.penDraw();
      }
    };

    canvas.ontouchmove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      simulation.setMousePosition(
        e.touches[0].clientX - rect.left,
        e.touches[0].clientY - rect.top,
      );

      if (simulation.getOptions().editMode && simulation.getIsMouseDown()) {
        simulation.penDraw();
      }
    }

    return () => {
      clearInterval(simulationInterval);
      clearInterval(drawingInterval);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(mySimulation).length === 0) { return; }
    mySimulation.setOptions(options);
  }, [options, mySimulation]);

  return {
    mySimulation,
    options,
    handleChange,
    handleClearButtonClicked,
    copyImage,
    handleFileInputChange,
  }
};

export default useCanvas;