import React, { createRef } from "react";
import styled from "styled-components";
import { OptionType } from "../../forms/Select";
import Page from "../../Layout/Page";
import Typography from "../../utils/Typography";
import { snakeTypeOptions } from "./types";
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

const CanvasWrapper = styled.div`
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

const SelectContainer = styled.select`
  color: black;
  padding: 5px;
  border-radius: 5px;
  option {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 5px;
    color: black;
  }
`;

const ControlsContainer = styled.div`
  display: block;
`;

const SelectLabelContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
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

const SnakeGamePathFinding = () => {

  const canvasRef = createRef<HTMLCanvasElement>();
  const snakeTypeRef = createRef<HTMLSelectElement>();

  useEvents(canvasRef, snakeTypeRef);

  return (
    <Page>
      <Typography variant="title" textAlign="center">Path Finding Snake</Typography>
      <ControlsContainer>
        {renderSelectOption('Snake Type', snakeTypeOptions, snakeTypeRef)}
      </ControlsContainer>
      <SnakeGameContainer>
        <CanvasWrapper>
          <CanvasContainer ref={canvasRef} className="snake-game" />
        </CanvasWrapper>
      </SnakeGameContainer>
    </Page>
  );
};

export default SnakeGamePathFinding;