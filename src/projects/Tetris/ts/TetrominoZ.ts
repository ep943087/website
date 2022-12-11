import AbstractTetromino from "./AbstractTetromino";
import Cell from "./Cell";

class TetrominoZ extends AbstractTetromino
{
  private static COLOR = "rgb(255, 0, 0)";
  pieces = [
    new Cell(-1, 4, TetrominoZ.COLOR),
    new Cell(-1, 5, TetrominoZ.COLOR),
    new Cell(0, 5, TetrominoZ.COLOR),
    new Cell(0, 6, TetrominoZ.COLOR),
  ];

  rotationCell = this.pieces[1];
};

export default TetrominoZ;