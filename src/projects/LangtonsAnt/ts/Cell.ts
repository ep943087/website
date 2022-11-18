class Cell {
  private color: string = "";
  constructor(private row: number, private col: number) {}

  setColor(color: string) { this.color = color; }
  unsetColor() { this.color = ""; }
  hasColor() { return this.color !== ''; }
  getRow() { return this.row; }
  getCol() { return this.col; }
  getColor() { return this.color; }
};

export default Cell;