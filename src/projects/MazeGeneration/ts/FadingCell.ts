class FadingCell {
  private opacity: number = 10;
  public static maxOpacity: number = 30;

  constructor(private row: number, private col: number) {
    this.opacity = FadingCell.maxOpacity;
  }

  getRow() { return this.row; }
  getCol() { return this.col; }
  getOpacity() { return this.opacity; }

  update() {
    this.opacity--;
  }

  isDead() {
    return this.opacity <= 0;
  }
};

export default FadingCell;