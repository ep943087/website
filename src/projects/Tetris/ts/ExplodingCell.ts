class ExplodingCell {
  private static readonly NUMBER_OF_BALLS = 10;
  private static readonly LIFE_SPAN = 100;
  private lifeSpanCount = 0;
  private explodingCellPieces: ExplodingCellPiece[] = [];

  getColor() { return this.color }
  getExplodingCells() { return this.explodingCellPieces }

  constructor(row: number, col: number, cellLength: number, private color: string) {
  const [x, y] = [col*cellLength+cellLength/2, row*cellLength+cellLength/2];
    for (let i=0;i<ExplodingCell.NUMBER_OF_BALLS;i++) {
      const explodingCellPiece = new ExplodingCellPiece(x, y);
      this.explodingCellPieces.push(explodingCellPiece);
    }
  }

  lifeSpanOver() {
    return this.lifeSpanCount >= ExplodingCell.LIFE_SPAN;
  }

  update() {
    this.explodingCellPieces.forEach(piece => {
      piece.update();
    });
    this.lifeSpanCount++;
  }
};

class ExplodingCellPiece {
  private static readonly VELOCITY = 40;
  private xVel: number;
  private yVel: number;

  constructor(private x: number, private y: number) {
    const angle = (Math.random()*Math.PI*.85)-Math.PI*.90;
    this.xVel = ExplodingCellPiece.VELOCITY * Math.cos(angle);
    this.yVel = ExplodingCellPiece.VELOCITY * Math.sin(angle);
  }

  getX() { return this.x }
  getY() { return this.y }

  update() {
    this.x += this.xVel;
    this.y += this.yVel;

    this.yVel += 4;
  }
}

export default ExplodingCell;