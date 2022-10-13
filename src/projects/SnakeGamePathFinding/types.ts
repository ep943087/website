import { OptionType } from "../../forms/Select";

export const snakeTypeOptions: OptionType[] = [
  { value: 'green', label: 'Green' },
  { value: 'color-position', label: 'Color Based on Position' },
  { value: 'color-length', label: 'Color Based on Length' },
];

export interface SnakeGamePathFindingOptions {
  snakeType: 'green' | 'color-length' | 'color-position';
}