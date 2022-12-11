import CanvasTools from "../../../utils/CanvasTools";
import Grid from "./Grid";
import Simulation from "./Simulation";

class Drawing {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private static readonly BACKGROUND_COLOR = "black";
  private static readonly GRID_COLOR = "white";
  constructor(private simulation: Simulation) {
    this.canvas = simulation.getCanvas();
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  getXYByRowCol(row: number, col: number) {
    return { x: (col+5) * this.simulation.getCellLength(), y: row * this.simulation.getCellLength()};
  }

  drawGrid() {
    const matrix = this.simulation.getGridMatrix();

    for (let i=0;i<Grid.ROWS;i++) {
      for (let j=0;j<Grid.COLS;j++) {
        const cell = matrix[i][j];
        const color = cell.getIsFilled() ? cell.getColor() : "";
        this.drawCell(i, j, color, true);
      }
    }
  }

  drawCell(row: number, col: number, color: string, drawOutline: boolean, drawOutlineAlways: boolean = false) {
    const cellLength = this.simulation.getCellLength();
    const matrix = this.simulation.getGridMatrix();
    const { x, y } = this.getXYByRowCol(row, col);
    this.ctx.lineWidth = .5;
    this.ctx.strokeStyle = Drawing.GRID_COLOR;
    if (color !== '') {
      this.ctx.strokeStyle = "gray";
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, cellLength, cellLength);
    }
    if (drawOutline && !this.simulation.getRowsCleared().includes(row)) {
      if (drawOutlineAlways || row <= 0 || !matrix[row-1][col].getIsFilled()) {
        CanvasTools.drawLine(this.ctx, x, y,x+cellLength, y);
      }
      if (drawOutlineAlways || row >= Grid.ROWS-1 || !matrix[row+1][col].getIsFilled()) {
        CanvasTools.drawLine(this.ctx, x, y+cellLength, x+cellLength, y+cellLength);
      }
      if (drawOutlineAlways || col <= 0 || !matrix[row][col-1].getIsFilled()) {
        CanvasTools.drawLine(this.ctx, x, y, x, y+cellLength);
      }
      if (drawOutlineAlways || col >= Grid.COLS-1 || !matrix[row][col+1].getIsFilled()) {
        CanvasTools.drawLine(this.ctx, x+cellLength, y, x+cellLength, y+cellLength);
      }
    }
  }

  drawCurrentTetromino() {
    const current = this.simulation.getCurrentTetromino();
    current.getPieces().forEach(piece => {
      this.drawCell(piece.getRow(), piece.getCol(), piece.getColor(), false);
    });
  }

  drawNextTetromino() {
    const next = this.simulation.getNextTetromino();
    next.getPieces().forEach(piece => {
      this.drawCell(piece.getRow()+6, piece.getCol()+7, piece.getColor(), true, true);
    })
  }

  drawCurrentAllDownPosition() {
    const current = this.simulation.getCurrentTetromino();
    const allDownPosition = current.getAllDownPosition();
    this.ctx.globalAlpha = .35;
    allDownPosition.getPieces().forEach(piece => {
      this.drawCell(piece.getRow(), piece.getCol(), piece.getColor(), false);
    });
    this.ctx.globalAlpha = 1;
  }

  drawScores() {
    this.ctx.fillStyle = Drawing.GRID_COLOR;
    this.ctx.textAlign = "left";
    this.ctx.font = "16px Monospace";
    this.ctx.textBaseline = "top";
    this.ctx.fillText(`High Score: ${this.simulation.getHighScore()}`, 395, 10);
    this.ctx.fillText(`Score: ${this.simulation.getScore()}`, 395, 40);
  }

  drawExplodingPieces() {
    this.simulation.getExplodingCells().forEach(cell => {
      cell.getExplodingCells().forEach(piece => {
        CanvasTools.drawRectFromCenter(this.ctx, piece.getX(), piece.getY(), 3, 8, cell.getColor());
      });
    });
  }

  draw = () => {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    
    this.ctx.fillStyle = Drawing.BACKGROUND_COLOR;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawNextTetromino();
    if (this.simulation.getRowsCleared().length === 0) {
      this.drawCurrentAllDownPosition();
      this.drawCurrentTetromino();
    }
    this.drawGrid();
    this.drawExplodingPieces();
    this.drawScores();
  }
};

export default Drawing;