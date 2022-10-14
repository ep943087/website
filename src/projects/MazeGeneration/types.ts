import { OptionType } from "../../forms/Select";

export enum MazeType {
  BinarySearchTree = '0',
  SideWinder = '1',
};

export const mazeTypes: OptionType[] = [
  { value: MazeType.BinarySearchTree, label: 'Binary-Search Tree' },
  { value: MazeType.SideWinder, label : 'Side-Winder'}
];