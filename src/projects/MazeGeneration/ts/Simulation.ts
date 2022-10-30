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
  private wilsonPath: Cell[] = [];
  private hunting: boolean = false;
  private backTrackingStack: Cell[] = [];
  private sets: Cell[][] = [];
  private weights: { left: Cell, right: Cell }[] = [];

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
      case MazeType.Wilson:
        this.initializeWilsonAlgorithm();
        break;
      case MazeType.HuntAndKill:
        this.initializeHuntAndKill();
        break;
      case MazeType.RecursiveBackTracking:
        this.initializeRecursiveBackTracking();
        break;
      case MazeType.Prim:
        this.initializePrim();
        break;
      case MazeType.Kruskal:
        this.initializeKruskal();
        break;
    }
  }

  setCurrentToRandomCell() {
    this.currentCell = this.grid.getMatrix()[~~(Math.random()*this.grid.getRows())][~~(Math.random()*this.grid.getCols())];
  }

  intializeBinarySearchTreeAlgorithm() {
    this.directionIsLeft = false;
  }

  initializeSideWinderAlgorithm() {
    this.sideWinderCellList = [];
  }

  intializeAldousBroderAlgorithm() {
    this.setCurrentToRandomCell();
    this.unvisitedCells = this.grid.getMatrix().flat();
  }

  initializeWilsonAlgorithm() {
    this.setCurrentToRandomCell();
    this.unvisitedCells = this.grid.getMatrix().flat().filter(
      cell => cell !== this.grid.getMatrix()[Math.floor(this.grid.getRows()/2)][Math.floor(this.grid.getCols()/2)]
    );
    this.wilsonPath = [];
  }

  initializeHuntAndKill() {
    this.setCurrentToRandomCell();
    this.unvisitedCells = this.grid.getMatrix().flat().filter(cell => cell !== this.currentCell);
    this.hunting = false;
  }

  initializeRecursiveBackTracking() {
    this.setCurrentToRandomCell();
    this.backTrackingStack = [this.currentCell as Cell];
    this.unvisitedCells = this.grid.getMatrix().flat().filter(cell => cell !== this.currentCell);
  }

  initializePrim() {
    this.setCurrentToRandomCell();
    this.unvisitedCells = this.grid.getMatrix().flat().filter(cell => cell !== this.currentCell);
  }

  initializeKruskal() {
    this.setCurrentToRandomCell();
    this.sets = this.grid.getMatrix().flat().map(cell => [cell]);
    this.weights = [];

    const weightExists = (newWeight: { left: Cell, right: Cell }) => (
      this.weights.some(weight => (
        (weight.left === newWeight.left && weight.right === newWeight.right) ||
        (weight.right === newWeight.left && weight.left === newWeight.right)
      ))
    );

    this.grid.getMatrix().flat().forEach(cell => {
      cell.getNeighbors().forEach(neighbor => {
        const newWeight = { left: cell, right: neighbor };
        if (!weightExists(newWeight)) {
          this.weights.push(newWeight);
        }
      });
    });
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

  removeDuplicatesInFadingCells() {
    for (let i=this.fadingCells.length - 1;i>=0;i--) {
      const existsIndex = this.fadingCells.findIndex(
        cell => cell !== this.fadingCells[i] && cell.getRow() === this.fadingCells[i].getRow()
          && cell.getCol() === this.fadingCells[i].getCol()
      );
      if (existsIndex >= 0) {
        this.fadingCells.splice(existsIndex, 1);
        i--;
      }
    }
  }

  addToFadingCells(addCell: Cell) {
    const findIndex = this.fadingCells.findIndex(cell => cell.getRow() === addCell.getRow() && cell.getCol() === addCell.getCol());
    if (findIndex >= 0) {
      this.fadingCells.splice(findIndex, 1);
    }
    this.fadingCells.push(new FadingCell(addCell.getRow(), addCell.getCol()));
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
    const startCell: DijkstraCell = this.dijkstraGrid[Math.floor(this.grid.getRows()-1)][Math.floor(0)];
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
      this.addToFadingCells(this.currentCell);
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
      case MazeType.Wilson:
        this.updateWilsonAlgorithm();
        break;
      case MazeType.HuntAndKill:
        this.updateHuntAndKill();
        break;
      case MazeType.RecursiveBackTracking:
        this.updateRecursiveBackTracking();
        break;
      case MazeType.Prim:
        this.updatePrim();
        break;
      case MazeType.Kruskal:
        this.updateKruskal();
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
      if (this.currentCell.upNeighborExists() && this.currentCell.rightNeighborExists()) {
        if (Math.random() < .5) {
          this.unlinkCell(this.currentCell, DirectionType.Right);
        } else {
          this.unlinkCell(this.currentCell, DirectionType.Up);
        }
      } else if (this.currentCell.rightNeighborExists()) {
        this.unlinkCell(this.currentCell, DirectionType.Right);
      } else {
        this.unlinkCell(this.currentCell, DirectionType.Up);
      }
      if (!this.directionIsLeft && this.currentCell.rightNeighborExists()) {
        this.currentCell = this.currentCell.getRightNeighbor() ?? new Cell(0, 0);
      } else if (this.directionIsLeft && this.currentCell.leftNeighborExists()) {
        this.currentCell = this.currentCell.getLeftNeighbor() ?? new Cell(0, 0);
      } else {
        this.directionIsLeft = !this.directionIsLeft;
        const col = this.directionIsLeft ? this.grid.getCols() - 1 : 0;
        this.currentCell = this.currentCell.getRow() < this.grid.getRows() - 1 ? this.grid.getMatrix()[this.currentCell.getRow() + 1][col]
          : undefined;
      }
    }
    return this.generatingMaze;
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
      if (this.currentCell.rightNeighborExists()) {
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
      if (this.currentCell.rightNeighborExists()) {
        this.currentCell = this.currentCell.getRightNeighbor();
      } else if (this.currentCell.getRow() + 1 < this.grid.getRows()) {
        this.currentCell = this.grid.getMatrix()[this.currentCell.getRow() + 1][0];
      } else {
        this.currentCell = undefined;
      }
    } else {
      this.unlinkCell(this.currentCell, DirectionType.Right);
      if (this.currentCell.rightNeighborExists()) {
        this.currentCell = this.currentCell.getRightNeighbor();
      } else if (this.currentCell.getRow() + 1 < this.grid.getRows()) {
        this.currentCell = this.grid.getMatrix()[this.currentCell.getRow() + 1][0];
      } else {
        this.currentCell = undefined;
      }
    }
    return this.generatingMaze;
  }

  updateAldousBroderAlgorithm() {
    if (this.unvisitedCells.length <= 0 || this.currentCell === undefined) {
      this.generatingMaze = false;
      return this.generatingMaze;
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

      this.removeCellFromUnvisitedCells(neighbor);
    }
    this.currentCell = neighbor;
    return this.generatingMaze;
  }

  updateWilsonAlgorithm() {
    if (this.unvisitedCells.length <= 0 || this.currentCell === undefined) {
      this.generatingMaze = false;
      return this.generatingMaze;
    }

    this.wilsonPath.push(this.currentCell);

    const next = this.currentCell.getRandomNeighbor();

    if (this.wilsonPath.includes(next)) {
      const nextIndex = this.wilsonPath.findIndex(cell => cell === next);
      this.wilsonPath.splice(nextIndex);
      this.currentCell = next;
    } else if (!this.unvisitedCells.includes(next)) {
      this.wilsonPath.push(next);
      for (let i=0;i<this.wilsonPath.length-1;i++) {
        const first = this.wilsonPath[i];
        const second = this.wilsonPath[i+1];
        if (first.getUpNeighbor() === second) {
          this.unlinkCell(first, DirectionType.Up);
        } else if (first.getDownNeighbor() === second) {
          this.unlinkCell(first, DirectionType.Down);
        } else if (first.getLeftNeighbor() === second) {
          this.unlinkCell(first, DirectionType.Left);
        } else if (first.getRightNeighbor() === second) {
          this.unlinkCell(first, DirectionType.Right);
        }
      }

      this.unvisitedCells = this.unvisitedCells.filter(cell => !this.wilsonPath.includes(cell));
      this.wilsonPath = [];
      this.currentCell = this.unvisitedCells[Math.floor(Math.random()*this.unvisitedCells.length)];
    } else {
      this.currentCell = next;
    }
    return this.generatingMaze;
  }

  updateHuntAndKill() {
    if (this.unvisitedCells.length <= 0 || this.currentCell === undefined) {
      this.generatingMaze = false;
      return this.generatingMaze;
    }

    if (this.hunting) {
      for (let i=0;i<this.grid.getCols();i++) {
        if (this.currentCell === undefined) continue;
        this.currentCell = this.grid.getMatrix()[this.currentCell.getRow()][i];
        this.addToFadingCells(this.currentCell);
        const neighbors = this.currentCell.getNeighbors().filter(neighbor => !this.unvisitedCells.includes(neighbor));
        if (this.unvisitedCells.includes(this.currentCell) && neighbors.length > 0) {
          const neighbor = neighbors[Math.floor(Math.random()*neighbors.length)];
          if (this.currentCell.getUpNeighbor() === neighbor) {
            this.unlinkCell(this.currentCell, DirectionType.Up);
          } else if (this.currentCell.getDownNeighbor() === neighbor) {
            this.unlinkCell(this.currentCell, DirectionType.Down);
          } else if (this.currentCell.getLeftNeighbor() === neighbor) {
            this.unlinkCell(this.currentCell, DirectionType.Left);
          } else if (this.currentCell.getRightNeighbor() === neighbor) {
            this.unlinkCell(this.currentCell, DirectionType.Right);
          }
          this.removeCellFromUnvisitedCells(this.currentCell);
          this.hunting = false;
          break;
        } else {
          if (this.currentCell.getCol() < this.grid.getCols() - 1) {
            this.currentCell = this.currentCell.getRightNeighbor();
          } else {
            this.currentCell = this.grid.getMatrix()[this.currentCell.getRow()+1][0];
          }
        }
      }
    } else {
      const neighbors = this.currentCell.getNeighbors().filter(neighbor => this.unvisitedCells.includes(neighbor));
      if (neighbors.length === 0) {
        this.hunting = true;
        this.currentCell = this.grid.getMatrix()[0][0];
      } else {
        const next = neighbors[Math.floor(Math.random()*neighbors.length)];
        if (this.currentCell.getUpNeighbor() === next) {
          this.unlinkCell(this.currentCell, DirectionType.Up);
        } else if (this.currentCell.getDownNeighbor() === next) {
          this.unlinkCell(this.currentCell, DirectionType.Down);
        } else if (this.currentCell.getLeftNeighbor() === next) {
          this.unlinkCell(this.currentCell, DirectionType.Left);
        } else if (this.currentCell.getRightNeighbor() === next) {
          this.unlinkCell(this.currentCell, DirectionType.Right);
        }
        this.removeCellFromUnvisitedCells(next);
        this.currentCell = next;
      }
    }

    return this.generatingMaze;
  }

  updateRecursiveBackTracking() {
    if (!this.generatingMaze || this.currentCell === undefined) {
      this.generatingMaze = false;
      return this.generatingMaze;
    }

    const neighbors = this.currentCell.getNeighbors().filter(cell => this.unvisitedCells.includes(cell));

    if (neighbors.length > 0) {
      const neighbor = neighbors[Math.floor(Math.random()*neighbors.length)];
      if (this.currentCell.getUpNeighbor() === neighbor) {
        this.unlinkCell(this.currentCell, DirectionType.Up);
      } else if (this.currentCell.getDownNeighbor() === neighbor) {
        this.unlinkCell(this.currentCell, DirectionType.Down);
      } else if (this.currentCell.getLeftNeighbor() === neighbor) {
        this.unlinkCell(this.currentCell, DirectionType.Left);
      } else if (this.currentCell.getRightNeighbor() === neighbor) {
        this.unlinkCell(this.currentCell, DirectionType.Right);
      }
      this.currentCell = neighbor;
      this.removeCellFromUnvisitedCells(neighbor);
      this.backTrackingStack.push(this.currentCell);
    } else if (this.backTrackingStack.length > 0) {
      this.currentCell = this.backTrackingStack.pop();
    } else {
      this.generatingMaze = false;
    }

    return this.generatingMaze;
  }

  updatePrim() {
    if (!this.generatingMaze) {
      return false;
    }

    if (this.unvisitedCells.length === 0) {
      this.generatingMaze = false;
      return this.generatingMaze;
    }

    const visitedCells = this.grid.getMatrix().flat().filter(cell => !this.unvisitedCells.includes(cell));

    const neighborsNextToUnvisited = visitedCells.filter(cell => {
      return cell.getNeighbors().filter(neighbor => (
        this.unvisitedCells.includes(neighbor)
      )).length > 0;
    });

    this.currentCell = neighborsNextToUnvisited[Math.floor(Math.random() * neighborsNextToUnvisited.length)];

    const unvisitedNeighbors = this.currentCell.getNeighbors().filter(neighbor => (
      this.unvisitedCells.includes(neighbor)
    ));

    const next = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];

    if (this.currentCell?.getUpNeighbor() === next) {
      this.unlinkCell(this.currentCell, DirectionType.Up);
    } else if (this.currentCell?.getDownNeighbor() === next) {
      this.unlinkCell(this.currentCell, DirectionType.Down);
    } else if (this.currentCell?.getLeftNeighbor() === next) {
      this.unlinkCell(this.currentCell, DirectionType.Left);
    } else if (this.currentCell?.getRightNeighbor() === next) {
      this.unlinkCell(this.currentCell, DirectionType.Right);
    }

    this.currentCell = next;
    this.removeCellFromUnvisitedCells(next);

    return this.generatingMaze;
  }

  updateKruskal() {
    if (!this.generatingMaze) {
      return false;
    }

    if (this.weights.length === 0) {
      this.generatingMaze = false;
      return false;
    }

    let weight = this.weights[~~(Math.random()*this.weights.length)];
    let setWithLeftIndex = this.sets.findIndex(set => set.includes(weight.left));
    let setWithLeft = this.sets[setWithLeftIndex];

    do {
      weight = this.weights[~~(Math.random()*this.weights.length)];
      // eslint-disable-next-line no-loop-func
      this.weights = this.weights.filter(w => w !== weight);
      // eslint-disable-next-line no-loop-func
      setWithLeftIndex = this.sets.findIndex(set => set.includes(weight.left));
      setWithLeft = this.sets[setWithLeftIndex];
    } while (setWithLeft.includes(weight.right) && this.weights.length > 0);

    this.currentCell = weight.left;

    if (this.currentCell.getUpNeighbor() === weight.right) {
      this.unlinkCell(this.currentCell, DirectionType.Up);
    } else if (this.currentCell.getDownNeighbor() === weight.right) {
      this.unlinkCell(this.currentCell, DirectionType.Down);
    } else if (this.currentCell.getLeftNeighbor() === weight.right) {
      this.unlinkCell(this.currentCell, DirectionType.Left);
    } else if (this.currentCell.getRightNeighbor() === weight.right) {
      this.unlinkCell(this.currentCell, DirectionType.Right);
    }

    this.sets.splice(setWithLeftIndex, 1);

    const setWithRightIndex = this.sets.findIndex(set => set.includes(weight.right));
    const setWithRight = this.sets[setWithRightIndex];
    this.sets.splice(setWithRightIndex, 1);

    this.sets.push([
      ...setWithLeft,
      ...setWithRight,
    ]);

    return this.generatingMaze;
  }

  getVisitedCells() {
    return this.grid.getMatrix().flat().filter(cell => !this.unvisitedCells.includes(cell));
  }

  removeCellFromUnvisitedCells(removeCell: Cell) {
    this.unvisitedCells = this.unvisitedCells.filter(cell => cell !== removeCell);
  }
};

export default Simulation;