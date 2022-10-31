import { DijkstraDisplayType, MazeType } from "../types";
import Cell from "./Cell";
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
    private drawSpanningTree: HTMLInputElement,
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

      this.ctx.fillStyle = "#FFFF00";
      this.ctx.beginPath();
      this.ctx.arc(cX, cY, 3, 0, 2*Math.PI);
      this.ctx.fill();

      const { cX: lcX, cY: lcY } = this.convertRowColToXY(path[path.length-1].getRow(), path[path.length-1].getCol());
      this.ctx.beginPath();
      this.ctx.arc(lcX, lcY, 3, 0, 2*Math.PI);
      this.ctx.fill();
    }
    this.ctx.lineWidth = 1;
  }

  getCellLineWidth() {
    return this.drawSpanningTree.checked ? .2 : 1;
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

    this.ctx.lineWidth = 3;
    const deadEnds: { x: number, y: number}[] = [];
    this.ctx.strokeStyle = "#FF0000";
    matrix.flat().forEach((cell) => {
      if (this.drawSpanningTree.checked) {
        const neighbors = cell.getSpanningTreeNeighbors();
        const { cX, cY } = this.convertRowColToXY(cell.getRow(), cell.getCol());
        neighbors.forEach((neighbor) => {
          const { cX: ncX, cY: ncY } = this.convertRowColToXY(neighbor.getRow(), neighbor.getCol());
          this.ctx.beginPath();
          this.ctx.moveTo(cX, cY);
          this.ctx.lineTo(ncX, ncY);
          this.ctx.stroke();
        });
        if (neighbors.length === 1) {
          deadEnds.push({ x: cX, y: cY });
        }
      }
    });

    this.ctx.fillStyle = "#FFFF00";
    deadEnds.forEach((cell) => {
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(cell.x, cell.y, 3, 0, 2*Math.PI);
        this.ctx.fill();
    });

    if (this.drawFadingCells.checked && this.simulation.getMazeType() !== MazeType.RecursiveDivision) {
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
          this.ctx.lineWidth = this.getCellLineWidth();
          this.ctx.strokeStyle = "white";
          this.ctx.beginPath();
          this.ctx.moveTo(x, y);
          this.ctx.lineTo(x + cellLength, y);
          this.ctx.stroke();
        }
        if (cell.isDownLink()) {
          this.ctx.lineWidth = this.getCellLineWidth();
          this.ctx.strokeStyle = "white";
          this.ctx.beginPath();
          this.ctx.moveTo(x, y + cellLength);
          this.ctx.lineTo(x + cellLength, y + cellLength);
          this.ctx.stroke();
          if (this.drawFadingCells.checked && this.simulation.getMazeType() === MazeType.RecursiveDivision) {
            const fCell = this.simulation.getFadingCells().find(c => c.getRow() === cell.getRow() && c.getCol() === cell.getCol());
            if (fCell) {
              this.ctx.lineWidth = 3;
              this.ctx.strokeStyle = `rgba(0, 255, 0, ${.8 * fCell.getOpacity() / FadingCell.maxOpacity})`;
              this.ctx.beginPath();
              this.ctx.moveTo(x, y + cellLength);
              this.ctx.lineTo(x + cellLength, y + cellLength);
              this.ctx.stroke();
            }
          }
        }
        if (cell.isRightLink()) {
          this.ctx.lineWidth = this.getCellLineWidth();
          this.ctx.strokeStyle = "white";
          this.ctx.beginPath();
          this.ctx.moveTo(x + cellLength, y);
          this.ctx.lineTo(x + cellLength, y + cellLength);
          this.ctx.stroke();
          if (this.drawFadingCells.checked && this.simulation.getMazeType() === MazeType.RecursiveDivision) {
            const fCell = this.simulation.getFadingCells().find(c => c.getRow() === cell.getRow() && c.getCol() === cell.getCol());
            if (fCell) {
              this.ctx.lineWidth = 3;
              this.ctx.strokeStyle = `rgba(0, 255, 0, ${.8 * fCell.getOpacity() / FadingCell.maxOpacity})`;
              this.ctx.beginPath();
              this.ctx.moveTo(x + cellLength, y);
              this.ctx.lineTo(x + cellLength, y + cellLength);
              this.ctx.stroke();
            }
          }
        }
        if (cell.isLeftLink()) {
          this.ctx.lineWidth = this.getCellLineWidth();
          this.ctx.strokeStyle = "white";
          this.ctx.beginPath();
          this.ctx.moveTo(x, y);
          this.ctx.lineTo(x, y + cellLength);
          this.ctx.stroke();
        }
      }
    }

    if (this.simulation.getIsGeneratingMaze() && this.simulation.getMazeType() === MazeType.Wilson) {
      this.ctx.fillStyle = "#FFFF00";
      if (rows * cols === this.simulation.getUnvisitedCells().length + 1) {
        const visitedCell = matrix.flat().find(cell => !this.simulation.getUnvisitedCells().includes(cell)) as Cell;
        const { cX, cY } = this.convertRowColToXY(visitedCell.getRow(), visitedCell.getCol());
        this.ctx.beginPath();
        this.ctx.arc(cX, cY, 3, 0, 2*Math.PI);
        this.ctx.fill();
      }

      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = "#00FFFF";
      const wilsonPath = this.simulation.getWilsonPath();
      if (wilsonPath.length > 1) {
        this.ctx.beginPath();
        const { cX, cY } = this.convertRowColToXY(wilsonPath[0].getRow(), wilsonPath[1].getCol());
        this.ctx.moveTo(cX, cY);
        for (let i=1;i<wilsonPath.length;i++) {
          const { cX, cY } = this.convertRowColToXY(wilsonPath[i].getRow(), wilsonPath[i].getCol());
          this.ctx.lineTo(cX, cY);
        }
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(cX, cY, 3, 0, 2*Math.PI);
        this.ctx.fill();

        const { cX: lcX, cY: lcY } = this.convertRowColToXY(wilsonPath[wilsonPath.length - 1].getRow(), wilsonPath[wilsonPath.length - 1].getCol());
        this.ctx.beginPath();
        this.ctx.arc(lcX, lcY, 3, 0, 2*Math.PI);
        this.ctx.fill();
      }
    }

    if (this.simulation.getMazeType() !== MazeType.RecursiveDivision && this.drawFadingWalls.checked) {
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