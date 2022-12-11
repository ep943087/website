import AbstractTetromino from "./AbstractTetromino";
import Cell from "./Cell";

class TetrominoO extends AbstractTetromino
{
  protected static COLOR = "yellow";
  pieces = [
    new Cell(-1, 4, TetrominoO.COLOR),
    new Cell(-1, 5, TetrominoO.COLOR),
    new Cell(0, 4, TetrominoO.COLOR),
    new Cell(0, 5, TetrominoO.COLOR),
  ];

  protected rotationCell: Cell = this.pieces[0];
};

export default TetrominoO;