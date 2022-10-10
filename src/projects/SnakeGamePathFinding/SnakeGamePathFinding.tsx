import { createRef } from "react";
import styled from "styled-components";
import Page from "../../Layout/Page";
import Typography from "../../utils/Typography";
import useEvents from "./useEvents";

const CanvasContainer = styled.canvas`
  width: 100%;
  height: 100%;
  max-height: calc(60vh);
  border: 1px solid var(--light-color);
  border-radius: 5px;
  transition: none;
  -webkit-transition: none;
  -o-transition: none;
  -moz-transition: none;
  -ms-transition: none;
`;

const CanavsWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 300px;
  transition: none;
  -webkit-transition: none;
  -o-transition: none;
  -moz-transition: none;
  -ms-transition: none;
`;

const SnakeGameContainer = styled.div`
  width: 100%;
  height: 100%;
  transition: none;
  -webkit-transition: none;
  -o-transition: none;
  -moz-transition: none;
  -ms-transition: none;
`;

const SnakeGamePathFinding = () => {

  const canvasRef = createRef<HTMLCanvasElement>();
  useEvents(canvasRef);

  return (
    <Page>
      <Typography variant="title" textAlign="center">Path Finding Snake</Typography>
      <SnakeGameContainer>
        <CanavsWrapper>
          <CanvasContainer ref={canvasRef} className="snake-game" />
        </CanavsWrapper>
      </SnakeGameContainer>
    </Page>
  );
};

export default SnakeGamePathFinding;