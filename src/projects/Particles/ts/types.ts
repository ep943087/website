import { OptionType } from "../../../forms/Select";

export type SimulationOptionsKeys = 'editMode' | 'color' | 'penSize' | 'editType'
  | 'mouseSize' | 'showFill' | 'accTowardsTarget' | 'accAwayFromMouse' | 'friction';

export enum EditType {
  draw = '1',
  erase = '2',
  fill = '3',
  fillDelete = '4',
};

export interface SimulationOptions {
  editMode: boolean;
  color: string;
  penSize: number;
  editType: EditType;
  mouseSize: number;
  showFill: boolean;
  accTowardsTarget: number;
  accAwayFromMouse: number;
  friction: number,
}

export const editTypes: OptionType[] = [
  { value: EditType.draw, label: 'Draw' },
  { value: EditType.erase, label: 'Erase' },
  { value: EditType.fill, label: 'Fill' },
  { value: EditType.fillDelete, label: 'Fill Erase' },
];