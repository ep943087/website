import Cell from "./Cell";
import { Directions } from "../../SnakeGamePathFinding/ts/Snake";

class Simulation {
  private grid: Cell[][] = [];
  private rows: number = 0;
  private cols: number = 0;
  private ant: Cell = new Cell(0, 0);
  private antDirection: Directions = Directions.DOWN;
  private hueIndex = 0;
  public static readonly CELL_WIDTH = 2;

  constructor(private canvas: HTMLCanvasElement) {
    setTimeout(() => this.initialize(), 100);
  }

  getCanvas() { return this.canvas; }
  getGrid() { return this.grid; }
  
  initialize(startCell?: Cell) {
    this.grid = [];
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.rows = ~~(this.canvas.height / Simulation.CELL_WIDTH);
    this.cols = ~~(this.canvas.width / Simulation.CELL_WIDTH);

    for (let i=0;i<this.rows;i++) {
      const gridRow: Cell[] = [];
      for (let j=0;j<this.cols;j++) {
        const cell = new Cell(i, j);
        gridRow.push(cell);
      }
      this.grid.push(gridRow);
    }
    this.ant = startCell ?? this.grid[~~(this.rows/2)][~~(this.cols/2)];
  }

  convertRowColToXY(row: number, col: number) {
    return {
      x: col * Simulation.CELL_WIDTH,
      y: row * Simulation.CELL_WIDTH,
    };
  }

  convertXYToRowCol(x: number, y: number) {
    return {
      row: ~~(y / Simulation.CELL_WIDTH),
      col: ~~(x / Simulation.CELL_WIDTH),
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

  updateIteration() {
    if (this.ant.hasColor()) {
      this.ant.unsetColor();
    } else {
      this.ant.setColor(this.getHSLColor());
    }
    this.ant = this.ant.hasColor() ? this.getNextLeftCell() : this.getNextRightCell();
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
    for (let i=0;i<1000;i++) {
      this.updateIteration();
    }
  }
}

export default Simulation;