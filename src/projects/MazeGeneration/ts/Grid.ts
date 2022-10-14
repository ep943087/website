import Cell from "./Cell";

class Grid {
  private matrix: Cell[][] = [];

  constructor(private rows: number, private cols: number) {}

  getMatrix() { return this.matrix; }
  getRows() { return this.rows; }
  getCols() { return this.cols; }

  initialize() {
    this.matrix = [];
    for (let i=0;i<this.rows;i++) {
      const rowOfCells: Cell[] = [];
      for (let j=0;j<this.cols;j++) {
        rowOfCells.push(new Cell(i, j));
      }
      this.matrix.push(rowOfCells);
    }

    for (let i=0;i<this.rows;i++) {
      for (let j=0;j<this.cols;j++) {
        this.matrix[i][j].setNeighbors(this.matrix);
      }
    }
  }
};

export default Grid;