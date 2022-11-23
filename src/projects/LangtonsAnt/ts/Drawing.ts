import { Directions } from "../../SnakeGamePathFinding/ts/Snake";
import Simulation from "./Simulation";

class Drawing {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private antImage: HTMLImageElement;

  constructor(private simulation: Simulation) {
    this.canvas = this.simulation.getCanvas();
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.antImage = new Image();
    this.antImage.src = '/ant.png';
  }

  drawGrid() {
    const cellWidth = this.simulation.getCellWidth();
    this.simulation.getGrid().flat().forEach(cell => {
      this.ctx.fillStyle = cell.getColor();
      if (cell.hasColor()) {
        const { x, y } = this.simulation.convertRowColToXY(cell.getRow(), cell.getCol());
        this.ctx.fillRect(x, y, cellWidth, cellWidth);
      }
    });
  }

  drawAnts() {
    this.ctx.fillStyle = "blue";
    const width = Simulation.ANT_RADIUS;
    const halfWidth = Simulation.ANT_RADIUS/2;

    this.simulation.getAnts().forEach(ant => {
      const { x, y } = ant.getXY();
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, x, y);
      if (ant.getStartDirection() === Directions.DOWN) {
        this.ctx.rotate(Math.PI);
      } else if (ant.getStartDirection() === Directions.LEFT) {
        this.ctx.rotate(3*Math.PI/2);
      } else if (ant.getStartDirection() === Directions.RIGHT) {
        this.ctx.rotate(Math.PI/2);
      }
      this.ctx.drawImage(this.antImage, -halfWidth, -halfWidth, width, width);
      this.ctx.restore();
    });
  }

  draw = () => {
    this.ctx.fillStyle = "black";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.simulation.getOptions().edit) {
      this.drawGrid();
    } else {
      this.drawAnts();
    }
  }
}

export default Drawing;