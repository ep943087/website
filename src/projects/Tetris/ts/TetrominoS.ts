import AbstractTetromino from "./AbstractTetromino";
import Cell from "./Cell";

class TetrominoS extends AbstractTetromino
{
  private static COLOR = "rgb(0, 255, 0)";
  pieces = [
    new Cell(0, 4, TetrominoS.COLOR),
    new Cell(0, 5, TetrominoS.COLOR),
    new Cell(-1, 5, TetrominoS.COLOR),
    new Cell(-1, 6, TetrominoS.COLOR),
  ];
  protected rotationCell: Cell = this.pieces[2];
};

export default TetrominoS;