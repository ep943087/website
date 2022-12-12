import AbstractTetromino from "./AbstractTetromino";
import Cell from "./Cell";

class TetrominoI extends AbstractTetromino {
  protected static COLOR = '#00FFFF';
  protected pieces = [
    new Cell(-3, 5, TetrominoI.COLOR),
    new Cell(-2, 5, TetrominoI.COLOR),
    new Cell(-1, 5, TetrominoI.COLOR),
    new Cell(0, 5, TetrominoI.COLOR),
  ];
  protected rotationCell = this.pieces[1];
};

export default TetrominoI;