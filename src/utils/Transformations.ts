class Transormations {

  public static rotatePoints(points: Point[], center: Point, angle: number): Point[] {    
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    return points.map(point => {
      let x = point.x;
      let y = point.y;

      x -= center.x;
      y -= center.y;

      const newX = x * c - y * s;
      const newY = x * s + y * c;

      return { x: newX + center.x, y: newY + center.y }
    });
  }

  public static createPoint(x: number, y: number): Point {
    return { x, y };
  }
}

export interface Point {
  x: number;
  y: number;
};

export default Transormations;