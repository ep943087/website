class HitBox {
  protected x: number = 0;
  protected y: number = 0;
  protected width: number = 0;
  protected height: number = 0;

  getX() { return this.x }
  getY() { return this.y }
  getWidth() { return this.width }
  getHeight() { return this.height }

  getRect() {
    return [
      this.x - this.width/2,
      this.y - this.height/2,
      this.x + this.width/2,
      this.y + this.height/2,
    ];
  }

  collision(otherObject: HitBox) {
    const a = this.getRect();
    const b = otherObject.getRect();
    const widthIsPositive = Math.min(a[2], b[2]) > Math.max(a[0], b[0]);
    const heightIsPositive = Math.min(a[3], b[3]) > Math.max(a[1], b[1]);
    return widthIsPositive && heightIsPositive;
  }
}

export default HitBox;