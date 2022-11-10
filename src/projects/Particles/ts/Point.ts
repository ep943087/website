class Point {
  constructor(private x: number, private y: number) {}
  getX() { return this.x; }
  getY() { return this.y; }
  setX(x: number) { this.x = x }
  setY(y: number) { this.y = y }
  setXY(x: number, y: number) {
    this.setX(x);
    this.setY(y);
  }
  addXY(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  public static distance(a: Point, b: Point): number {
    return Math.sqrt(
      Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
    );
  }

  public static compare(a: Point, b: Point): boolean {
    return a.x === b.x && a.y === b.y;
  }
}

export default Point;