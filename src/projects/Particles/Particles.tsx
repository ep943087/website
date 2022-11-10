import React, { createRef } from "react";
import styled from "styled-components";
import { OptionType } from "../../forms/Select";
import Page from "../../Layout/Page";
import Button from "../../utils/Button";
import Typography from "../../utils/Typography";
import { editTypes, SimulationOptionsKeys } from "./ts/types";
import useCanvas from "./ts/useCanvas";

const CanvasWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CanvasContainer = styled.canvas`
  border-radius: 5px;
  width: 800px;
  height: 600px;
  margin: 0 auto;
  align-self: center;
  justify-self: center;
`;

const CanvasControls = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  margin: 10px 0;
  > * {
    margin: 10px 0;
  }
`;

const SelectOptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SelectContainer = styled.select`
  color: black;
  padding: 5px;
  > option {
    color: inherit;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Particles = () => {
  
  const canvasRef = createRef<HTMLCanvasElement>();
  const {
    options,
    handleChange,
    handleClearButtonClicked,
    copySpongebogImage,
  } = useCanvas(canvasRef);

  const renderSlider = (name: SimulationOptionsKeys, label: string, min: number, max: number) => {
    return (
      <SelectOptionContainer>
        <label>{label}</label>
        <input type="range" min={min} max={max} value={options[name] as string} onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(name, e.currentTarget.value)} />
      </SelectOptionContainer>
    );
  };

  const renderSelect = (name: SimulationOptionsKeys, label: string, selectOptions: OptionType[]) => {
    return (
      <SelectOptionContainer>
        <label>{label}</label>
        <SelectContainer
          value={options[name]?.toString() ?? ''}
          onChange={(e: React.FormEvent<HTMLSelectElement>) => handleChange(name, e.currentTarget.value)}
        >
          {selectOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </SelectContainer>
      </SelectOptionContainer>
    );
  };

  const renderCheckBox = (name: SimulationOptionsKeys, label: string) => {
    return (
      <SelectOptionContainer>
        <label>{label}</label>
        <input
          onChange={() => handleChange(name, !options[name])}
          type="checkbox" checked={options[name] as boolean}
        />
      </SelectOptionContainer>
    )
  }

  return (
    <Page>
      <Typography variant="title" textAlign="center">Particles</Typography>
      <CanvasWrapper>
        <CanvasContainer ref={canvasRef} />
        <CanvasControls>
          {renderCheckBox('editMode', 'Edit Mode')}
          {!options.editMode && (
            renderSlider('mouseSize', 'Mouse Size', 1, 30)
          )}
          {options.editMode && (
            <>
              <SelectOptionContainer>
                <label>Color</label>
                <input type="color" value={options.color} onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange('color', e.currentTarget.value)} />
              </SelectOptionContainer>
              {renderSlider('penSize', 'Pen Size', 1, 20)}
              {renderSelect('editType', 'Edit Type', editTypes)}
              <ButtonsContainer>
                <Button label="Clear" onClick={handleClearButtonClicked} />
                <Button label="Spongebob" onClick={copySpongebogImage} />
              </ButtonsContainer>
            </>
          )}
        </CanvasControls>
      </CanvasWrapper>
    </Page>
  );
};

export default Particles;