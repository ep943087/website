import Transormations, { Point } from "../../../utils/Transformations";
import Cell from "./Cell";
import Grid, { GridCell } from "./Grid";
import TetrominoI from "./TetrominoI";

abstract class AbstractTetromino {
  protected pieces: Cell[] = [];
  protected abstract rotationCell: Cell;

  constructor(private matrix: GridCell[][]) {}

  getPieces() { return this.pieces }

  getAllDownPosition(): AbstractTetromino {
    const allDownPosition = new TetrominoI(this.matrix);
    allDownPosition.copyPieces(this.getPieces());
    while (allDownPosition.canMoveDown()){
      allDownPosition.moveDown();
    }
    return allDownPosition;
  }

  copyPieces(pieces: Cell[]) {
    this.pieces = pieces.map(piece => new Cell(piece.getRow(), piece.getCol(), piece.getColor()));
  }

  rotate(angle: number) {
    const points: Point[] = this.pieces.map(piece => ({
      x: piece.getCol(),
      y: piece.getRow(),
    }));

    const center: Point = {
      x: this.rotationCell.getCol(),
      y: this.rotationCell.getRow(),
    };

    const newPoints: Point[] = Transormations.rotatePoints(points, center, angle);

    newPoints.forEach((point, index) => {
      this.pieces[index].setRow(Math.round(point.y));
      this.pieces[index].setCol(Math.round(point.x));
    });
  }

  validRotation(): boolean {
    return this.pieces.every(piece => (
      piece.getRow() < Grid.ROWS
      && piece.getCol() < Grid.COLS
      && piece.getCol() >= 0
      && (
        piece.getRow() < 0 ||
        !this.matrix[piece.getRow()][piece.getCol()].getIsFilled()
      )
    ));
  }

  rotateRight() {
    this.rotate(Math.PI/2);
    if (!this.validRotation()) {
      this.rotate(-Math.PI/2);
    }
  }

  rotateLeft() {
    this.rotate(-Math.PI/2);
    if (!this.validRotation()) {
      this.rotate(Math.PI/2);
    }
  }

  moveRight() {
    this.pieces.forEach(piece => piece.moveRight());
  }

  moveLeft() {
    this.pieces.forEach(piece => piece.moveLeft());
  }

  moveDown() {
    this.pieces.forEach(piece => piece.moveDown());
  }

  canMoveDown() {
    return this.pieces.every(piece => piece.canMoveDown(this.matrix));
  }

  canMoveRight() {
    return this.pieces.every(piece => piece.canMoveRight(this.matrix));
  }

  canMoveLeft() {
    return this.pieces.every(piece => piece.canMoveLeft(this.matrix));
  }
}

export default AbstractTetromino;