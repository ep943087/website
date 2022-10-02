import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import CanvasDrawing from './BackgroundCanvas/CanvasDrawing';
import CanvasSimulation from './BackgroundCanvas/CanvasSimulation';

const CanvasContainer = styled.canvas`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const BackgroundCanvas = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const canvasSimulation = new CanvasSimulation(canvas);
    const canvasDrawing = new CanvasDrawing(canvas, canvasSimulation);
    const drawInterval = setInterval(canvasDrawing.draw, 30);
    const simulationInterval = setInterval(canvasSimulation.update, 10);
    setTimeout(canvasSimulation.handleWindowResize, 2);
    window.addEventListener('resize', canvasSimulation.handleWindowResize);
    return () => {
      window.removeEventListener('resize', canvasSimulation.handleWindowResize);
      clearInterval(drawInterval);
      clearInterval(simulationInterval);
    }
  }, []);

  return (
    <CanvasContainer ref={canvasRef} />
  )
};

export default BackgroundCanvas;