import Simulation from "./Simulation";

class Drawing {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(private simulation: Simulation) {
    this.canvas = this.simulation.getCanvas();
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  drawGrid() {
    this.simulation.getGrid().flat().forEach(cell => {
      this.ctx.fillStyle = cell.getColor();
      if (cell.hasColor()) {
        const { x, y } = this.simulation.convertRowColToXY(cell.getRow(), cell.getCol());
        this.ctx.fillRect(x, y, Simulation.CELL_WIDTH, Simulation.CELL_WIDTH);
      }
    });
  }

  draw = () => {
    this.ctx.fillStyle = "black";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawGrid();
  }
}

export default Drawing;