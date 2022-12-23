import Elias from "./Elias";
import Enemy from "./Enemy";
import Maya from "./Maya";
import Sijalu from "./Sijalu";

class Simulation {
  private sijalu: Sijalu = new Sijalu();
  public static readonly BOTTOM_LINE = 275;
  private enemies: Enemy[] = [];
  private timeTillNextEnemy: number = 0;
  private static readonly MAX_ENEMY_TIME = 150;
  private static readonly MIN_ENEMY_TIME = 75;
  private score: number = 0;
  private highScore: number = 0;
  private static readonly SCORE_DELAY = 15;
  private timeTillNextScore = Simulation.SCORE_DELAY;
  private static LOCAL_STORAGE_HIGH_SCORE_KEY = 'sijalu-run-high-score';

  constructor(private canvas: HTMLCanvasElement) {
    this.setInitialHighScore();
    this.addEnemy();
    this.setTimeTillNextEnemy();
  }

  setInitialHighScore() {
    const highScoreStr = localStorage.getItem(Simulation.LOCAL_STORAGE_HIGH_SCORE_KEY);
    const highScore = parseInt(highScoreStr ?? '');
    if (!isNaN(highScore)) {
      this.highScore = highScore;
    }
  }

  addToScore() {
    this.score++;
    this.highScore = Math.max(this.score, this.highScore);
    localStorage.setItem(Simulation.LOCAL_STORAGE_HIGH_SCORE_KEY, this.highScore.toString());
  }

  reset() {
    this.enemies = [];
    this.addEnemy();
    this.setTimeTillNextEnemy();
    this.sijalu.reset();
    this.score = 0;
    this.timeTillNextScore = Simulation.SCORE_DELAY;
  }

  getRandomEnemy() {
    const r = ~~(Math.random()*2);
    switch (r) {
      case 0: return new Maya();
      case 1: return new Elias();
    }
    return new Maya();
  }

  addEnemy() {
    const enemy = this.getRandomEnemy();
    this.enemies.push(enemy);
  }

  setTimeTillNextEnemy() {
    this.timeTillNextEnemy = Simulation.MIN_ENEMY_TIME + ~~((Simulation.MAX_ENEMY_TIME - Simulation.MIN_ENEMY_TIME)*Math.random());
  }

  setTimeTillNextScore() {
    this.timeTillNextScore = Simulation.SCORE_DELAY;
  }

  getScore() { return this.score }
  getHighScore() { return this.highScore }
  getCanvas() { return this.canvas }
  getSijalu() { return this.sijalu }
  getEnemies() { return this.enemies }

  public static getInitialY(height: number) {
    return Simulation.BOTTOM_LINE - height/2;
  }

  update = () => {
    if (this.sijalu.getIsDead()) { return; }

    this.sijalu.update();
    this.enemies.forEach(enemy => enemy.update());

    for (let i=this.enemies.length-1;i>=0;i--) {
      if (this.enemies[i].isOutOfBounds()) {
        this.enemies.splice(i, 1);
      } else if (this.sijalu.collision(this.enemies[i])) {
        this.sijalu.setIsDead(true);
      }
    }

    if (this.timeTillNextEnemy > 0) {
      this.timeTillNextEnemy--;
    } else {
      this.setTimeTillNextEnemy();
      this.addEnemy();
    }

    if (this.timeTillNextScore > 0) {
      this.timeTillNextScore--;
    } else {
      this.setTimeTillNextScore();
      this.addToScore();
    }
  }

  handleJumpEvent() {
    if (this.sijalu.getIsDead()) {
      this.reset();
      return;
    }

    if (!this.sijalu.getIsJumping()) {
      this.sijalu.setIsMouseDown(true);
    }
    this.sijalu.jump();
  }

  handleStopJumpEvent() {
    this.sijalu.setIsMouseDown(false);
  }
};

export default Simulation;