import HitBox from "../../../utils/HitBox";

abstract class Enemy extends HitBox {
  private static VELOCITY = 4;

  constructor() {
    super();
    this.x = 1250;
    this.height = 50;
    this.width = 100;
  }
  
  update() {
    this.x -= Enemy.VELOCITY;
  }

  isOutOfBounds() {
    return this.x < (-this.width/2);
  }
};

export default Enemy;