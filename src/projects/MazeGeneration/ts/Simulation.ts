import { MazeType } from "../types";
import Cell from "./Cell";
import DijkstraCell from "./DijkstraCell";
import FadingCell from "./FadingCell";
import FadingWall, { DirectionType } from "./FadingWall";
import Grid from "./Grid";

class Simulation {
  private grid: Grid = new Grid(0, 0);
  private dijkstraGrid: DijkstraCell[][] = [];
  private cellLength: number = 18;
  private currentCell? : Cell = undefined;
  private directionIsLeft = false;
  private fadingWalls: FadingWall[] = [];
  private fadingCells: FadingCell[] = [];
  private generatingMaze: boolean = false;
  private sideWinderCellList: Cell[] = [];
  private isMazeComplete: boolean = false;
  private unvisitedCells: Cell[] = [];

  constructor(
    private canvas: HTMLCanvasElement, private mazeType: HTMLSelectElement,
    private instantSolution: HTMLInputElement,
  ) {}

  getFadingWalls() { return this.fadingWalls; }
  getFadingCells() { return this.fadingCells; }
  getGrid() { return this.grid; }
  getDijkstraGrid() {return this.dijkstraGrid; }
  getCellLength() { return this.cellLength; }
  getIsMazeComplete() { return this.isMazeComplete; }
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
    this.dijkstraGrid = DijkstraCell.getGrid(rows, cols);
    this.isMazeComplete = false;

    switch (this.mazeType.value) {
      case MazeType.BinarySearchTree:
        this.intializeBinarySearchTreeAlgorithm();
        break;
      case MazeType.SideWinder:
        this.initializeSideWinderAlgorithm();
        break;
      case MazeType.AldousBroder:
        this.intializeAldousBroderAlgorithm();
        break;
    }
  }

  intializeBinarySearchTreeAlgorithm() {
    this.directionIsLeft = false;
  }

  initializeSideWinderAlgorithm() {
    this.sideWinderCellList = [];
  }

  intializeAldousBroderAlgorithm() {
    this.unvisitedCells = this.grid.getMatrix().flat();
  }

  convertRowColToXY(row: number, col: number) {
    const { cellLength } = this.getDimensions();
    return {
      x: cellLength * col,
      y: cellLength * row,
      cX: cellLength * col + cellLength / 2,
      cY: cellLength * row + cellLength / 2,
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
      if (!this.updateAlgorithm()) {
        this.isMazeComplete = true;
        this.performDijkstraAlgorithm();
      }
      if (!this.instantSolution.checked) {
        break;
      }
    }
  };

  performDijkstraAlgorithm() {
    const startCell: DijkstraCell = this.dijkstraGrid[Math.floor(0)][Math.floor(0)];
    startCell.setDistance(0);

    const openList: DijkstraCell[] = this.dijkstraGrid.flat();

    while (openList.length > 0) {
      let minDistanceIndex = 0;

      for (let i=1;i<openList.length;i++) {
        if (openList[i].getDistance() < openList[minDistanceIndex].getDistance()) {
          minDistanceIndex = i;
        }
      }

      const currentCell = openList[minDistanceIndex];
      openList.splice(minDistanceIndex, 1);

      const neighbors = [];
      const currentGridCell = this.grid.getMatrix()[currentCell.getRow()][currentCell.getCol()];

      if (!currentGridCell.isRightLink()) {
        const rightLink = currentGridCell.getRightNeighbor();
        if (rightLink)
          neighbors.push(this.dijkstraGrid[rightLink?.getRow() ?? 0][rightLink?.getCol() ?? 0]);
      }
      if (!currentGridCell.isLeftLink()) {
        const leftLink = currentGridCell.getLeftNeighbor();
        if (leftLink)
          neighbors.push(this.dijkstraGrid[leftLink?.getRow() ?? 0][leftLink?.getCol() ?? 0]);
      }
      if (!currentGridCell.isUpLink()) {
        const upLink = currentGridCell.getUpNeighbor();
        if (upLink)
          neighbors.push(this.dijkstraGrid[upLink?.getRow() ?? 0][upLink?.getCol() ?? 0]);
      }
      if (!currentGridCell.isDownLink()) {
        const downLink = currentGridCell.getDownNeighbor();
        if (downLink)
          neighbors.push(this.dijkstraGrid[downLink?.getRow() ?? 0][downLink?.getCol() ?? 0]);
      }

      const neighborDistance = currentCell.getDistance() + 1;
      neighbors.forEach(neighbor => {
        if (neighborDistance < neighbor.getDistance()) {
          neighbor.setDistance(neighborDistance);
          neighbor.setPrevious(currentCell);
        }
      });
    }
  }

  updateAlgorithm() {
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
      case MazeType.AldousBroder:
        this.updateAldousBroderAlgorithm();
        break;
    }

    return this.generatingMaze;
  }

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
        this.currentCell = this.currentCell.getRightNeighbor() ?? new Cell(0, 0);
      } else if (this.directionIsLeft && this.currentCell.leftLinkExists()) {
        this.currentCell = this.currentCell.getLeftNeighbor() ?? new Cell(0, 0);
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
        this.currentCell = this.currentCell.getRightNeighbor();
      } else if (this.currentCell.getRow() + 1 < this.grid.getRows()) {
        this.sideWinderCellList = [];
        this.currentCell = this.grid.getMatrix()[this.currentCell.getRow() + 1][0];
      } else {
        this.currentCell = undefined;
      }
    } else if (Math.random() < .5 || !this.currentCell.getRightNeighbor()) {
      this.unlinkCell(this.randomSideWinderCell(), DirectionType.Up);
      this.sideWinderCellList = [];
      if (this.currentCell.rightLinkExists()) {
        this.currentCell = this.currentCell.getRightNeighbor();
      } else if (this.currentCell.getRow() + 1 < this.grid.getRows()) {
        this.currentCell = this.grid.getMatrix()[this.currentCell.getRow() + 1][0];
      } else {
        this.currentCell = undefined;
      }
    } else {
      this.unlinkCell(this.currentCell, DirectionType.Right);
      if (this.currentCell.rightLinkExists()) {
        this.currentCell = this.currentCell.getRightNeighbor();
      } else if (this.currentCell.getRow() + 1 < this.grid.getRows()) {
        this.currentCell = this.grid.getMatrix()[this.currentCell.getRow() + 1][0];
      } else {
        this.currentCell = undefined;
      }
    }
  }

  updateAldousBroderAlgorithm() {
    if (this.unvisitedCells.length <= 0) {
      this.generatingMaze = false;
      return true;
    }

    if (this.currentCell === undefined) {
      this.generatingMaze = false;
      return;
    }

    const neighbors = this.currentCell.getNeighbors();
    const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
    if (this.unvisitedCells.includes(neighbor)) {
      if (neighbor === this.currentCell.getUpNeighbor()) {
        this.unlinkCell(this.currentCell, DirectionType.Up);
      } else if (neighbor === this.currentCell.getDownNeighbor()) {
        this.unlinkCell(this.currentCell, DirectionType.Down);
      } else if (neighbor === this.currentCell.getLeftNeighbor()) {
        this.unlinkCell(this.currentCell, DirectionType.Left);
      } else if (neighbor === this.currentCell.getRightNeighbor()) {
        this.unlinkCell(this.currentCell, DirectionType.Right);
      }

      this.unvisitedCells = this.unvisitedCells.filter(cell => cell !== neighbor);
    }
    this.currentCell = neighbor;
  }
};

export default Simulation;