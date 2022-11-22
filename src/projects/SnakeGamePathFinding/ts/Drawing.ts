import Block from "./Block";
import Simulation from "./Simulation";

class Drawing {

  private ctx: CanvasRenderingContext2D;

  constructor(
    private canvas: HTMLCanvasElement,
    private simulation: Simulation,
    private snakeType: HTMLSelectElement,
  ) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  drawGrid() {
    const { rows, cols, cellLength } = this.simulation.getDimensions();

    this.ctx.lineWidth = .1;
    this.ctx.strokeStyle = "white";
    const { x: gridEndX, y: gridEndY } = this.convertRowColXY(rows, cols);
    for (let i=0;i<=rows;i++) {
      const y = i * cellLength;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(gridEndX, y);
      this.ctx.stroke();
    }

    for (let i=0;i<=cols;i++) {
      const x = i * cellLength;
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, gridEndY);
      this.ctx.stroke();
    }
  }

  private convertRowColXY(row: number, col: number) {
    const { cellLength } = this.simulation.getDimensions();
    return {
      x: col * cellLength,
      y: row * cellLength,
      xC: (col * cellLength) + (cellLength / 2),
      yC: (row * cellLength) + (cellLength / 2),
    }
  }

  drawBlock(block: Block, color: string, percent?: number) {
    this.ctx.fillStyle = color;
    const { cellLength } = this.simulation.getDimensions();
    const { x, y } = this.convertRowColXY(block.getRow(), block.getCol());
    const sX = percent !== undefined ? x + (cellLength - cellLength * percent) / 2 : x;
    const sY = percent !== undefined ? y + (cellLength - cellLength * percent) / 2 : y;
    const length = percent !== undefined ? cellLength * percent : cellLength;
    this.ctx.fillRect(sX, sY, length, length);
  }

  calculateSnakeBlockColor(index: number) {
    const { rows, cols } = this.simulation.getDimensions();
    const snake = this.simulation.getSnake();
    const snakeBody = snake.getBody();
    if (this.snakeType.value === 'green') {
      return 'green';
    } else if (this.snakeType.value === 'color-length') {
      const snakeBody = this.simulation.getSnake().getBody();
      const hueValue = Math.floor(360 * index / snakeBody.length);
      return `hsl(${hueValue}, 100%, 50%)`;
    } else if (this.snakeType.value === 'color-position') {
      const distance = Math.sqrt(Math.pow(snakeBody[index].getRow(), 2) + Math.pow(snakeBody[index].getCol(), 2));
      const maxDistance = Math.sqrt(Math.pow(rows, 2) + Math.pow(cols, 2));
      const hueValue = Math.floor(360 * distance / maxDistance);
      return `hsl(${hueValue}, 100%, 50%)`;
    }

    return 'green';
  }

  drawSnake() {
    const snake = this.simulation.getSnake();
    const body = snake.getBody();

    const maxWidth = .9;
    const minWidth = .25;
    const diffWidth = maxWidth - minWidth;
    body.forEach((block, index) => {
      const calculateColor = this.calculateSnakeBlockColor(index);
      const color = this.simulation.isPathToFruitOrTail() ? calculateColor : 'white';
      const percent = ((body.length - index) / body.length) * diffWidth + minWidth;
      this.drawBlock(block, color, percent);
    });
  }

  drawDeadBalls() {
    this.simulation.getDeadBalls().forEach((deadBalls, index) => {
      const color = this.calculateSnakeBlockColor(index);
      this.ctx.fillStyle = color;

      deadBalls.forEach(ball => {
        const { x, y } = ball.getDimensions();
        this.ctx.fillRect(x, y, 4, 4);
      });
    });
  }

  drawFruit() {
    const fruit = this.simulation.getFruit();
    this.drawBlock(fruit, 'red', .75);
  }

  drawPath() {
    const path = this.simulation.getPath();
    if (path.length === 0) {
      return;
    }
    const color = 'orange';

    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = color;
    const { xC, yC } = this.convertRowColXY(path[0].getRow(), path[0].getCol());
    this.ctx.moveTo(xC, yC);
    for (let i=1;i<path.length;i++) {
      const { xC: blockXC, yC: blockYC } = this.convertRowColXY(path[i].getRow(), path[i].getCol());
      this.ctx.lineTo(blockXC, blockYC);
    }
    this.ctx.stroke();
  }

  draw = () => {
    const { rows, cols } = this.simulation.getDimensions();

    if (this.canvas.width !== this.canvas.offsetWidth || this.canvas.height !== this.canvas.offsetHeight) {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
      this.simulation.initialize();
      this.ctx.fillStyle = "black";
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }
    this.ctx.save();
    this.ctx.fillStyle = "black";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const { x: gridEndX, y: gridEndY } = this.convertRowColXY(rows, cols);
    this.ctx.translate((this.canvas.width - gridEndX) / 2, (this.canvas.height - gridEndY) / 2);

    if (this.simulation.getGameOver()) {
      this.drawFruit();
      this.drawDeadBalls();
    } else {
      this.drawPath();
      this.drawFruit();
      this.drawSnake();
    }
    this.drawGrid();
    this.ctx.restore();
  }
}

export default Drawing;