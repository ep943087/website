import AbstractTetromino from "./AbstractTetromino";
import Cell from "./Cell";

class TetrominoT extends AbstractTetromino
{
  private static COLOR = "hotpink";
  pieces = [
    new Cell(-1, 4, TetrominoT.COLOR),
    new Cell(-1, 5, TetrominoT.COLOR),
    new Cell(-1, 6, TetrominoT.COLOR),
    new Cell(0, 5, TetrominoT.COLOR),
  ];
  protected rotationCell: Cell = this.pieces[1];
};

export default TetrominoT;