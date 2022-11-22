import React, { createRef } from "react";
import styled from "styled-components";
import { OptionType } from "../../forms/Select";
import Page from "../../Layout/Page";
import Button from "../../utils/Button";
import Typography from "../../utils/Typography";
import { SimulationOptionsKeys, SpeedOptions, TurnPatterns } from "./ts/types";
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

const FieldLabelStyle = styled.div`
  display: flex;
  width: 100%;
  max-width: 250px;
  justify-content: space-between;
`;

const SelectStyle = styled.select`
  color: black;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 10px;

  > option {
    color: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 10px;
  }
`;

const ColorWrapperStyle = styled.div`
  display: flex;
  width: 100%;
  max-width: 300px;
  flex-wrap: wrap;
  justify-content: start;
`;

const LangtonsAnt = () => {

  const canvasRef = createRef<HTMLCanvasElement>();
  const { handleResetClicked, options, handleOptionChange, simulation } = useCanvas(canvasRef);

  const handleColorChange = (newColor: string, index: number) => {
    const newColors = [...options.colors];
    newColors[index] = newColor;
    handleOptionChange('colors', newColors);
  };

  const renderSelect = (name: SimulationOptionsKeys, label: string, selectOptions: OptionType[], isNumber: boolean = false) => (
    <FieldLabelStyle>
      <label>{label}</label>
      <SelectStyle value={options[name] as number} onChange={(e: React.FormEvent<HTMLSelectElement>) => (
        handleOptionChange(name, isNumber ? parseInt(e.currentTarget.value) : e.currentTarget.value)
      )}>
        {selectOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </SelectStyle>
    </FieldLabelStyle>
  );

  const renderSlider = (name: SimulationOptionsKeys, label: string, min: number, max: number) => (
    <FieldLabelStyle>
      <label>{label}</label>
      <input type="range" value={options[name] as number} min={min} max={max} onChange={(e: React.FormEvent<HTMLInputElement>) => (
        handleOptionChange(name, parseInt(e.currentTarget.value))
      )} />
    </FieldLabelStyle>
  );

  const renderCheckbox = (name: SimulationOptionsKeys, label: String) => (
    <FieldLabelStyle>
      <label>{label}</label>
      <input type="checkbox" checked={options[name] as boolean} onChange={() => handleOptionChange(name, !options[name])} />
    </FieldLabelStyle>
  );

  return (
    <Page>
      <Typography textAlign="center" variant="title">Langton&apos;s Ant</Typography>
      <CanvasWrapperStyle>
        <CanvasStyle ref={canvasRef} />
        <div>
          {!options.edit && <Button onClick={handleResetClicked} label="Reset" />}
          {options.edit && <Button onClick={() => simulation.addAnt()} label="Add Ant" />}
        </div>
        {renderCheckbox('edit', 'Edit')}
        {renderCheckbox('wrap', 'Wrap')}
        {renderSelect('turnPattern', 'Turn Pattern', TurnPatterns)}
        {renderSlider('speed', 'Speed', 0, SpeedOptions.length-1)}
        {renderSlider('cellWidth', 'Cell Width', 2, 8)}
        <ColorWrapperStyle>
          {options.turnPattern.split('').map((_, index) => {
            if (index === 0) {
              return null;
            } else {
              return (
                <input key={index} type="color" value={options.colors[index]} onChange={(e: React.FormEvent<HTMLInputElement>) => (
                  handleColorChange(e.currentTarget.value, index)
                )} />
              )
            }
          })}
        </ColorWrapperStyle>
      </CanvasWrapperStyle>
    </Page>
  );
};

export default LangtonsAnt;