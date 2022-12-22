import { useRef } from "react";
import styled from "styled-components";
import Page from "../../Layout/Page";
import Typography from "../../utils/Typography";
import useCanvas from "./ts/useCanvas";

const CanvasStyle = styled.canvas`
  width: 100%;
  max-width: 1200px;
  height: 300px;
  margin: 0 auto;
`;

const SijaluRun = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvas(canvasRef);

  return (
    <Page flexColumn>
      <Typography variant="title" textAlign="center">Sijalu Run</Typography>
      <CanvasStyle ref={canvasRef} /> 
    </Page>
  );
};

export default SijaluRun;