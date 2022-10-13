import Select from "../../forms/Select";
import { SnakeGamePathFindingOptions, snakeTypeOptions } from "./types";

const SnakeGamePathFindingControls = (props: SnakePathFindingControlsProps) => {
  const handleChange = (option: string, newValue: string) => {
    props.setOptions({
      [option]: newValue,
      ...props.options,
    });
  };
  return (
    <div>
      <Select
        value={props.options.snakeType}
        options={snakeTypeOptions}
        onChange={(value: string) => handleChange('snakeType', value)}
        label="Snake Type"
      />
    </div>
  );
};

interface SnakePathFindingControlsProps {
  options: SnakeGamePathFindingOptions,
  setOptions: (options: SnakeGamePathFindingOptions) => void,
};

export default SnakeGamePathFindingControls;