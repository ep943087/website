export const simulationProjects: ProjectType[] = [
  {
    imageURL: '',
    linkURL: 'https://ep943087.github.io/typing-game/',
    externalLink: true,
    caption: 'Typing Game'
  },
  {
    imageURL: '',
    linkURL: 'https://ep943087.github.io/sorting_simulation/',
    externalLink: true,
    caption: 'Sorting Simulation',
  },
  {
    imageURL: '',
    linkURL: 'https://ep943087.github.io/maze-generation/',
    externalLink: true,
    caption: 'Maze Generation',
  },
  {
    imageURL: '',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/binary_tree/',
    externalLink: true,
    caption: 'Binary Tree',
  },
  {
    imageURL: '',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/pathfinding/',
    externalLink: true,
    caption: 'Path Finding',
  },
];

export const gameProjects: ProjectType[] = [
  {
    imageURL: '',
    linkURL: 'https://ep-snakegame.herokuapp.com/',
    externalLink: true,
    caption: 'Multiplayer Snake Game',
  },
  {
    imageURL: '',
    linkURL: 'https://ep943087.github.io/typing-game/',
    externalLink: true,
    caption: 'Typing Game'
  },
  {
    imageURL: '',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/pacman/',
    externalLink: true,
    caption: 'Pac-Man',
  },
  {
    imageURL: '',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/tetris/',
    externalLink: true,
    caption: 'Tetris',
  },
  {
    imageURL: '',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/minesweeper/',
    externalLink: true,
    caption: 'Minesweeper',
  },
];

export const mathProjects = [
  {
    imageURL: '',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/graphing/',
    externalLink: true,
    caption: 'Graphing Calculator'
  },
  {
    imageURL: '',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/polar/',
    externalLink: true,
    caption: 'Polar Coordinates',
  },
  {
    imageURL: '',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/chaosgame/',
    externalLink: true,
    caption: 'Chaos Game',
  },
  {
    imageURL: '',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/sudoku/',
    externalLink: true,
    caption: 'Sudoku Solver',
  }
];

export interface ProjectType {
  imageURL: string,
  linkURL: string,
  externalLink: boolean,
  caption: string,
};