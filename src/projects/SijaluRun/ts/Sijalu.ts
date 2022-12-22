import HitBox from "../../../utils/HitBox";
import Simulation from "./Simulation";

class Sijalu extends HitBox{
  private isJumping: boolean = false;
  private isDead: boolean = false;
  private yVel: number = 0;
  private static INITIAL_Y_VELOCITY = -6.5;
  private static GRAVITY = .4;
  private isMouseDown: boolean = false;
  private mouseDownCount: number = 0;
  
  constructor() {
    super();
    this.x = 50;
    this.width = 40;
    this.height = 60;
    this.y = this.getInitialY();
  }

  getInitialY() {
    return Simulation.getInitialY(this.height);
  }
  getIsDead() { return this.isDead }
  getIsJumping() { return this.isJumping }

  setIsDead(isDead: boolean) {
    this.isDead = isDead;
  }

  setIsMouseDown(isMouseDown: boolean) {
    this.isMouseDown = isMouseDown
    this.mouseDownCount = 0;
  }

  jump() {
    if (!this.isJumping) {
      this.yVel = Sijalu.INITIAL_Y_VELOCITY;
      this.isJumping = true;
    }
  }

  reset() {
    this.y = this.getInitialY();
    this.isDead = false;
    this.isJumping = false;
    this.mouseDownCount = 0;
    this.isMouseDown = false;
  }

  update() {
    if (this.isDead) { return }

    if (this.isJumping) {
      this.y += this.yVel;
      const skipGravity = this.isMouseDown && this.mouseDownCount < 20;
      if (skipGravity) {
        this.mouseDownCount++;
      } else {
        this.yVel += Sijalu.GRAVITY;
      }
      const initialYPos = this.getInitialY();
      if (this.y >= initialYPos) {
        this.y = initialYPos;
        this.isJumping = false;
      }
    }
  }
}

export default Sijalu;