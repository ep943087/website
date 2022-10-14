import { MazeType } from "../types";
import Cell from "./Cell";
import FadingCell from "./FadingCell";
import FadingWall, { DirectionType } from "./FadingWall";
import Grid from "./Grid";

class Simulation {
  private grid: Grid = new Grid(0, 0);
  private cellLength: number = 18;
  private currentCell? : Cell = undefined;
  private directionIsLeft = false;
  private fadingWalls: FadingWall[] = [];
  private fadingCells: FadingCell[] = [];
  private generatingMaze: boolean = false;
  private sideWinderCellList: Cell[] = [];
  constructor(
    private canvas: HTMLCanvasElement, private mazeType: HTMLSelectElement,
    private instantSolution: HTMLInputElement,
  ) {}

  getFadingWalls() { return this.fadingWalls; }
  getFadingCells() { return this.fadingCells; }
  getGrid() { return this.grid; }
  getCellLength() { return this.cellLength; }
  getDimensions() {
    return {
      rows: this.grid.getRows(), cols: this.grid.getCols(), cellLength: this.cellLength,
    };
  }

  initialize = () => {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    const cols = Math.floor(this.canvas.width / this.cellLength)
    const rows = Math.floor(this.canvas.height / this.cellLength);
    this.grid = new Grid(rows, cols);
    this.grid.initialize();
    this.currentCell = this.grid.getMatrix()[0][0];
    this.fadingWalls = [];
    this.fadingCells = [];
    this.generatingMaze = true;

    switch (this.mazeType.value) {
      case MazeType.BinarySearchTree:
        this.intializeBinarySearchTreeAlgorithm();
        break;
      case MazeType.SideWinder:
        this.initializeSideWinderAlgorithm();
        break;
    }
  }

  intializeBinarySearchTreeAlgorithm() {
    this.directionIsLeft = false;
  }

  initializeSideWinderAlgorithm() {
    this.sideWinderCellList = [];
  }

  convertRowColToXY(row: number, col: number) {
    const { cellLength } = this.getDimensions();
    return {
      x: cellLength * col,
      y: cellLength * row,
    }
  }

  unlinkCell(cell: Cell, direction: DirectionType) {
    if (direction === DirectionType.Up) {
      cell.unlinkUp();
      this.fadingWalls.push(new FadingWall(cell.getRow(), cell.getCol(), this.cellLength, DirectionType.Up));
    } else if (direction === DirectionType.Down) {
      cell.unlinkDown();
      this.fadingWalls.push(new FadingWall(cell.getRow(), cell.getCol(), this.cellLength, DirectionType.Down));
    } else if (direction === DirectionType.Left) {
      cell.unlinkLeft();
      this.fadingWalls.push(new FadingWall(cell.getRow(), cell.getCol(), this.cellLength, DirectionType.Left));
    } else if (direction === DirectionType.Right) {
      cell.unlinkRight();
      this.fadingWalls.push(new FadingWall(cell.getRow(), cell.getCol(), this.cellLength, DirectionType.Right));
    }
  }

  update = () => {
    for (let i=this.fadingCells.length - 1;i>=0;i--) {
      this.fadingCells[i].update();
      if (this.fadingCells[i].isDead()) {
        this.fadingCells.splice(i, 1);
        i--;
      }
    }
    
    for (let i=this.fadingWalls.length - 1;i>=0;i--) {
      this.fadingWalls[i].update();
      if (this.fadingWalls[i].isDead()) {
        this.fadingWalls.splice(i, 1);
        i--;
      }
    }

    if (!this.generatingMaze) {
      return;
    }

    while (this.generatingMaze) {
      if (this.currentCell !== undefined) {
        this.fadingCells.push(new FadingCell(this.currentCell.getRow(), this.currentCell.getCol()));
      }
      switch (this.mazeType.value) {
        case MazeType.BinarySearchTree:
          this.updateBinarySearchTreeAlgorithm();
          break;
        case MazeType.SideWinder:
          this.updateSideWinderAlgorithm();
          break;
      }
      
      if (!this.instantSolution.checked) {
        break;
      }
    }
  };

  updateBinarySearchTreeAlgorithm() {
    if (this.currentCell === undefined) {
      this.generatingMaze = false;
      return;
    }

    if (this.currentCell !== undefined) {
      if (this.currentCell.upLinkExists() && this.currentCell.rightLinkExists()) {
        if (Math.random() < .5) {
          this.unlinkCell(this.currentCell, DirectionType.Right);
        } else {
          this.unlinkCell(this.currentCell, DirectionType.Up);
        }
      } else if (this.currentCell.rightLinkExists()) {
        this.unlinkCell(this.currentCell, DirectionType.Right);
      } else {
        this.unlinkCell(this.currentCell, DirectionType.Up);
      }
      if (!this.directionIsLeft && this.currentCell.rightLinkExists()) {
        this.currentCell = this.currentCell.getRightLink() ?? new Cell(0, 0);
      } else if (this.directionIsLeft && this.currentCell.leftLinkExists()) {
        this.currentCell = this.currentCell.getLeftLink() ?? new Cell(0, 0);
      } else {
        this.directionIsLeft = !this.directionIsLeft;
        const col = this.directionIsLeft ? this.grid.getCols() - 1 : 0;
        this.currentCell = this.currentCell.getRow() < this.grid.getRows() - 1 ? this.grid.getMatrix()[this.currentCell.getRow() + 1][col]
          : undefined;
      }
    }
  }

  randomSideWinderCell(): Cell {
    return this.sideWinderCellList[Math.floor(Math.random() * this.sideWinderCellList.length)];
  }

  updateSideWinderAlgorithm() {
    if (this.currentCell === undefined) {
      this.generatingMaze = false;
      return;
    }

    this.sideWinderCellList.push(this.currentCell);
    if (this.currentCell.getRow() === 0) {
      this.unlinkCell(this.currentCell, DirectionType.Right);
      if (this.currentCell.rightLinkExists()) {
        this.currentCell = this.currentCell.getRightLink();
      } else if (this.currentCell.getRow() + 1 < this.grid.getRows()) {
        this.sideWinderCellList = [];
        this.currentCell = this.grid.getMatrix()[this.currentCell.getRow() + 1][0];
      } else {
        this.currentCell = undefined;
      }
    } else if (Math.random() < .5 || !this.currentCell.getRightLink()) {
      this.unlinkCell(this.randomSideWinderCell(), DirectionType.Up);
      this.sideWinderCellList = [];
      if (this.currentCell.rightLinkExists()) {
        this.currentCell = this.currentCell.getRightLink();
      } else if (this.currentCell.getRow() + 1 < this.grid.getRows()) {
        this.currentCell = this.grid.getMatrix()[this.currentCell.getRow() + 1][0];
      } else {
        this.currentCell = undefined;
      }
    } else {
      this.unlinkCell(this.currentCell, DirectionType.Right);
      if (this.currentCell.rightLinkExists()) {
        this.currentCell = this.currentCell.getRightLink();
      } else if (this.currentCell.getRow() + 1 < this.grid.getRows()) {
        this.currentCell = this.grid.getMatrix()[this.currentCell.getRow() + 1][0];
      } else {
        this.currentCell = undefined;
      }
    }
  }
};

export default Simulation;