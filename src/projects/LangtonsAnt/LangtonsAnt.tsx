import { createRef } from "react";
import styled from "styled-components";
import Page from "../../Layout/Page";
import Button from "../../utils/Button";
import Typography from "../../utils/Typography";
import useCanvas from "./ts/useCanvas";

const CanvasWrapperStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  > * {
    margin-top: 10px;
  }
`;

const CanvasStyle = styled.canvas`
  width: 1000px;
  height: 600px;
  margin: 0 auto;
  
  &:hover {
    cursor: pointer;
  }
`;

// const FieldLabelStyle = styled.div`
//   display: flex;
//   width: 100%;
//   max-width: 250px;
//   justify-content: space-between;
// `;

const LangtonsAnt = () => {

  const canvasRef = createRef<HTMLCanvasElement>();
  const { handleResetClicked} = useCanvas(canvasRef);

  return (
    <Page>
      <Typography textAlign="center" variant="title">Langton&apos;s Ant</Typography>
      <CanvasWrapperStyle>
        <CanvasStyle ref={canvasRef} />
        <Button onClick={handleResetClicked} label="Reset" />
      </CanvasWrapperStyle>
    </Page>
  );
};

export default LangtonsAnt;