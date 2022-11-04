import { DijkstraDisplayType, MazeType } from "../types";
import Cell from "./Cell";
import DijkstraCell from "./DijkstraCell";
import FadingCell from "./FadingCell";
import FadingWall from "./FadingWall";
import Simulation from "./Simulation";

class Drawing {
  private ctx: CanvasRenderingContext2D;
  private mousePosition: { x: number, y: number } = { x: 0, y: 0 };
  private pathOffset: number = 0;

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
  
  setMousePosition(mousePosition: { x: number, y: number }) {
    const { x, y } = this.getCanvasTranslation();
    mousePosition.x -= x;
    mousePosition.y -= y;
    this.mousePosition = mousePosition;
  }

  convertRowColToXY(row: number, col: number) {
    return this.simulation.convertRowColToXY(row, col);
  }

  drawArrow(cX: number, cY: number, pcX: number, pcY: number) {
    const { cellLength } = this.simulation.getDimensions();
    const aTip = cellLength * .22;
    let [x1, y1, x2, y2, x3, y3] = [0, 0, 0, 0, 0, 0];
    if (cX > pcX) {
      [x1, y1, x2, y2, x3, y3] = [cX-aTip, cY-aTip, cX, cY, cX-aTip, cY+aTip];
    } else if (cX < pcX) {
      [x1, y1, x2, y2, x3, y3] = [cX+aTip, cY-aTip, cX, cY, cX+aTip, cY+aTip];
    } else if (cY > pcY) {
      [x1, y1, x2, y2, x3, y3] = [cX-aTip, cY-aTip, cX, cY, cX+aTip, cY-aTip];
    } else if (cY < pcY) {
      [x1, y1, x2, y2, x3, y3] = [cX-aTip, cY+aTip, cX, cY, cX+aTip, cY+aTip];
    }
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x3, y3);
    this.ctx.fill();
  }

  drawDijkstraCellPath(dijkstraCell: DijkstraCell) {
    const path = dijkstraCell.getPath();
    this.ctx.lineWidth = 1.5;
    path.forEach((cell, index) => {
      if (index === path.length - 1) {
        return;
      }
      const hue = ((index + this.pathOffset) % path.length) / path.length * 360;
      this.pathOffset = (this.pathOffset + 1) % path.length;
      this.pathOffset = isNaN(this.pathOffset) ? 0 : this.pathOffset;
      this.ctx.fillStyle = this.ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      const nextCell = path[index+1];
      const { cX, cY } = this.convertRowColToXY(cell.getRow(), cell.getCol());
      const { cX: pcX, cY: pcY } = this.convertRowColToXY(nextCell.getRow(), nextCell.getCol());
      this.ctx.beginPath();
      this.ctx.moveTo(cX, cY);
      this.ctx.lineTo(pcX, pcY);
      this.ctx.stroke();
      this.ctx.closePath();

      this.drawArrow(cX, cY, pcX, pcY);
    });
  }

  getCellLineWidth() {
    return this.drawSpanningTree.checked || (this.showDijkstraAlgo.checked && this.simulation.getIsMazeComplete()) ? .2 : 1;
  }

  drawDijkstraPathArrowsForAllCells() {
    const grid = this.simulation.getDijkstraGrid().flat();
    let maxDistanceIndex = 0;
    for (let i=1;i<grid.length;i++) {
      if (grid[i].getDistance() !== Infinity && grid[i].getDistance() > grid[maxDistanceIndex].getDistance()) {
        maxDistanceIndex = i;
      }
    }
    const maxDistance = grid[maxDistanceIndex].getDistance();
    this.pathOffset = (this.pathOffset + 3) % maxDistance;
    this.pathOffset = isNaN(this.pathOffset) ? 0 : this.pathOffset;
    this.ctx.lineWidth = 1.5;
    grid.forEach((dCell) => {
      if (dCell.getDistance() === Infinity) {
        return;
      }
      const previous = dCell.getPrevious();
      if (!previous) { 
        return;
      }
      const { cX, cY } = this.convertRowColToXY(dCell.getRow(), dCell.getCol());
      const { cX: pcX, cY: pcY } = this.convertRowColToXY(previous.getRow(), previous.getCol());
      let opacity = 0;
      if ([DijkstraDisplayType.opacityByDistancePulse, DijkstraDisplayType.colorfulPulse].includes(
        this.dijkstraDiplay.value as DijkstraDisplayType
      ) && !this.simulation.getIsGeneratingDijkstra()) {
        opacity = ((dCell.getDistance() + this.pathOffset) % maxDistance) / maxDistance;
      } else {
        opacity = (dCell.getDistance()) / maxDistance;
      }
      
      this.ctx.fillStyle = this.ctx.strokeStyle = [
        DijkstraDisplayType.opacityByDistance, DijkstraDisplayType.opacityByDistancePulse
      ].includes(this.dijkstraDiplay.value as DijkstraDisplayType) ?
        `rgba(0, 255, 0, ${opacity})` 
        : `hsl(${opacity * 260}, 100%, 50%)`;
      this.ctx.beginPath();
      this.ctx.moveTo(cX, cY);
      this.ctx.lineTo(pcX, pcY);
      this.ctx.stroke();

      this.drawArrow(cX, cY, pcX, pcY);
    });
  }

  drawGrid() {
    const matrix = this.simulation.getGrid().getMatrix();
    const { rows, cols, cellLength } = this.simulation.getDimensions();

    if (this.simulation.getIsMazeComplete() && !this.simulation.getIsGeneratingDijkstra() && this.showDijkstraAlgo.checked) {
      const grid = this.simulation.getDijkstraGrid().flat();
      let maxDistanceIndex = 0;
      for (let i=1;i<grid.length;i++) {
        if (grid[i].getDistance() > grid[maxDistanceIndex].getDistance()) {
          maxDistanceIndex = i;
        }
      }

      if (this.dijkstraDiplay.value === DijkstraDisplayType.cornerToCornerPath) {
        this.drawDijkstraCellPath(this.simulation.getDijkstraGrid()[rows-1][cols-1]);
      } else if (this.dijkstraDiplay.value === DijkstraDisplayType.pathToMaxDistance) {
        this.drawDijkstraCellPath(grid[maxDistanceIndex]);
      } else if (this.dijkstraDiplay.value === DijkstraDisplayType.pathToMouse) {
        let row: number = ~~(this.mousePosition.y / this.simulation.getCellLength());
        let col: number = ~~(this.mousePosition.x / this.simulation.getCellLength());
        if (row < 0) {
          row = 0;
        } else if (row >= rows) {
          row = rows - 1;
        }
        if (col < 0) {
          col = 0;
        } else if (col >= cols) {
          col = cols - 1;
        }
        this.drawDijkstraCellPath(this.simulation.getDijkstraGrid()[row][col]);
      }
    }

    if (this.simulation.getIsGeneratingDijkstra()
      || (this.showDijkstraAlgo.checked && [
        DijkstraDisplayType.colorFul,
        DijkstraDisplayType.colorfulPulse,
        DijkstraDisplayType.opacityByDistance,
        DijkstraDisplayType.opacityByDistancePulse,
      ].includes(this.dijkstraDiplay.value as DijkstraDisplayType))) {
      this.drawDijkstraPathArrowsForAllCells();
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

  getCanvasTranslation() {
    const { rows, cols } = this.simulation.getDimensions();
    const { x: gridEndX, y: gridEndY } = this.convertRowColToXY(rows, cols);
    return {
      x: (this.canvas.width - gridEndX) / 2,
      y: (this.canvas.height - gridEndY) / 2
    };
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
    const { x, y } = this.getCanvasTranslation();
    this.ctx.translate(x, y);

    this.drawGrid();

    this.ctx.restore();
  };
};

export default Drawing;