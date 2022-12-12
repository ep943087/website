import Page from "../../Layout/Page";
import Typography from "../../utils/Typography";
import styled from "styled-components";
import { useRef } from "react";
import useCanvas from "./useCanvas";

const CanvasStyle = styled.canvas`
  width: 100%;
  height: 500px;
  max-width: 500px;
  margin: 0 auto;
`;

const Tetris = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvas(canvasRef);

  return (
    <Page flexColumn>
      <Typography variant="title" textAlign="center">Tetris</Typography>
      <CanvasStyle ref={canvasRef} />
    </Page>
  );
};

export default Tetris;