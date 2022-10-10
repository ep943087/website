class Block {
  constructor(private row: number, private col: number) {
    this.row = Math.floor(this.row);
    this.col = Math.floor(this.col);
  }

  getRow() { return this.row; }
  getCol() { return this.col; }
  setRow(row: number) { this.row = Math.floor(row); }
  setCol(col: number) { this.col = Math.floor(col); }
  moveUp() {this.row--; }
  moveDown() { this.row++; }
  moveLeft() { this.col--; }
  moveRight() { this.col++; }
  setDimensions(row: number, col: number) {
    this.setRow(row);
    this.setCol(col);
  }

  public static compare(a: Block, b: Block): boolean {
    return a.row === b.row && a.col === b.col;
  }

  public static nextCellIsUp(current: Block,  next: Block): boolean {
    return next.getRow() < current.getRow();
  }

  public static nextCellIsLeft(current: Block,  next: Block): boolean {
    return next.getCol() < current.getCol();
  }

  public static nextCellIsRight(current: Block,  next: Block): boolean {
    return next.getCol() > current.getCol();
  }

  public static nextCellIsDown(current: Block,  next: Block): boolean {
    return next.getRow() > current.getRow();
  }
};

export default Block;