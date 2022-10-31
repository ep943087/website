
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

  public static compare(a: Cell, b: Cell) {
    return a.row === b.row && a.col === b.col;
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

  upNeighborExists() { return Boolean(this.up.cell); }
  downNeighborExists() { return Boolean(this.down.cell); }
  leftNeighborExists() { return Boolean(this.left.cell); }
  rightNeighborExists() { return Boolean(this.right.cell); }

  getUpNeighbor() { return this.up.cell }
  getDownNeighbor() { return this.down.cell }
  getLeftNeighbor() { return this.left.cell }
  getRightNeighbor() { return this.right.cell }

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

  linkLeft() {
    if (this.left.cell) {
      this.left.link = true;
      this.left.cell.right.link = true;
    }
  }

  linkUp() {
    if (this.up.cell) {
      this.up.link = true;
      this.up.cell.down.link = true;
    }
  }

  linkRight() {
    if (this.right.cell) {
      this.right.link = true;
      this.right.cell.left.link = true;
    }
  }

  linkDown() {
    if (this.down.cell) {
      this.down.link = true;
      this.down.cell.up.link = true;
    }
  }

  getNeighbors(): Cell[] {
    return ([
      this.getLeftNeighbor(),
      this.getRightNeighbor(),
      this.getUpNeighbor(),
      this.getDownNeighbor(),
    ].filter(cell => cell !== undefined) as Cell[]);
  }

  getRandomNeighbor(): Cell {
    const neighbors: Cell[] = this.getNeighbors();
    return neighbors[Math.floor(Math.random()*neighbors.length)];
  }

  getSpanningTreeNeighbors(): Cell[] {
    return [
      this.isDownLink() ? undefined : this.down.cell,
      this.isUpLink() ? undefined : this.up.cell,
      this.isLeftLink() ? undefined : this.left.cell,
      this.isRightLink() ? undefined : this.right.cell,
    ].filter(cell => cell !== undefined) as Cell[];
  }
}

export default Cell;