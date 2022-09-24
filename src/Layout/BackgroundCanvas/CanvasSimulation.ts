import Ball from "./Ball";

class CanvasSimulation {
  private balls: Ball[] = [];
  constructor(private canvas: HTMLCanvasElement) {
    this.initialize();
  }

  initialize() {
    this.balls = [];
    const area = this.calculateArea();
    const count = area / 10000;
    for (let i=0;i<count;i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.balls.push(new Ball(x, y, this.canvas));
    }
  }

  handleWindowResize = () => {
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.initialize();
  }

  getBalls(): Ball[] {
    return this.balls;
  }

  calculateArea(): number {
    return this.canvas.width * this.canvas.height;
  }

  update = () => {
    this.balls.forEach(ball => {
      ball.accelerateByGravity(this.balls);
      ball.update();
    });
  }
}

export default CanvasSimulation;