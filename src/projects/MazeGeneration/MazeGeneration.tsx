import React, { createRef, useEffect } from "react";
import styled from "styled-components";
import { OptionType } from "../../forms/Select";
import Page from "../../Layout/Page";
import Typography from "../../utils/Typography";
import { dijkstraDisplayTypes, mazeTypes, SimulationOptionsKeys, speedTypes } from "./types";
import useCanvas from "./useCanvas";

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
  max-width: 800px;
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

const MazeGeneration = () => {

  const canvasRef = createRef<HTMLCanvasElement>();
  const { simulation, options, handleChange, handleRunButtonClicked, } = useCanvas(canvasRef);

  const renderSelectOption = (label: string, selectOptions: OptionType[], name: SimulationOptionsKeys) => (
    <SelectLabelContainer>
      <label>{label}</label>
      <SelectContainer value={options[name] as string} onChange={(e: React.FormEvent<HTMLSelectElement>) => handleChange(name, e.currentTarget.value)}>
        {selectOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </SelectContainer>
    </SelectLabelContainer>
  );

  const renderCheckBox = (label: string, name: SimulationOptionsKeys) => (
    <SelectLabelContainer>
      <label>{label}</label>
      <input onChange={(e: React.FormEvent<HTMLInputElement>) => {handleChange(name, !options[name])}} checked={options[name] as boolean} type="checkbox" />
    </SelectLabelContainer>
  );

  useEffect(() => {
    if (simulation.constructor.name !== 'Simulation') { return }
    const oldMazeType = simulation.getSimulationOptions().mazeType;
    simulation.setSimulationOptions(options);
    if (options.mazeType !== oldMazeType) {
      simulation.initialize();
    }
  }, [options, simulation]);

  return (
    <Page>
      <Typography variant="title" textAlign="center">Maze Generation</Typography>
      <MazeGenerationContainer>
        <CanvasWrapper>
          <CanvasContainer ref={canvasRef} className="snake-game" />
        </CanvasWrapper>
      </MazeGenerationContainer>
      <ControlsContainer>
        <ButtonContainer onClick={handleRunButtonClicked}>Run</ButtonContainer>
        {renderSelectOption('Maze Type', mazeTypes, 'mazeType')}
        {renderSelectOption('Speed', speedTypes, 'speed')}
        {renderCheckBox('Draw Fading Walls', 'drawFadingWalls')}
        {renderCheckBox('Draw Fading Cells', 'drawFadingCells')}
        {renderCheckBox('Draw Spanning Tree', 'drawSpanningTree')}
        {renderCheckBox('Instant Maze', 'instantMaze')}
        {renderCheckBox('Instant Dijkstra', 'instantDijkstra')}
        {renderCheckBox('Show Dijkstra\'s Algorithm','showDijkstraAlgorithm')}
        {renderSelectOption('Dijkstra Display', dijkstraDisplayTypes, 'dijkstraDisplay')}
      </ControlsContainer>
    </Page>
  );
};

export default MazeGeneration;