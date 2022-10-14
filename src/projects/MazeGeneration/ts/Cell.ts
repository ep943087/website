
export interface NeighborType {
  cell?: Cell,
  link: boolean,
};

class Cell {
  private up: NeighborType;
  private down: NeighborType;
  private left: NeighborType;
  private right: NeighborType;

  constructor(private row: number, private col: number) {
    this.up = this.down = this.left = this.right = {
      link: true,
    };
  }

  getRow() { return this.row; }
  getCol() { return this.col; }

  setNeighbors(gridMatrix: Cell[][]) {
    const rows = gridMatrix.length;
    const cols = gridMatrix[0].length;
    this.up = {
      cell: this.row > 0 ? gridMatrix[this.row - 1][this.col] : undefined,
      link: true,
    }
    this.down = {
      cell: this.row < rows - 1 ? gridMatrix[this.row + 1][this.col] : undefined,
      link: true,
    }
    this.left = {
      cell: this.col > 0 ? gridMatrix[this.row][this.col - 1] : undefined,
      link: true,
    }
    this.right = {
      cell: this.col < cols - 1 ? gridMatrix[this.row][this.col + 1] : undefined,
      link: true,
    }
  }

  isUpLink() { return this.up.link; }
  isDownLink() { return this.down.link; }
  isLeftLink() { return this.left.link; }
  isRightLink() { return this.right.link; }

  upLinkExists() { return Boolean(this.up.cell); }
  downLinkExists() { return Boolean(this.down.cell); }
  leftLinkExists() { return Boolean(this.left.cell); }
  rightLinkExists() { return Boolean(this.right.cell); }

  getUpLink() { return this.up.cell }
  getDownLink() { return this.down.cell }
  getLeftLink() { return this.left.cell }
  getRightLink() { return this.right.cell }

  unlinkUp() {
    if (this.up.cell) {
      this.up.link = false;
      this.up.cell.down.link = false;
    }
  }

  unlinkDown() {
    if (this.down.cell) {
      this.down.link = false;
      this.down.cell.up.link = false;
    }
  }

  unlinkRight() {
    if (this.right.cell) {
      this.right.link = false;
      this.right.cell.left.link = false;
    }
  }

  unlinkLeft() {
    if (this.left.cell) {
      this.left.link = false;
      this.left.cell.right.link = false;
    }
  }
}

export default Cell;