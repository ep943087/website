import { DijkstraDisplayType } from "../types";
import DijkstraCell from "./DijkstraCell";
import FadingCell from "./FadingCell";
import FadingWall from "./FadingWall";
import Simulation from "./Simulation";

class Drawing {
  private ctx: CanvasRenderingContext2D;

  constructor(
    private canvas: HTMLCanvasElement,
    private simulation: Simulation,
    private drawFadingCells: HTMLInputElement,
    private drawFadingWalls: HTMLInputElement,
    private showDijkstraAlgo: HTMLInputElement,
    private dijkstraDiplay: HTMLSelectElement,
  ) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }
  
  convertRowColToXY(row: number, col: number) {
    return this.simulation.convertRowColToXY(row, col);
  }

  drawDijkstraCellPath(dijkstraCell: DijkstraCell) {
    const path = dijkstraCell.getPath();

    this.ctx.lineWidth = 3;
    if (path.length > 0) {
      const { cX, cY } = this.convertRowColToXY(path[0].getRow(), path[0].getCol());
      this.ctx.beginPath();
      this.ctx.moveTo(cX, cY);
      for (let i=1;i<path.length;i++) {
        const { cX, cY } = this.convertRowColToXY(path[i].getRow(), path[i].getCol());
        this.ctx.lineTo(cX, cY);
      }
      this.ctx.strokeStyle = "rgba(0,150,0)";
      this.ctx.stroke();
    }
    this.ctx.lineWidth = 1;
  }

  drawGrid() {
    const matrix = this.simulation.getGrid().getMatrix();
    const { rows, cols, cellLength } = this.simulation.getDimensions();

    if (this.simulation.getIsMazeComplete() && this.showDijkstraAlgo.checked) {
      const grid = this.simulation.getDijkstraGrid().flat();
      let maxDistanceIndex = 0;
      for (let i=1;i<grid.length;i++) {
        if (grid[i].getDistance() > grid[maxDistanceIndex].getDistance()) {
          maxDistanceIndex = i;
        }
      }
      const maxDistance = grid[maxDistanceIndex].getDistance();

      grid.forEach((dCell) => {
        const { x, y } = this.convertRowColToXY(dCell.getRow(), dCell.getCol());
        const opacity = dCell.getDistance() / maxDistance;
        if (this.dijkstraDiplay.value === DijkstraDisplayType.opacityByDistance) {
          this.ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
        } else if (this.dijkstraDiplay.value === DijkstraDisplayType.colorFul) {
          this.ctx.fillStyle = `hsl(${opacity * 260}, 50%, 50%)`;
        }
        this.ctx.fillRect(x, y, cellLength, cellLength);
      });

      if (this.dijkstraDiplay.value === DijkstraDisplayType.cornerToCornerPath) {
        this.drawDijkstraCellPath(this.simulation.getDijkstraGrid()[rows-1][cols-1]);
      } else if (this.dijkstraDiplay.value === DijkstraDisplayType.pathToMaxDistance) {
        this.drawDijkstraCellPath(grid[maxDistanceIndex]);
      }
    }

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
        const { x1, y1, x2, y2, x3, y3, x4, y4 } = fadingWall.getDimensions();
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(x3, y3);
        this.ctx.lineTo(x4, y4);
        this.ctx.stroke();
        this.ctx.stroke();
      });
    }
  }

  draw = () => {
    if (this.canvas.width !== this.canvas.offsetWidth || this.canvas.height !== this.canvas.offsetHeight) {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
      this.simulation.initialize();
    }
    this.ctx.fillStyle = "black";

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