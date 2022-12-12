import AbstractTetromino from "./AbstractTetromino";
import Cell from "./Cell";

class TetrominoJ extends AbstractTetromino
{
  private static COLOR = "#0000FF";

  pieces = [
    new Cell(0, 4, TetrominoJ.COLOR),
    new Cell(0, 5, TetrominoJ.COLOR),
    new Cell(-1, 5, TetrominoJ.COLOR),
    new Cell(-2, 5, TetrominoJ.COLOR),
  ];

  rotationCell = this.pieces[2];
};

export default TetrominoJ;