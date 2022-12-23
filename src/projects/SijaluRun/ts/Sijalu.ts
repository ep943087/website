import CanvasImage from "../../../utils/CanvasImage";
import CanvasImagesAnimation from "../../../utils/CanvasImagesAnimation";
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
  private static RunningAnimation: CanvasImagesAnimation = new CanvasImagesAnimation([
      new CanvasImage('/run1.png', 75, 125),
      new CanvasImage('/run2.png', 52, 125),
    ],
    40,
  );
  private static JumpingAnimation = new CanvasImagesAnimation([
      new CanvasImage('/jump1.png', 75, 125),
      new CanvasImage('/jump2.png', 50, 100),
    ], 0);
  private jumpIndex: number = 0;
  
  constructor() {
    super();
    this.x = 50;
    this.height = 100;
    this.width = 25;
    this.y = this.getInitialY();
  }

  getImage(): CanvasImage {
    if (this.isJumping) {
      return Sijalu.JumpingAnimation.getImageByIndex(this.jumpIndex);
    } 
    return Sijalu.RunningAnimation.getImage(!this.isDead);
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
      this.jumpIndex = Sijalu.JumpingAnimation.getRandomImageIndex();
    }
  }

  reset() {
    this.y = this.getInitialY();
    this.isDead = false;
    this.isJumping = false;
    this.mouseDownCount = 0;
    this.isMouseDown = false;
    Sijalu.RunningAnimation.reset();
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