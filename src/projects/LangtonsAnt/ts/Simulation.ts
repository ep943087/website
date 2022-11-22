import Cell from "./Cell";
import { Directions } from "../../SnakeGamePathFinding/ts/Snake";
import { ColorPatterns, SimulationOptions, SimulationOptionsKeys, SpeedOptions } from "./types";
import Ant from "./Ant";

class Simulation {
  private grid: Cell[][] = [];
  private rows: number = 0;
  private cols: number = 0;
  private ants: Ant[] = [];
  private hueIndex = 0;
  private options: SimulationOptions = Simulation.getDefaultOptions();
  private currentAnt: Ant | null = null;
  public static readonly ANT_RADIUS: number = 15;

  constructor(private canvas: HTMLCanvasElement) {
    setTimeout(() => this.initialize(), 100);
  }

  public static getDefaultOptions(): SimulationOptions {
    return {
      turnPattern: 'RL',
      colors: ColorPatterns,
      cellWidth: 5,
      speed: 2,
      edit: false,
      wrap: false,
    };
  }

  getCanvas() { return this.canvas; }
  getGrid() { return this.grid; }
  getOptions() { return this.options; }
  getCellWidth() { return this.options.cellWidth; }
  getSpeed() { return SpeedOptions[this.options.speed]; }
  getAnts() { return this.ants; }
  getCurrentAnt() { return this.currentAnt; }
  setCurrentAnt(ant: Ant | null) { this.currentAnt = ant; }

  findAntWithXY(x: number, y: number) {
    return this.ants.find(ant => {
      const { x: antX, y: antY } = ant.getXY();
      const distance = Math.sqrt(Math.pow(antX - x, 2) + Math.pow(antY - y, 2));
      return distance < Simulation.ANT_RADIUS;
    }) ?? null;
  }

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
    if (keyDifference === 'turnPattern' || keyDifference === 'cellWidth' || keyDifference === 'edit') {
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

  initialize() {
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

    if (this.ants.length === 0) {
      this.ants.push(new Ant(this.canvas.width/2, this.canvas.height/2));
    }

    this.ants.forEach(ant => {
      const { x, y } = ant.getXY();
      const { row, col } = this.convertXYToRowCol(x, y);
      ant.setCell(this.grid[row][col]);
      ant.setDirection(ant.getStartDirection());
    });
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

  getGridCell(row: number, col: number): Cell | null {
    let r = row;
    r = r < 0 ? this.rows-1 : r;
    r = r >= this.rows ? 0 : r;
    let c = col;
    c = c < 0 ? this.cols-1 : c;
    c = c >= this.cols ? 0 : c;
    if (!this.options.wrap && (r !== row || c !== col)) {
      return null;
    }
    return this.grid[r][c];
  }

  getNextBackWardCell(ant: Ant) {
    const cell = ant.getCell();
    if (!cell) return cell;
    const row = cell.getRow();
    const col = cell.getCol();

    switch (ant.getDirection()) {
      case Directions.UP:
        ant.setDirection(Directions.DOWN);
        return this.getGridCell(row+1, col);
      case Directions.DOWN:
        ant.setDirection(Directions.UP);
        return this.getGridCell(row-1, col);
      case Directions.RIGHT:
        ant.setDirection(Directions.LEFT);
        return this.getGridCell(row, col-1);
      case Directions.LEFT:
        ant.setDirection(Directions.RIGHT);
        return this.getGridCell(row, col+1);
    }
  }

  getNextForwardCell(ant: Ant) {
    const cell = ant.getCell();
    if (!cell) return cell;
    const row = cell.getRow();
    const col = cell.getCol();
    
    switch (ant.getDirection()) {
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

  getNextRightCell(ant: Ant) {
    const cell = ant.getCell();
    if (!cell) return cell;
    const row = cell.getRow();
    const col = cell.getCol();
    switch (ant.getDirection()) {
      case Directions.UP:
        ant.setDirection(Directions.RIGHT);
        return this.getGridCell(row, col+1);
      case Directions.DOWN:
        ant.setDirection(Directions.LEFT);
        return this.getGridCell(row, col-1);
      case Directions.RIGHT:
        ant.setDirection(Directions.DOWN);
        return this.getGridCell(row+1, col);
      case Directions.LEFT:
        ant.setDirection(Directions.UP);
        return this.getGridCell(row-1, col);
    }
  }

  getNextLeftCell(ant: Ant) {
    const cell = ant.getCell();
    if (!cell) return cell;
    const row = cell.getRow();
    const col = cell.getCol();

    switch (ant.getDirection()) {
      case Directions.UP:
        ant.setDirection(Directions.LEFT)
        return this.getGridCell(row, col-1);
      case Directions.DOWN:
        ant.setDirection(Directions.RIGHT);
        return this.getGridCell(row, col+1);
      case Directions.RIGHT:
        ant.setDirection(Directions.UP)
        return this.getGridCell(row-1, col);
      case Directions.LEFT:
        ant.setDirection(Directions.DOWN);
        return this.getGridCell(row+1, col);
    }
  }

  getNextCell(ant: Ant, turn: string) {
    switch (turn) {
      case 'L': return this.getNextLeftCell(ant);
      case 'R': return this.getNextRightCell(ant);
      case 'F': return this.getNextForwardCell(ant);
      case 'B': return this.getNextBackWardCell(ant);
      default: return this.getNextForwardCell(ant);
    }
  }

  updateIteration() {
    this.ants.forEach(ant => {
      const cell = ant.getCell();
      if (cell) {
        const currentIndex = this.options.colors.findIndex(color => color === cell.getColor());
        const nextColorIndex = (currentIndex + 1) % this.options.turnPattern.length;
        cell.setColor(this.options.colors[nextColorIndex]);
        const next = this.getNextCell(ant, this.options.turnPattern[currentIndex]);
        ant.setCell(next);
      }
    });
  }

  addAnt() {
    const [x, y] = [Math.random()*this.canvas.width, Math.random()*this.canvas.height];
    this.ants.push(new Ant(x, y));
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
    if (this.grid.length === 0 || this.options.edit) { return; }
    for (let i=0;i<this.getSpeed();i++) {
      this.updateIteration();
    }
  }
}

export default Simulation;