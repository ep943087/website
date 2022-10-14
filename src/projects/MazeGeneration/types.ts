import { OptionType } from "../../forms/Select";

export enum MazeType {
  BinarySearchTree = '0',
  SideWinder = '1',
  AldousBroder = '2',
  Wilson = '3',
};

export enum DijkstraDisplayType {
  opacityByDistance = '0',
  cornerToCornerPath = '1',
  colorFul = '2',
  pathToMaxDistance = '3',
};

export const mazeTypes: OptionType[] = [
  { value: MazeType.BinarySearchTree, label: 'Binary Tree' },
  { value: MazeType.SideWinder, label : 'Side-Winder' },
  { value: MazeType.AldousBroder, label: 'Aldous-Broder' },
  { value: MazeType.Wilson, label: 'Wilson' },
];

export const dijkstraDisplayTypes: OptionType[] = [
  { value: DijkstraDisplayType.pathToMaxDistance, label: 'Path to Max Distance' },
  { value: DijkstraDisplayType.cornerToCornerPath, label: 'Corner-To-Corner Path' },
  { value: DijkstraDisplayType.opacityByDistance, label: 'Opacity by Distance' },
  { value: DijkstraDisplayType.colorFul, label: 'Colorful'},
];