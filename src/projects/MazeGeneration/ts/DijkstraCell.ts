class DijkstraCell {
  private distance: number = Infinity;
  private previous?: DijkstraCell;

  public static getGrid(rows: number, cols: number): DijkstraCell[][] {
    const grid: DijkstraCell[][] = [];
    for (let i=0;i<rows;i++) {
      const rowOfCells: DijkstraCell[] = [];
      for (let j=0;j<cols;j++) {
        rowOfCells.push(new DijkstraCell(i, j));
      }
      grid.push(rowOfCells);
    }
    return grid;
  }

  constructor(private row: number, private col: number) {}

  getPath() {
    const path = [];
    let current: DijkstraCell | undefined = this;

    while (current !== undefined) {
      path.push(current);
      current = current.previous;
    }

    return path;
  }

  getRow() { return this.row; }
  getCol() { return this.col; }
  getPrevious() { return this.previous }
  setPrevious(previous: DijkstraCell) { this.previous = previous; }
  public setDistance(distance: number) { this.distance = distance; }
  public getDistance() { return this.distance; }
};

export default DijkstraCell;