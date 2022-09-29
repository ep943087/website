class Ball {
  private xVel: number = 0;
  private yVel: number = 0;
  private vel: number = .3;
  private radius: number = 3;

  private static gravitationalConstant = .005;
  private static maxVelocity = .6;

  constructor(private x: number, private y: number, private canvas: HTMLCanvasElement) {
    this.initializeVelocity();
  }

  public static calculateDistance(ballA: Ball, ballB: Ball): number {
    return Math.sqrt(Math.pow(ballA.x - ballB.x, 2) + Math.pow(ballA.y - ballB.y, 2));
  }

  initializeVelocity() {
    const angle = 2 * Math.PI * Math.random();
    this.xVel = this.vel * Math.cos(angle);
    this.yVel = this.vel * Math.sin(angle);
  }

  update() {
    this.x = this.checkValue(this.x + this.xVel, this.canvas.width);
    this.y = this.checkValue(this.y + this.yVel, this.canvas.height);
  }

  checkValue(val: number, max: number): number {
    if (val < 0) {
      return max + val;
    } else if (val > max) {
      return val - max;
    } else {
      return val;
    }
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getRadius(): number {
    return this.radius;
  }

  accelerateByGravity(balls: Ball[]): void {
    for (const ball of balls) {
      if (ball === this) {
        continue;
      }
      const distance = Ball.calculateDistance(ball, this);
      if (distance < 10) {
        continue;
      }
      const force =  Ball.gravitationalConstant * ball.radius * this.radius / Math.pow(distance, 2);
      const angle = Math.atan2(ball.y - this.y, ball.x - this.x);
      const xAcc = force * Math.cos(angle);
      const yAcc = force * Math.sin(angle);
      this.xVel += xAcc;
      this.yVel += yAcc;
    }
  }

  makeSureBelowMaxVelocity() {
    const velocity = this.getCurrentVelocity();
    if (velocity > Ball.maxVelocity) {
      const currentAngle = Math.atan2(this.yVel, this.xVel);
      this.xVel = Ball.maxVelocity * Math.cos(currentAngle);
      this.yVel = Ball.maxVelocity * Math.sin(currentAngle);
    }
  }

  getCurrentVelocity(): number {
    return Math.sqrt(Math.pow(this.xVel, 2) + Math.pow(this.yVel, 2));
  }
}

export default Ball;