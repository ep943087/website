import { OptionType } from "../../forms/Select";

export enum MazeType {
  BinarySearchTree = '0',
  SideWinder = '1',
  AldousBroder = '2',
  Wilson = '3',
  HuntAndKill = '4',
  RecursiveBackTracking = '5',
  Prim = '6',
  Kruskal = '7',
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
  { value: MazeType.AldousBroder, label: 'Aldous-Broder\'s' },
  { value: MazeType.Wilson, label: 'Wilson\'s' },
  { value: MazeType.HuntAndKill, label: 'Hunt-and-Kill' },
  { value: MazeType.RecursiveBackTracking, label: 'Recursive Back-Tracking' },
  { value: MazeType.Prim, label: 'Prim\'s' },
  { value: MazeType.Kruskal, label: 'Kruskal\'s' },
];

export const dijkstraDisplayTypes: OptionType[] = [
  { value: DijkstraDisplayType.pathToMaxDistance, label: 'Path to Max Distance' },
  { value: DijkstraDisplayType.cornerToCornerPath, label: 'Corner-To-Corner Path' },
  { value: DijkstraDisplayType.opacityByDistance, label: 'Opacity by Distance' },
  { value: DijkstraDisplayType.colorFul, label: 'Colorful' },
];

export const speedTypes: OptionType[] = [
  { value: '1', label: '1x' },
  { value: '2', label: '2x' },
  { value: '3', label: '3x' },
  { value: '5', label: '5x' },
  { value: '10', label: '10x' },
  { value: '15', label: '15x' },
  { value: '20', label: '20x' },
];