import React, { createRef } from "react";
import styled from "styled-components";
import { OptionType } from "../../forms/Select";
import Page from "../../Layout/Page";
import Typography from "../../utils/Typography";
import { mazeTypes } from "./types";
import useEvents from "./useEvents";

const CanvasContainer = styled.canvas`
  width: 100%;
  height: 100%;
  border: 1px solid var(--light-color);
  border-radius: 5px;
`;

const CanvasWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 500px;
`;

const MazeGenerationContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const SelectContainer = styled.select`
  color: black;
  padding: 5px;
  border-radius: 5px;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  option {
    color: black;
  }
  margin-top: var(--container-padding);
  * {
    margin-top: var(--container-padding);
  }
`;

const SelectLabelContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.button`
  display: block;
  background-color: green;
  color: white;
  padding: 10px;
  width: 75px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
  margin: 0 auto;
`;

const renderSelectOption = (label: string, options: OptionType[], selectRef: React.RefObject<HTMLSelectElement>) => (
  <SelectLabelContainer>
    <label>{label}</label>
    <SelectContainer ref={selectRef}>
      {options.map(option => (
        <option value={option.value}>{option.label}</option>
      ))}
    </SelectContainer>
  </SelectLabelContainer>
);

const renderCheckBox = (label: string, checkBoxRef: React.RefObject<HTMLInputElement>) => (
  <SelectLabelContainer>
    <label>{label}</label>
    <input ref={checkBoxRef} type="checkbox" />
  </SelectLabelContainer>
);

const MazeGeneration = () => {
  const canvasRef = createRef<HTMLCanvasElement>();
  const startButtonRef = createRef<HTMLButtonElement>();
  const mazeTypeRef = createRef<HTMLSelectElement>();
  const drawFadingWallsRef = createRef<HTMLInputElement>();
  const drawFadingCellsRef = createRef<HTMLInputElement>();
  const instantSolutionRef = createRef<HTMLInputElement>();

  useEvents(canvasRef, startButtonRef, mazeTypeRef, drawFadingCellsRef, drawFadingWallsRef, instantSolutionRef);
  return (
    <Page>
      <Typography variant="title" textAlign="center">Maze Generation</Typography>
      <MazeGenerationContainer>
        <CanvasWrapper>
          <CanvasContainer ref={canvasRef} className="snake-game" />
        </CanvasWrapper>
      </MazeGenerationContainer>
      <ControlsContainer>
        <ButtonContainer ref={startButtonRef}>Start</ButtonContainer>
        {renderSelectOption('Maze Type', mazeTypes, mazeTypeRef)}
        {renderCheckBox('Draw Fading Walls', drawFadingWallsRef)}
        {renderCheckBox('Draw Fading Cells', drawFadingCellsRef)}
        {renderCheckBox('Instant Solution', instantSolutionRef)}
      </ControlsContainer>
    </Page>
  );
};

export default MazeGeneration;