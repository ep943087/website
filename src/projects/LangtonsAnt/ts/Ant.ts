import { Directions } from "../../SnakeGamePathFinding/ts/Snake";
import Cell from "./Cell";

class Ant {

  private cell: Cell | null = new Cell(0, 0);
  private direction: Directions = Directions.DOWN;
  private startDirection: Directions = Directions.DOWN;

  constructor(private x: number, private y: number) {}

  setCell(cell: Cell | null) { this.cell = cell; }
  getCell() { return this.cell; }
  setDirection(direction: Directions) { this.direction = direction; }
  getDirection() { return this.direction; }
  setStartDirection(startDirection: Directions) { this.startDirection = startDirection; }
  getStartDirection() { return this.startDirection; }
  getXY() { return { x: this.x, y: this.y, }}
  setXY(x: number, y: number) { this.x = x; this.y = y; }
  getIsDead() { return this.cell === null; }
}

export default Ant;