import { createRef, useEffect } from "react";
import Drawing from "./ts/Drawing";
import Simulation from "./ts/Simulation";
import styled from 'styled-components';

const CanvasStyle = styled.canvas`
  :hover {
    cursor: pointer;
  }
`;

const ParticalImage = () => {

  const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const simulation = new Simulation(canvas);
    const drawing = new Drawing(canvas, simulation);

    const drawingInterval = setInterval(drawing.draw, 100);
    const updateInterval = setInterval(simulation.update, 0);
    canvas.onclick = simulation.initialize;

    return () => {
      clearInterval(drawingInterval);
      clearInterval(updateInterval);
    }
  }, [canvasRef]);

  return (
    <CanvasStyle ref={canvasRef} />
  );
};

export default ParticalImage;