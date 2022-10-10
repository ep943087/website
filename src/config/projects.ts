export const simulationProjects: ProjectType[] = [
  {
    imageURL: '/path-finding-snake-game.png',
    linkURL: '/projects/snake-game-path-finding',
    externalLink: false,
    caption: 'Path Finding Snake',
  },
  {
    imageURL: '/gravity.png',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/gravity',
    externalLink: true,
    caption: 'Gravity'
  },
  {
    imageURL: '/sorting.png',
    linkURL: 'https://ep943087.github.io/sorting_simulation/',
    externalLink: true,
    caption: 'Sorting Simulation',
  },
  {
    imageURL: '/maze-generation.png',
    linkURL: 'https://ep943087.github.io/maze-generation/',
    externalLink: true,
    caption: 'Maze Generation',
  },
  {
    imageURL: '/binary-search-tree.png',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/binary_tree/',
    externalLink: true,
    caption: 'Binary Tree',
  },
  {
    imageURL: '/path-finding.png',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/pathfinding/',
    externalLink: true,
    caption: 'Path Finding',
  },
];

export const gameProjects: ProjectType[] = [
  {
    imageURL: '/multiplayer-snake-game.png',
    linkURL: 'https://ep-snakegame.herokuapp.com/',
    externalLink: true,
    caption: 'Multiplayer Snake Game',
  },
  {
    imageURL: '/elias-nightmare-typing-game.png',
    linkURL: 'https://ep943087.github.io/typing-game/',
    externalLink: true,
    caption: 'Typing Game'
  },
  {
    imageURL: '/pac-man.png',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/pacman/',
    externalLink: true,
    caption: 'Pac-Man',
  },
  {
    imageURL: '/tetris.png',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/tetris/',
    externalLink: true,
    caption: 'Tetris',
  },
  {
    imageURL: '/minesweeper.png',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/minesweeper/',
    externalLink: true,
    caption: 'Minesweeper',
    darkText: true,
  },
];

export const mathProjects = [
  {
    imageURL: '/graphing-calculator.png',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/graphing/',
    externalLink: true,
    caption: 'Graphing Calculator',
    darkText: true,
  },
  {
    imageURL: '/polar-graphing.png',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/polar/',
    externalLink: true,
    caption: 'Polar Coordinates',
    darkText: true,
  },
  {
    imageURL: '/chaos-game.png',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/chaosgame/',
    externalLink: true,
    caption: 'Chaos Game',
  },
  {
    imageURL: '/sudoku-solver.png',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/sudoku/',
    externalLink: true,
    caption: 'Sudoku Solver',
    darkText: true,
  },
  {
    imageURL: '/logic-gates.png',
    linkURL: 'http://ada.cameron.edu/~ep943087/practice/logicGates/',
    externalLink: true,
    caption: 'Logic Gates',
    darkText: true,
  }
];

export interface ProjectType {
  imageURL: string,
  linkURL: string,
  externalLink: boolean,
  caption: string,
  darkText?: boolean,
};