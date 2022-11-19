import { OptionType } from "../../../forms/Select";
import CanvasTools from "../../../utils/CanvasTools";
import { Directions } from "../../SnakeGamePathFinding/ts/Snake";


export const TurnPatterns: OptionType[] = [
  { value: 'RL', label: 'RL' },
  { value: 'RLR', label: 'RLR' },
  { value: 'RRLL', label: 'RRLL' },
  { value: 'RRLR', label: 'RRLR' },
  { value: 'RLLR', label: 'RLLR' },
  { value: 'FRBL', label: 'FRBL' },
  { value: 'FFRRBBLL', label: 'FFRRBBLL' },
  { value: 'RLRRRRRLLR', label: 'RLRRRRRLLR' },
  { value: 'RLLLRRLRLLL', label: 'RLLLRRLRLLL' },
  { value: 'RLRLRRLRRRRR', label: 'RLRLRRLRRRRR' },
  { value: 'RRLLLRLLLRLL', label: 'RRLLLRLLLRLL' },
  { value: 'RRLLLRLLLR', label: 'RRLLLRLLLR' },
  { value: 'RRLRLLRRRRLL', label: 'RRLRLLRRRRLL' },
  { value: 'RRRLRRLRRR', label: 'RRRLRRLRRR' },
  { value: 'RRLRLLRLRR', label: 'RRLRLLRLRR' },
  { value: 'RRLLLRRRLRR', label: 'RRLLLRRRLRR' },
  { value: 'LLRLRRLLL', label: 'LLRLRRLLL' },
  { value: 'RRLLLRLRL', label: 'RRLLLRLRL' },
  { value: 'RLLRLRRLLRL', label: 'RLLRLRRLLRL' },
  { value: 'LRRRRLLLRRR', label: 'LRRRRLLLRRR' },
  { value: 'LLRLRLL', label: 'LLRLRLL' },
  { value: 'LRRRRRLLR', label: 'LRRRRRLLR' },
  { value: 'RLRRLLRLLLLL', label: 'RLRRLLRLLLLL' },
  { value: 'RLRLLRLRRRRR', label: 'RLRLLRLRRRRR' },
  { value: 'RLRLRLLLLLL', label: 'RLRLRLLLLLL' },
  { value: 'RLRLRLLLLLLL', label: 'RLRLRLLLLLLL' },
  { value: 'RLRLRLLLLLRL', label: 'RLRLRLLLLLRL' },
  { value: 'RLLRLRRRRRLL' , label: 'RLLRLRRRRRLL' },
  { value: 'RRRLRLLRRRRR', label: 'RRRLRLLRRRRR' },
  { value: 'RLLRLRRRRR', label: 'RLLRLRRRRR' },
  { value: 'RLLLLRRRLLL', label: 'RLLLLRRRLLL' },
  { value: 'RLLLLLLLRRL', label: 'RLLLLLLLRRL' },
  { value: 'RLLLLLLRLRLL', label: 'RLLLLLLRLRLL' },
  { value: 'RLLLLLLRRL', label: 'RLLLLLLRRL' },
  { value: 'RLLLLLLRRLRR', label: 'RLLLLLLRRLRR' },
  { value: 'RLLLLLLRRRRL', label: 'RLLLLLLRRRRL' },
  { value: 'RLLLLLRLRLL', label: 'RLLLLLRLRLL' },
  { value: 'RLLLLLRRLLRR', label: 'RLLLLLRRLLRR' },
  { value: 'RLLLLLRRL', label: 'RLLLLLRRL' },
  { value: 'RLLLRRRLRLRR', label: 'RLLLRRRLRLRR' },
  { value: 'RLLLLLRRRRL', label: 'RLLLLLRRRRL' },
  { value: 'RLLLRRRLRLL', label: 'RLLLRRRLRLL' },
  { value: 'RLLLLRRL', label: 'RLLLLRRL' },
  { value: 'RLLLRRL', label: 'RLLLRRL' },
  { value: 'RLLLRRRLRLLR', label: 'RLLLRRRLRLLR' },
  { value: 'RRLLLRLLLLL', label: 'RRLLLRLLLLL' },
  { value: 'RRLRRRLLLLLR', label: 'RRLRRRLLLLLR' },
  { value: 'RLLRRLRRRRRR', label: 'RLLRRLRRRRRR' },
  { value: 'RRLRRRLLLLL', label: 'RRLRRRLLLLL' },
  { value: 'RLRLRRRRRRL', label: 'RLRLRRRRRRL' },
  { value: 'RRLRRRLLLLLL', label: 'RRLRRRLLLLLL' },
  { value: 'RLLRRRLRRRRR', label: 'RLLRRRLRRRRR' },
  { value: 'RLRLRRRRRRRL', label: 'RLRLRRRRRRRL' },
  { value: 'LLLLLLLRRRLR', label: 'LLLLLLLRRRLR' },
];

export const ColorPatterns: string[] = Array(100).fill(0).map(
  (_, index) => index === 0 ? '' : CanvasTools.generateRandomColor()
);

export const StartDirectionOptions: {value: Directions, label: string}[] = [
  { value: Directions.UP, label: 'Up' },
];

export const SpeedOptions: number[] = [
  1,
  10,
  100,
  1000,
  5000,
  10000,
  15000,
  20000,
  30000,
  50000,
  100000,
];

export type SimulationOptionsKeys = 'turnPattern' | 'startDirection' | 'colors' | 'cellWidth' | 'speed';

export interface SimulationOptions {
  turnPattern: string;
  startDirection: Directions;
  colors: string[],
  cellWidth: number,
  speed: number,
};