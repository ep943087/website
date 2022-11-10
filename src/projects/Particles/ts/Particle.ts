import Point from "./Point";

class Particle {
  
  private velocity = { x: 0, y: 0 };
  private static acc = .75;
  private static friction = .9;
  private static accFromMouse = 4;
  private hidden = false;

  constructor(private position: Point, private target: Point, private color: string) {}

  getPosition() { return this.position; }
  getTarget() { return this.target; }
  getColor() { return this.color; }
  getHidden() { return this.hidden; }
  setHidden(hidden: boolean) { this.hidden = hidden; if (hidden) this.color = ''; }
  setColor(color: string) { this.color = color; }

  calculateVelocity() {
    return Math.sqrt(
      Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2)
    );
  }

  accelerateTowardsTarget() {
    const angle = Math.atan2(this.target.getY() - this.position.getY(), this.target.getX() - this.position.getX());
    const xAcc = Particle.acc * Math.cos(angle);
    const yAcc = Particle.acc * Math.sin(angle);
    this.velocity.x += xAcc;
    this.velocity.y += yAcc;
  }

  setPositionToTarget() {
    this.position.setXY(this.target.getX(), this.target.getY());
  }

  update(mousePosition: Point, mouseRadius: number, isMouseDown: boolean) {
    if (this.hidden) {
      return;
    }

    if (!isMouseDown && Point.distance(mousePosition, this.position) < mouseRadius) {
      const angle = Math.atan2(this.position.getY() - mousePosition.getY(), this.position.getX() - mousePosition.getX());
      const xAcc = Particle.accFromMouse * Math.cos(angle);
      const yAcc = Particle.accFromMouse * Math.sin(angle);
      this.velocity.x += xAcc;
      this.velocity.y += yAcc;
      this.position.addXY(this.velocity.x, this.velocity.y);
    }

    if (Point.compare(this.position, this.target)) {
      // if position is already on target, then do nothing
    } else if (Point.distance(this.position, this.target) <= 3) {
      this.velocity.x = this.velocity.y = 0;
      this.position.setXY(this.target.getX(), this.target.getY());
    } else {
      this.position.addXY(this.velocity.x, this.velocity.y);
      this.accelerateTowardsTarget();

      this.velocity.x *= Particle.friction;
      this.velocity.y *= Particle.friction;
    }
  }
}

export default Particle;