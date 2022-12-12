export const simulationProjects: ProjectType[] = [
  {
    imageURL: '/path-finding-snake-game.png',
    linkURL: '/projects/snake-game-path-finding',
    externalLink: false,
    caption: 'Path Finding Snake',
  },
  {
    imageURL: '/langstons-ant.png',
    linkURL: '/projects/langtons-ant',
    externalLink: false,
    caption: 'Langton\'s Ant'
  },
  {
    imageURL: '/sorting.png',
    linkURL: 'https://ep943087.github.io/sorting_simulation/',
    externalLink: true,
    caption: 'Sorting Simulation',
  },
  {
    imageURL: '/maze-generation.png',
    linkURL: '/projects/maze-generation',
    externalLink: false,
    caption: 'Maze Generation',
  },
  {
    imageURL: '/particles.png',
    linkURL: '/projects/particles',
    externalLink: false,
    caption: 'Particles',
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
    linkURL: '/projects/tetris',
    externalLink: false,
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