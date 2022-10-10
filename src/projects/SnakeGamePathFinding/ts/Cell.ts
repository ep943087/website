class Cell {
  private f: number = 0;
  private g: number = 0;
  private h: number = 0;
  private previous: Cell | null = null;
  private neighbors: Cell[] = [];

  constructor(private row: number, private col: number) {}

  public static distance(a: Cell, b: Cell): number {
    return Math.sqrt(Math.pow(a.row - b.row, 2) + Math.pow(a.col - b.col, 2));
  }

  public static compare(a: Cell, b: Cell): boolean {
    return a.row === b.row && a.col === b.col;
  }

  getRow() { return this.row; }
  getCol() { return this.col; }
  getPrevious() { return this.previous; }
  setPrevious(previous: Cell | null) { this.previous = previous; }
  getF() { return this.f; }
  setF(f: number) { this.f = f; }
  getG() { return this.g; }
  setG(g: number) { this.g = g; }
  getH() { return this.h; }
  setH(h: number) { this.h = h; }
  getNeighbors() { return this.neighbors; }
  setNeighbors(grid: Cell[][]) {
    this.neighbors = [];
    const rows = grid.length;
    const cols = grid[0].length;
    if (this.row > 0) {
      this.neighbors.push(grid[this.row-1][this.col]);
    }
    
    if (this.row < rows - 1) {
      this.neighbors.push(grid[this.row+1][this.col]);
    }

    if (this.col > 0) {
      this.neighbors.push(grid[this.row][this.col-1]);
    }

    if (this.col < cols - 1) {
      this.neighbors.push(grid[this.row][this.col+1]);
    }
  }
};

export default Cell;