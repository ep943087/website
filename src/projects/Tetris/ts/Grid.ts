class Grid
{
  public static readonly ROWS = 20;
  public static readonly COLS = 10;
  
  private matrix: GridCell[][] = [];

  constructor() {
    for (let i=0;i<Grid.ROWS;i++) {
      const matrixRow: GridCell[] = [];
      for (let j=0;j<Grid.COLS;j++) {
        matrixRow.push(new GridCell(i, j));
      }
      this.matrix.push(matrixRow);
    }
  }

  getMatrix() { return this.matrix }

  reset() {
    this.matrix.flat().forEach(cell => {
      cell.setIsFilled(false);
    });
  }
};

export class GridCell
{
  private isFilled: boolean = false;
  private color: string = "";
  constructor(private row: number, private col: number) {}

  getIsFilled() { return this.isFilled }
  getColor() { return this.color }
  getRow() { return this.row }
  getCol() { return this.col }

  setIsFilled(isFilled: boolean) { this.isFilled = isFilled }
  setColor(color: string) { this.color = color }
};

export default Grid;