import React, { createRef } from "react";
import styled from "styled-components";
import Page from "../../Layout/Page";
import Button from "../../utils/Button";
import Typography from "../../utils/Typography";
import Simulation from "./ts/Simulation";
import { EditType, editTypes, SimulationOptionsKeys } from "./ts/types";
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
    copyImage,
    handleFileInputChange,
  } = useCanvas(canvasRef);

  const renderSlider = (name: SimulationOptionsKeys, label: string, min: number, max: number) => {
    return (
      <SelectOptionContainer>
        <label>{label}</label>
        <input type="range" min={min} max={max} value={options[name] as string} onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(name, e.currentTarget.value)} />
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
            <>
              {renderSlider('mouseSize', 'Mouse Size', 1, 30)}
              {/* {renderSlider('accTowardsTarget', 'Acc Towards Target', 1, 10)} */}
              {renderSlider('accAwayFromMouse', 'Acc Away From Mouse', 1, 10)}
              {renderSlider('friction', 'Friction', 1, 15)}
            </>
          )}
          {options.editMode && (
            <>
              <ButtonsContainer>
                {editTypes.map(option => (
                  <span key={option.value}>
                    <input
                      onChange={() => handleChange('editType', option.value)}
                      type="radio"
                      value={option.value}
                      checked={option.value === options.editType}
                    />
                    <span onClick={() => handleChange('editType', option.value)}>
                      &nbsp;{option.label}
                    </span>
                  </span>
                ))}
              </ButtonsContainer>
              {[EditType.draw, EditType.erase].includes(options.editType) && renderSlider('penSize', 'Pen Size', 1, 40)}
              {[EditType.draw, EditType.fill].includes(options.editType)
                && (
                <SelectOptionContainer>
                  <label>Color</label>
                  <input type="color" value={options.color} onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange('color', e.currentTarget.value)} />
                </SelectOptionContainer>
                )
              }
              <SelectOptionContainer>
                <label>Image</label>
                <input type="file" onChange={handleFileInputChange} />
              </SelectOptionContainer>
              {renderCheckBox('showFill', 'Show Fill')}
              <ButtonsContainer>
                <Button label="Clear" color="red" onClick={handleClearButtonClicked} />
                <Button label="Spongebob" onClick={() => copyImage(Simulation.spongeBobImage)} />
                <Button label="Portrait" onClick={() => copyImage(Simulation.selfPortrait)} />
              </ButtonsContainer>
            </>
          )}
        </CanvasControls>
      </CanvasWrapper>
    </Page>
  );
};

export default Particles;