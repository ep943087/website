import Ball from "./Ball";
import CanvasSimulation from "./CanvasSimulation";

class CanvasDrawing {
  private ctx: CanvasRenderingContext2D;
  constructor(private canvas: HTMLCanvasElement, private simulation: CanvasSimulation) {
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  drawBalls () {
    const balls = this.simulation.getBalls();
    const drawDistance = 200;
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = "var(--dark-color)";
    this.ctx.strokeStyle = "var(--dark-color)";
    for (let i=0;i<balls.length;i++) {
      this.ctx.globalAlpha = .7;
      this.drawBall(balls[i]);
      for (let j=0;j<balls.length;j++) {
        const distance = Ball.calculateDistance(balls[i], balls[j]);
        if (distance > drawDistance) {
          continue;
        }
        this.ctx.globalAlpha = .3 * (.6 - distance / drawDistance + .4);
        this.ctx.beginPath();
        this.ctx.moveTo(balls[i].getX(), balls[i].getY());
        this.ctx.lineTo(balls[j].getX(), balls[j].getY());
        this.ctx.stroke();
      }
      this.ctx.globalAlpha = 1;
    }
  }

  drawBall(ball: Ball) {
    this.ctx.beginPath();
    this.ctx.arc(ball.getX(), ball.getY(), ball.getRadius(), 0, 2*Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }

  draw = () => {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBalls();
  }
}

export default CanvasDrawing;