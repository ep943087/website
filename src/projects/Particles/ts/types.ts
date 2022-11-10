import { OptionType } from "../../../forms/Select";

export type SimulationOptionsKeys = 'editMode' | 'color' | 'penSize' | 'editType' | 'mouseSize';

export enum EditType {
  draw = '1',
  erase = '2',
  fill = '3',
};

export interface SimulationOptions {
  editMode: boolean;
  color: string;
  penSize: number;
  editType: EditType;
  mouseSize: string;
}

export const editTypes: OptionType[] = [
  { value: EditType.draw, label: 'Draw' },
  { value: EditType.erase, label: 'Erase' },
  { value: EditType.fill, label: 'Fill' },
];