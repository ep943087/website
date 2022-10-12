import Block from "./Block";
import Snake from "./Snake";
import Cell from "./Cell";
import DeadBall from "./DeadBall";

class Simulation {
  private rows: number;
  private cols: number;
  private cellLength: number;
  private snake: Snake;
  private fruit: Block;
  private path: Cell[] = [];
  private gameOver: boolean = false;
  private deadBalls: DeadBall[][] = [];

  constructor(private canvas: HTMLCanvasElement) {
    this.rows = 0;
    this.cols = 0;
    this.cellLength = 25;
    this.snake = new Snake();
    this.fruit = new Block(0, 0);
    this.snake.initialize(this.rows / 2, this.cols / 2);
    this.initialize();
  }

  public initialize = () => {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.gameOver = false;

    this.rows = Math.floor(this.canvas.height / this.cellLength);
    this.cols = Math.floor(this.canvas.width / this.cellLength); 
    this.snake.initialize(this.rows / 2, this.cols / 2);
    this.initializeFruit();
  }

  public initializeDeadBalls() {
    this.deadBalls = [];
    const cellLength = this.cellLength;
    const halfLength = this.cellLength / 2;
    this.snake.getBody().forEach((block) => {
      const deadBalls = [];
      for (let i=0;i<DeadBall.deadBallPerBlock;i++) {
        const [y, x] = [block.getRow()*cellLength + halfLength, block.getCol()*cellLength + halfLength];
        deadBalls.push(new DeadBall(x, y));
      }
      this.deadBalls.push(deadBalls);
    });
  }

  public initializeFruit() {
    const { rows, cols } = this.getDimensions();
    let isOnBody = false;
    let row = 0, col = 0;
    do {
      row = Math.random()*rows;
      col = Math.random()*cols;
      const newFruit = new Block(row, col);
      isOnBody = this.snake.isBlockOnBody(newFruit);
    } while (isOnBody);
    this.fruit.setDimensions(row, col);
  }

  public getDimensions() {
    return { rows: this.rows, cols: this.cols, cellLength: this.cellLength };
  }

  public getSnake() { return this.snake; }
  public getFruit() { return this.fruit; }

  public update = (): void => {
    if (this.gameOver) {
      this.deadBalls.forEach(deadBalls => deadBalls.forEach(deadBall => deadBall.update()));
      return;
    }
    this.decideNextMove();
    this.snake.move();
    
    if (this.isSnakeOutOfBounds() || this.snakeCrashedIntoBody()) {
      this.gameOver = true;
      this.initializeDeadBalls();
      setTimeout(() => {
        this.initialize();
      }, 4000);
    } else if (this.isEatingFruit()) {
      this.snake.grow();
      this.initializeFruit();
    }

    if (!this.gameOver) {
      this.decideNextMove();
    }
  }

  private snakeCrashedIntoBody(): boolean {
    const body = this.snake.getBody();
    const head = this.snake.getHead();
    return body.some((block: Block) => (
      block !== head && Block.compare(block, head)
    ));
  }

  private isEatingFruit(): boolean {
    return Block.compare(this.fruit, this.snake.getHead());
  }

  private isSnakeOutOfBounds(): boolean {
    const head = this.snake.getHead();
    return head.getRow() < 0 || head.getRow() >= this.rows
      || head.getCol() < 0 || head.getCol() >= this.cols;
  }

  public getPath() {
    return this.path;
  }

  public getDeadBalls() {
    return this.deadBalls;
  }

  public getGameOver() {
    return this.gameOver;
  }

  public isPathToFruitOrTail() {
    return this.path.length > 0;
  }

  private getPathFindingGrid(): Cell[][] {
    const { rows, cols } = this.getDimensions();
    const grid: Cell[][] = [];

    for (let i=0;i<rows;i++) {
      const temp: Cell[] = [];
      for (let j=0;j<cols;j++) {
        temp.push(new Cell(i, j));
      }
      grid.push(temp);
    }

    for (let i=0;i<rows;i++) {
      for (let j=0;j<cols;j++) {
        grid[i][j].setNeighbors(grid);
      }
    }

    return grid;
  }

  private cellIsWall(cell: Cell, target: Block, targetPathLength: number) {
    const blockCell = new Block(cell.getRow(), cell.getCol());
    return this.snake.getBody().some((block, index, blocks) => {
      const isOverBlock = Block.compare(block, blockCell);
      const blockWontBeThere = (targetPathLength - (blocks.length - index)) >= 1;
      return !Block.compare(block, target) && isOverBlock && !blockWontBeThere;
    });
  }

  // return true if path exists, else false
  private calculatePathToTarget(targetBlock: Block): boolean {
    this.path = [];
    const grid = this.getPathFindingGrid();
    const closedList: Cell[] = [];
    const openList: Cell[] = [];

    const head = this.snake.getHead();
    const start = grid[head.getRow()][head.getCol()];
    const target = grid[targetBlock.getRow()][targetBlock.getCol()];    

    openList.push(start);

    while (openList.length > 0) {
      let smallestFIndex = 0;
      for (let i=1;i<openList.length;i++) {
        if (openList[i].getF() < openList[smallestFIndex].getF()) {
          smallestFIndex = i;
        }
      }

      const currentCell = openList[smallestFIndex];
      openList.splice(smallestFIndex, 1);
      closedList.push(currentCell);

      if (Cell.compare(currentCell, target)) {
        let current: Cell | null = currentCell;

        while (current !== null) {
          this.path.push(current);
          current = current.getPrevious();
        }
        this.path.reverse();
        return true;
      }

      currentCell.getNeighbors().forEach((neighbor: Cell) => {
        let neighborPathLength = 1;
        let neighborPath: Cell | null = currentCell;
        while (neighborPath) {
          neighborPathLength++;
          neighborPath = neighborPath.getPrevious();
        }
        if (this.cellIsWall(neighbor, targetBlock, neighborPathLength) || closedList.includes(neighbor)) {
          return;
        }

        const g = currentCell.getG() + Cell.distance(currentCell, neighbor);
        const h = Cell.distance(neighbor, target);
        const f = g + h; 

        if (openList.includes(neighbor)) {
          if (g > neighbor.getG()) {
            return;
          }
        }
        
        neighbor.setF(f);
        neighbor.setG(g);
        neighbor.setH(h);
        neighbor.setPrevious(currentCell);

        if (!openList.includes(neighbor)) {
          openList.push(neighbor);
        }
      });

    }

    return false;
  }

  decideNextMove(): void {
    this.calculatePathToTarget(this.fruit);
    if (this.path.length === 0) {
      this.calculatePathToTarget(this.snake.getTail());
    }

    /* CODE TO CHOOSE THE NEXT BODY PART AFTER TAIL, ALMOST ALWAYS DIES
      let i = this.snake.getBody().length - 1;

      while ((this.path.length === 0) || (i > 0 && i < this.snake.getBody().length - 1 && this.path.length <= 2)) {
        this.calculatePathToTarget(this.snake.getBody()[i]);
        i--;
      }
    */

    if (this.path.length > 0) {
      const currentPosition = this.path[0];
      const nextPosition = this.path[1];
      if (nextPosition.getRow() > currentPosition.getRow()) {
        this.snake.setDirectionDown();        
      } else if (nextPosition.getRow() < currentPosition.getRow()) {
        this.snake.setDirectionUp();
      } else if (nextPosition.getCol() > currentPosition.getCol()) {
        this.snake.setDirectionRight();
      } else if (nextPosition.getCol() < currentPosition.getCol()) {
        this.snake.setDirectionLeft();
      }
    } else {
      const head = this.snake.getHead();
      const leftBlock = new Block(head.getRow(), head.getCol() - 1);
      const rightBlock = new Block(head.getRow(), head.getCol() + 1);
      const upBlock = new Block(head.getRow() - 1, head.getCol());
      const downBlock = new Block(head.getRow() + 1, head.getCol());

      if (!this.movingToBlockWillResultInDeath(upBlock)) {
        this.snake.setDirectionUp();
      } else if (!this.movingToBlockWillResultInDeath(leftBlock)) {
        this.snake.setDirectionLeft();
      } else if (!this.movingToBlockWillResultInDeath(downBlock)) {
        this.snake.setDirectionDown();
      } else if (!this.movingToBlockWillResultInDeath(rightBlock)) {
        this.snake.setDirectionRight();
      }
    }
  }

  movingToBlockWillResultInDeath(blockToMove: Block) {
    return blockToMove.getRow() >= this.rows
      || blockToMove.getRow() < 0
      || blockToMove.getCol() >= this.cols
      || blockToMove.getCol() < 0
      || this.snake.isBlockOnBody(blockToMove)
  }
};

export default Simulation;