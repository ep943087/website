class ImageParticle {
  private velocity: number = 1;
  constructor(
    private targetX: number,
    private targetY: number,
    private length: number,
    private x: number,
    private y: number,
    private color: string,
  ) {
  }

  getInPosition(): boolean { return this.targetX === this.x && this.targetY === this.y; }
  getDimensions() {
    return {
      targetX: this.targetX,
      targetY: this.targetY,
      length: this.length,
      x: this.x,
      y: this.y,
      color: this.color,
    };
  }

  update() {
    const distance = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2));
    if (distance < this.velocity) {
      [this.x, this.y] = [this.targetX, this.targetY];
    } else {
      const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
      const xVel = this.velocity * Math.cos(angle);
      const yVel = this.velocity * Math.sin(angle);
      this.x += xVel;
      this.y += yVel;
    }
  }

  rotate(centerX: number, centerY: number, angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    let x = this.x;
    let y = this.y;
  
    // translate point back to origin:
    x -= centerX;
    y -= centerY;
  
    // rotate point
    const newX = x * c - y * s;
    const newY = x * s + y * c;
  
    // translate point back:
    this.x = newX + centerX;
    this.y = newY + centerY;
  }
};

export default ImageParticle;