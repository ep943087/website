import Grid, { GridCell } from "./Grid";

class Cell {
  constructor(private row: number, private col: number, private color: string) {}

  getRow() { return this.row; }
  getCol() { return this.col; }
  getColor() { return this.color; }
  moveDown() { this.row++}
  moveLeft() { this.col-- }
  moveRight() { this.col++ }
  setRow(row: number) { this.row = row }
  setCol(col: number) { this.col = col }
  canMoveDown(matrix: GridCell[][]) {
    return this.row < -1 || (this.row < Grid.ROWS - 1 && !matrix[this.row+1][this.col].getIsFilled());
  }
  canMoveLeft(matrix: GridCell[][]) {
    return (this.col > 0) && (this.row < 0 || !matrix[this.row][this.col-1].getIsFilled());
  }
  canMoveRight(matrix: GridCell[][]) {
    return this.col < Grid.COLS - 1 && (this.row < 0 || !matrix[this.row][this.col+1].getIsFilled());
  }
};

export default Cell;