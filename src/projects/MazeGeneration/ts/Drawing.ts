import FadingCell from "./FadingCell";
import FadingWall from "./FadingWall";
import Simulation from "./Simulation";

class Drawing {
  private ctx: CanvasRenderingContext2D;

  constructor(
    private canvas: HTMLCanvasElement,
    private simulation: Simulation,
    private drawFadingCells: HTMLInputElement, private drawFadingWalls: HTMLInputElement,
  ) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }
  
  convertRowColToXY(row: number, col: number) {
    return this.simulation.convertRowColToXY(row, col);
  }

  drawGrid() {
    const matrix = this.simulation.getGrid().getMatrix();
    const { rows, cols, cellLength } = this.simulation.getDimensions();

    if (this.drawFadingCells.checked) {
      this.simulation.getFadingCells().forEach(cell => {
        const { x, y } = this.convertRowColToXY(cell.getRow(), cell.getCol());
        this.ctx.fillStyle = `rgba(0, 255, 0, ${.8 * cell.getOpacity() / FadingCell.maxOpacity})`;
        this.ctx.fillRect(x, y, cellLength, cellLength);
      });
    }

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 1;
    for (let i=0;i<rows;i++) {
      for (let j=0;j<cols;j++) {
        const cell = matrix[i][j];
        const { x, y } = this.convertRowColToXY(cell.getRow(), cell.getCol());
        if (cell.isUpLink()) {
          this.ctx.beginPath();
          this.ctx.moveTo(x, y);
          this.ctx.lineTo(x + cellLength, y);
          this.ctx.stroke();
        }
        if (cell.isDownLink()) {
          this.ctx.beginPath();
          this.ctx.moveTo(x, y + cellLength);
          this.ctx.lineTo(x + cellLength, y + cellLength);
          this.ctx.stroke();
        }
        if (cell.isRightLink()) {
          this.ctx.beginPath();
          this.ctx.moveTo(x + cellLength, y);
          this.ctx.lineTo(x + cellLength, y + cellLength);
          this.ctx.stroke();
        }
        if (cell.isLeftLink()) {
          this.ctx.beginPath();
          this.ctx.moveTo(x, y);
          this.ctx.lineTo(x, y + cellLength);
          this.ctx.stroke();
        }
      }
    }

    if (this.drawFadingWalls.checked) {
      this.ctx.lineWidth = FadingWall.lineWidth;
      this.ctx.strokeStyle = "rgba(0, 255, 0)";
      this.simulation.getFadingWalls().forEach(fadingWall => {
        this.ctx.globalAlpha = fadingWall.getOpacity() / FadingWall.maxOpacity;
        this.ctx.beginPath();
        const { x1, y1, x2, y2 } = fadingWall.getDimensions();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
      });
    }
    this.ctx.globalAlpha = 1;
  }

  draw = () => {
    this.ctx.fillStyle = "black";
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    const { rows, cols } = this.simulation.getDimensions();
    const { x: gridEndX, y: gridEndY } = this.convertRowColToXY(rows, cols);
    this.ctx.translate((this.canvas.width - gridEndX) / 2, (this.canvas.height - gridEndY) / 2);

    this.drawGrid();

    this.ctx.restore();
  };
};

export default Drawing;