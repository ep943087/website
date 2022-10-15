export enum DirectionType {
  Up,
  Down,
  Left,
  Right,
};

class FadingWall
{
  private opacity;
  public static maxOpacity = 60;
  public static closeStart = 20;
  public static lineWidth = 2.5;
  private x1: number = 0;
  private y1: number = 0;
  private x2: number = 0;
  private y2: number = 0;
  private x3: number = 0;
  private y3: number = 0;
  private x4: number = 0;
  private y4: number = 0;
  private length: number;
  
  constructor(row: number, col: number, cellLength: number, direction: DirectionType) {
    this.opacity = FadingWall.maxOpacity;
    const halfCellLength = cellLength / 2;

    const [x, y] = [col * cellLength, row * cellLength];
    if (direction === DirectionType.Up) {
      [this.x1, this.y1] = [x, y];
      [this.x2, this.y2] = [x + halfCellLength, y];
      [this.x3, this.y3] = [x + halfCellLength, y];
      [this.x4, this.y4] = [x + cellLength, y];
    } else if (direction === DirectionType.Down) {
      [this.x1, this.y1] = [x, y + cellLength];
      [this.x2, this.y2] = [x + halfCellLength, y + cellLength];
      [this.x3, this.y3] = [x + halfCellLength, y + cellLength];
      [this.x4, this.y4] = [x + cellLength, y + cellLength];
    } else if (direction === DirectionType.Left) {
      [this.x1, this.y1] = [x, y];
      [this.x2, this.y2] = [x, y + halfCellLength];
      [this.x3, this.y3] = [x, y + halfCellLength];
      [this.x4, this.y4] = [x, y + cellLength];
    } else if (direction === DirectionType.Right) {
      [this.x1, this.y1] = [x + cellLength, y];
      [this.x2, this.y2] = [x + cellLength, y + halfCellLength];
      [this.x3, this.y3] = [x + cellLength, y + halfCellLength];
      [this.x4, this.y4] = [x + cellLength, y + cellLength];
    }
    this.length = Math.sqrt(Math.pow(this.x1 - this.x2, 2) + Math.pow(this.y1 - this.y2, 2));
  }

  getOpacity() {
    return this.opacity;
  }

  getDimensions() {
    return {
      x1: this.x1, y1: this.y1, x2: this.x2, y2: this.y2,
      x3: this.x3, y3: this.y3, x4: this.x4, y4: this.y4,
    }
  }

  update() {
    this.opacity--;
    if (this.opacity > FadingWall.closeStart) {
      return;
    }
    const angle = Math.atan2(this.y2 - this.y1, this.x2 - this.x1);
    const velocity = this.length / FadingWall.closeStart;
    const dX = velocity * Math.cos(angle);
    const dY = velocity * Math.sin(angle);

    this.x3 += dX;
    this.y3 += dY;
    this.x2 -= dX;
    this.y2 -= dY;
  }

  isDead() {
    return this.opacity <= 0;
  }
};

export default FadingWall;