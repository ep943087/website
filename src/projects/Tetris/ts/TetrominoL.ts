import AbstractTetromino from "./AbstractTetromino";
import Cell from "./Cell";

class TetrominoL extends AbstractTetromino
{
  private static COLOR = "orange";
  pieces = [
    new Cell(0, 4, TetrominoL.COLOR),
    new Cell(0, 5, TetrominoL.COLOR),
    new Cell(-1, 4, TetrominoL.COLOR),
    new Cell(-2, 4, TetrominoL.COLOR),
  ];

  protected rotationCell: Cell = this.pieces[2];
};

export default TetrominoL;