import Block from "./Block";

export enum Directions {
  UP, DOWN, LEFT, RIGHT,
}

class Snake {
  private body: Block[] = [];
  private direction: Directions;

  constructor() {
    this.body = [];
    this.direction = Directions.RIGHT;
  }

  initialize(row: number, col: number) {
    this.body = [
      new Block(row, col),
    ];
  }

  getBody() {
    return this.body;
  }

  getHead() {
    return this.body[0];
  }

  move() {
    for (let i=this.body.length-1;i>0;i--) {
      this.body[i].setDimensions(this.body[i-1].getRow(), this.body[i-1].getCol());
    }

    if (this.body.length > 0) {
      switch (this.direction) {
        case Directions.UP: this.body[0].moveUp();
          break;
        case Directions.DOWN: this.body[0].moveDown();
          break;
        case Directions.LEFT: this.body[0].moveLeft();
          break;
        case Directions.RIGHT: this.body[0].moveRight();
          break;
      }
    }
  }

  grow() {
    const tail = this.getTail();
    this.body.push(new Block(tail.getRow(), tail.getCol()));
  }

  isBlockOnBody(blockToCompare: Block) {
    return this.body.some(block => Block.compare(block, blockToCompare));
  }

  getTail() {
    return this.body[this.body.length - 1];
  }

  setDirectionUp() { this.direction = Directions.UP; }
  setDirectionDown() { this.direction = Directions.DOWN; }
  setDirectionLeft() { this.direction = Directions.LEFT; }
  setDirectionRight() { this.direction = Directions.RIGHT; }
}

export default Snake;