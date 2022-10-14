export enum DirectionType {
  Up,
  Down,
  Left,
  Right,
};

class FadingWall
{
  private opacity;
  public static maxOpacity = 100;
  public static lineWidth = 2;
  private x1: number = 0;
  private y1: number = 0;
  private x2: number = 0;
  private y2: number = 0;
  
  constructor(row: number, col: number, cellLength: number, direction: DirectionType) {
    this.opacity = FadingWall.maxOpacity;

    const [x, y] = [col * cellLength, row * cellLength];
    if (direction === DirectionType.Up) {
      [this.x1, this.y1] = [x, y];
      [this.x2, this.y2] = [x + cellLength, y];
    } else if (direction === DirectionType.Down) {
      [this.x1, this.y1] = [x, y + cellLength];
      [this.x2, this.y2] = [x + cellLength, y + cellLength];
    } else if (direction === DirectionType.Left) {
      [this.x1, this.y1] = [x, y];
      [this.x2, this.y2] = [x, y + cellLength];
    } else if (direction === DirectionType.Right) {
      [this.x1, this.y1] = [x + cellLength, y];
      [this.x2, this.y2] = [x + cellLength, y + cellLength];
    }
  }

  getOpacity() {
    return this.opacity;
  }

  getDimensions() {
    return {
      x1: this.x1, y1: this.y1, x2: this.x2, y2: this.y2, 
    }
  }

  update() {
    this.opacity--;
  }

  isDead() {
    return this.opacity <= 0;
  }
};

export default FadingWall;