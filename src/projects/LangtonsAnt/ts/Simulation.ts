import Cell from "./Cell";
import { Directions } from "../../SnakeGamePathFinding/ts/Snake";
import { ColorPatterns, SimulationOptions, SimulationOptionsKeys, SpeedOptions } from "./types";

class Simulation {
  private grid: Cell[][] = [];
  private rows: number = 0;
  private cols: number = 0;
  private ant: Cell = new Cell(0, 0);
  private antDirection: Directions = Directions.DOWN;
  private hueIndex = 0;
  private options: SimulationOptions = Simulation.getDefaultOptions();

  constructor(private canvas: HTMLCanvasElement) {
    setTimeout(() => this.initialize(), 100);
  }

  public static getDefaultOptions(): SimulationOptions {
    return {
      turnPattern: 'RL',
      startDirection: Directions.DOWN,
      colors: ColorPatterns,
      cellWidth: 5,
      speed: 2,
    };
  }

  getCanvas() { return this.canvas; }
  getGrid() { return this.grid; }
  getOptions() { return this.options; }
  getCellWidth() { return this.options.cellWidth; }
  getSpeed() { return SpeedOptions[this.options.speed]; }

  setOptions(options: SimulationOptions) {

    // get key different
    const keyDifference = Object.keys(options).find((key: string) =>
      options[key as SimulationOptionsKeys] !== this.options[key as SimulationOptionsKeys]) as SimulationOptionsKeys;

    if (keyDifference === 'colors') {
      const indexChanged = options.colors.findIndex((_: string, index: number) => (
        options.colors[index] !== this.options.colors[index]
      ));

      const oldColor = this.options.colors[indexChanged];
      const newColor = options.colors[indexChanged];

      for (let i=0;i<this.rows;i++) {
        for (let j=0;j<this.cols;j++) {
          if (this.grid[i][j].getColor() === oldColor) {
            this.grid[i][j].setColor(newColor);
          }
        }
      }
    }

    this.options = options;
    if (keyDifference === 'turnPattern' || keyDifference === 'cellWidth') {
      this.initialize();
    }
  }
  
  setOption(option: SimulationOptionsKeys, value: string) {
    this.options = {
      ...this.options,
      [option]: value,
    };
    this.initialize();
  }

  initialize(startCell?: Cell) {
    const cellWidth = this.getCellWidth();
    this.grid = [];
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.rows = ~~(this.canvas.height / cellWidth);
    this.cols = ~~(this.canvas.width / cellWidth);

    for (let i=0;i<this.rows;i++) {
      const gridRow: Cell[] = [];
      for (let j=0;j<this.cols;j++) {
        const cell = new Cell(i, j);
        gridRow.push(cell);
      }
      this.grid.push(gridRow);
    }
    this.ant = startCell ?? this.grid[~~(this.rows/2)][~~(this.cols/2)];
    this.antDirection = this.options.startDirection;
  }

  convertRowColToXY(row: number, col: number) {
    const cellWidth = this.getCellWidth();
    return {
      x: col * cellWidth,
      y: row * cellWidth,
    };
  }

  convertXYToRowCol(x: number, y: number) {
    const cellWidth = this.getCellWidth();
    return {
      row: ~~(y / cellWidth),
      col: ~~(x / cellWidth),
    };
  };

  setStartPosition(x: number, y: number) {
    const { row, col } = this.convertXYToRowCol(x, y);
    this.initialize(this.grid[row][col]);
  }

  getGridCell(row: number, col: number): Cell {
    let r = row;
    r = r < 0 ? this.rows-1 : r;
    r = r >= this.rows ? 0 : r;
    let c = col;
    c = c < 0 ? this.cols-1 : c;
    c = c >= this.cols ? 0 : c;
    return this.grid[r][c];
  }

  getNextBackWardCell() {
    const row = this.ant.getRow();
    const col = this.ant.getCol();
    switch (this.antDirection) {
      case Directions.UP:
        this.antDirection = Directions.DOWN;
        return this.getGridCell(row+1, col);
      case Directions.DOWN:
        this.antDirection = Directions.UP;
        return this.getGridCell(row-1, col);
      case Directions.RIGHT:
        this.antDirection = Directions.LEFT;
        return this.getGridCell(row, col-1);
      case Directions.LEFT:
        this.antDirection = Directions.RIGHT;
        return this.getGridCell(row, col+1);
    }
  }

  getNextForwardCell() {
    const row = this.ant.getRow();
    const col = this.ant.getCol();
    switch (this.antDirection) {
      case Directions.UP:
        return this.getGridCell(row-1, col);
      case Directions.DOWN:
        return this.getGridCell(row+1, col);
      case Directions.RIGHT:
        return this.getGridCell(row, col+1);
      case Directions.LEFT:
        return this.getGridCell(row, col-1);
    }
  }

  getNextRightCell() {
    const row = this.ant.getRow();
    const col = this.ant.getCol();
    switch (this.antDirection) {
      case Directions.UP:
        this.antDirection = Directions.RIGHT;
        return this.getGridCell(row, col+1);
      case Directions.DOWN:
        this.antDirection = Directions.LEFT;
        return this.getGridCell(row, col-1);
      case Directions.RIGHT:
        this.antDirection = Directions.DOWN;
        return this.getGridCell(row+1, col);
      case Directions.LEFT:
        this.antDirection = Directions.UP;
        return this.getGridCell(row-1, col);
    }
  }

  getNextLeftCell() {
    const row = this.ant.getRow();
    const col = this.ant.getCol();

    switch (this.antDirection) {
      case Directions.UP:
        this.antDirection = Directions.LEFT;
        return this.getGridCell(row, col-1);
      case Directions.DOWN:
        this.antDirection = Directions.RIGHT;
        return this.getGridCell(row, col+1);
      case Directions.RIGHT:
        this.antDirection = Directions.UP;
        return this.getGridCell(row-1, col);
      case Directions.LEFT:
        this.antDirection = Directions.DOWN;
        return this.getGridCell(row+1, col);
    }
  }

  getNextCell(turn: string) {
    switch (turn) {
      case 'L': return this.getNextLeftCell();
      case 'R': return this.getNextRightCell();
      case 'F': return this.getNextForwardCell();
      case 'B': return this.getNextBackWardCell();
      default: return this.getNextForwardCell();
    }
  }

  updateIteration() {
    const currentIndex = this.options.colors.findIndex(color => color === this.ant.getColor());
    const nextColorIndex = (currentIndex + 1) % this.options.turnPattern.length;
    this.ant.setColor(this.options.colors[nextColorIndex]);
    this.ant = this.getNextCell(this.options.turnPattern[currentIndex]);
  }

  getHSLColor() {
    const hue = ~~this.hueIndex;
    this.hueIndex = (this.hueIndex + .015);
    if (this.hueIndex > 360) {
      this.hueIndex = 0;
    }
    return `hsl(${hue}, 50%, 50%)`;
  }

  update = () => {
    if (this.grid.length === 0) { return; }
    for (let i=0;i<this.getSpeed();i++) {
      this.updateIteration();
    }
  }
}

export default Simulation;