class DeadBall {
  private xV: number = 0;
  private yV: number = 0;
  private static velocity = 25;
  public static deadBallPerBlock = 3;

  constructor(private x: number, private y: number) {
    const angle = 2 * Math.PI * Math.random();
    this.xV = DeadBall.velocity * Math.cos(angle);
    this.yV = DeadBall.velocity * Math.sin(angle);
  }

  getDimensions() { return {x: this.x, y: this.y}}

  update()
  {
    this.x += this.xV;
    this.y += this.yV;
    this.yV += 3;
  }

};

export default DeadBall;