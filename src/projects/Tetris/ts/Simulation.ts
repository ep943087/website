import AbstractTetromino from "./AbstractTetromino";
import ExplodingCell from "./ExplodingCell";
import Grid from "./Grid";
import TetrominoI from "./TetrominoI";
import TetrominoJ from "./TetrominoJ";
import TetrominoL from "./TetrominoL";
import TetrominoO from "./TetrominoO";
import TetrominoS from "./TetrominoS";
import TetrominoT from "./TetrominoT";
import TetrominoZ from "./TetrominoZ";

class Simulation
{
  private grid: Grid = new Grid();
  private currentTetromino: AbstractTetromino = this.getRandomTetromino();
  private nextTetromino: AbstractTetromino = this.getRandomTetromino();
  private gameOver: boolean = false;
  private rowsCleared: number[] = [];
  public static MOVE_DOWN_DELAY_MAX: number = 25;
  public static CLEAR_CELL_DELAY_MAX: number = 1;
  private clearCellDelay: number = 0;
  private moveDownDelay: number = 0;
  private score: number = 0;
  private highScore: number = 0;
  private static readonly TETRIS_HIGH_SCORE_KEY = 'tetrisHighScore';
  private explodingCells: ExplodingCell[] = [];
  private paused: boolean = false;

  constructor(private canvas: HTMLCanvasElement) {
    const highScore = localStorage.getItem(Simulation.TETRIS_HIGH_SCORE_KEY);
    this.highScore = highScore === null ? 0 : parseInt(highScore);
    this.highScore = isNaN(this.highScore) ? 0 : this.highScore;
  }

  getCanvas() { return this.canvas; }
  getGridMatrix() { return this.grid.getMatrix() }
  getCurrentTetromino() { return this.currentTetromino }
  getNextTetromino() { return this.nextTetromino }
  getGameOver() { return this.gameOver }
  getRowsCleared() { return this.rowsCleared }
  getScore() { return this.score }
  getHighScore() { return this.highScore }
  getExplodingCells() { return this.explodingCells }
  getPaused() { return this.paused }

  togglePaused() {
    this.paused = !this.paused;
  }

  getCellLength() {
    return 25;
  }

  checkHighScore() {
    this.highScore = Math.max(this.highScore, this.score);
    localStorage.setItem(Simulation.TETRIS_HIGH_SCORE_KEY, this.highScore.toString());
  }

  addPointsToScore(points: number) {
    this.score += points;
    this.checkHighScore();
  }

  reset() {
    this.grid.reset();
    this.currentTetromino = this.getRandomTetromino();
    this.nextTetromino = this.getRandomTetromino();
    this.gameOver = false;
    this.score = 0;
    this.explodingCells = [];
    this.paused = false;
  }

  setRowsCleared() {
    const matrix = this.getGridMatrix();
    this.rowsCleared = [];
    for (let i=0;i<Grid.ROWS;i++) {
      let rowCleared = true;
      for (let j=0;j<Grid.COLS;j++) {
        if (!matrix[i][j].getIsFilled()) {
          rowCleared = false;
          break;
        }
      }
      if (rowCleared) {
        this.rowsCleared.push(i);
      }
    }
    switch (this.rowsCleared.length) {
      case 1:
        this.addPointsToScore(40);
        break;
      case 2:
        this.addPointsToScore(100);
        break;
      case 3:
        this.addPointsToScore(300);
        break;
      case 4:
        this.addPointsToScore(1200);
        break;
    }
  }

  private getRandomTetromino(): AbstractTetromino {
    const matrix = this.getGridMatrix();
    const r = ~~(Math.random()*7);
    switch (r) {
      case 0: return new TetrominoI(matrix);
      case 1: return new TetrominoO(matrix);
      case 2: return new TetrominoT(matrix);
      case 3: return new TetrominoJ(matrix);
      case 4: return new TetrominoL(matrix);
      case 5: return new TetrominoS(matrix);
      case 6: return new TetrominoZ(matrix);
    }
    return new TetrominoI(matrix);
  }

  addCurrentCellToGrid() {
    const matrix = this.grid.getMatrix();
    this.currentTetromino.getPieces().forEach(piece => {
      if (piece.getRow() >= 0) {
        matrix[piece.getRow()][piece.getCol()].setIsFilled(true);
        matrix[piece.getRow()][piece.getCol()].setColor(piece.getColor());
      } else {
        this.gameOver = true;
      }
    });
    if (this.gameOver) {
      this.reset();
      return;
    }
    this.setRowsCleared();
    this.currentTetromino = this.nextTetromino;
    this.nextTetromino = this.getRandomTetromino();
    this.resetMoveDownDelay();
  }

  shiftRows() {
    const matrix = this.getGridMatrix();
    while (this.rowsCleared.length > 0) {
      for (let i=this.rowsCleared[0];i>0;i--) {
        for (let j=0;j<Grid.COLS;j++) {
          matrix[i][j].setIsFilled(matrix[i-1][j].getIsFilled());
          matrix[i][j].setColor(matrix[i-1][j].getColor());
        }
      }
      this.rowsCleared.splice(0, 1);
    }
  }

  resetMoveDownDelay() {
    this.moveDownDelay = 0;
  }

  rowsAreCleared() {
    const matrix = this.getGridMatrix();
    return this.rowsCleared.every(row => (
      matrix[row].every(cell => (
        !cell.getIsFilled()
      ))
    ));
  }

  clearOneCellOnEachRow() {
    const matrix = this.getGridMatrix();
    this.rowsCleared.forEach((row, index) => {
      const matrixRow = [...matrix[row]];
      matrixRow.some(cell => {
        if (cell.getIsFilled()) {
          const explodingCell = new ExplodingCell(cell.getRow(), cell.getCol()+1, this.getCellLength(), cell.getColor());
          this.explodingCells.push(explodingCell);
          cell.setIsFilled(false);
          cell.setColor("");
          return true;
        }
        return false;
      });
    });
  }

  update = () => {
    if (this.paused) {
      return;
    }

    for (let i=this.explodingCells.length-1;i>=0;i--) {
      this.explodingCells[i].update();
      if (this.explodingCells[i].lifeSpanOver()) {
        this.explodingCells.splice(i, 1);
      }
    }
    if (this.rowsCleared.length > 0) {
      if (!this.rowsAreCleared()) {
        if (this.clearCellDelay === Simulation.CLEAR_CELL_DELAY_MAX) {
          this.clearOneCellOnEachRow();
          this.clearCellDelay = 0;
        } else {
          this.clearCellDelay++;
        }
      } else {
        this.shiftRows();
      }
    } else if (this.moveDownDelay === Simulation.MOVE_DOWN_DELAY_MAX) {
      if (this.currentTetromino.canMoveDown()) {
        this.currentTetromino.moveDown();
      } else {
        this.addCurrentCellToGrid();
      }
      this.resetMoveDownDelay();
    } else {
      this.moveDownDelay++;
    }
  }
}

export default Simulation;