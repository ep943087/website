import CanvasTools from "../../../utils/CanvasTools";
import Simulation from "./Simulation";

class Drawing {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  constructor(private simulation: Simulation) {
    this.canvas = this.simulation.getCanvas();
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  drawSijalu() {
    const sijalu = this.simulation.getSijalu();
    CanvasTools.drawRectFromCenter(this.ctx, sijalu.getX(), sijalu.getY(), sijalu.getWidth(), sijalu.getHeight(), 'blue');
  }

  drawEnemies() {
    this.simulation.getEnemies().forEach(enemy => {
      CanvasTools.drawRectFromCenter(this.ctx, enemy.getX(), enemy.getY(), enemy.getWidth(), enemy.getHeight(), 'red');
    });
  }
  
  drawGround() {
    this.ctx.strokeStyle = "black";
    this.ctx.beginPath();
    this.ctx.moveTo(0, Simulation.BOTTOM_LINE - 10);
    this.ctx.lineTo(this.canvas.width, Simulation.BOTTOM_LINE - 10);
    this.ctx.stroke();
  }

  drawScore() {
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.fillStyle = "black";
    this.ctx.font = "16px Comic Sans MS";
    const highScore = CanvasTools.addLeadingZeroesToNumber(this.simulation.getHighScore(), 5);
    const score = CanvasTools.addLeadingZeroesToNumber(this.simulation.getScore(), 5);
    this.ctx.fillText(`HI ${highScore} ${score}`, 10, 10);
  }

  draw = () => {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.ctx.fillStyle = "white";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawGround();
    this.drawEnemies();
    this.drawSijalu();
    this.drawScore();
  }
};

export default Drawing;