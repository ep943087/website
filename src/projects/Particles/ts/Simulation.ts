import Particle from "./Particle";
import Point from "./Point";
import { EditType, SimulationOptions } from "./types";

class Simulation {
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private rows: number = 0;
  private cols: number = 0;
  private particles: Particle[] = [];
  private particlesGrid: Particle[][] = [];
  private mousePosition: Point = new Point(0, 0);
  private oldMousePosition: Point = new Point(0, 0);
  private mouseRadius: number = 45;
  public static GAP: number = 4;
  public static particlesWidth: number = 500;
  public static particlesHeight: number = 500;
  private options: SimulationOptions = Simulation.getDefaultOptions();
  private isMouseDown: boolean = false;
  public static readonly spongeBobImage: string = '/spongebob.jpg';

  public static getDefaultOptions(): SimulationOptions {
    return {
      editMode: false,
      color: '#00ff00',
      penSize: 5,
      editType: EditType.draw,
      mouseSize: '10',
    };
  }

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
    this.image = new Image();
    this.image.onload = this.initializeImage;
    setTimeout(() => {
      this.initialize();
      this.image.src = Simulation.spongeBobImage;
    }, 10);
  }

  getParticlesGrid() { return this.particlesGrid; }
  getParticles() { return this.particles; }
  getMousePosition() { return this.mousePosition; }
  getMouseRadius() { return this.mouseRadius; }
  getOptions() { return this.options; }
  getIsMouseDown() { return this.isMouseDown; }
  setIsMouseDown(isMouseDown: boolean) { this.isMouseDown = isMouseDown; }
  setOptions(options: SimulationOptions) {
    if (options.editMode && !this.options.editMode) {
      this.setParticlesPositionToTarget();
    }
    this.options = options;
  }

  copyImage(img: string) {
    if (this.image.src === img) {
      this.initializeImage();
    } else {
      this.image.src = img;
    }
  }

  getDrawSize() {
    return this.options.penSize * Simulation.GAP;
  }

  getPenCorners() {
    const drawSize = this.getDrawSize();
    const halfDrawSize = drawSize / 2;
    const x = this.mousePosition.getX();
    const y = this.mousePosition.getY();

    return [
      new Point(x - halfDrawSize, y - halfDrawSize),
      new Point(x + halfDrawSize, y - halfDrawSize),
      new Point(x + halfDrawSize, y + halfDrawSize),
      new Point(x - halfDrawSize, y + halfDrawSize),
    ];
  };

  setMousePosition(x: number, y: number) {
    this.oldMousePosition.setXY(this.mousePosition.getX(), this.mousePosition.getY());
    this.mousePosition.setXY(x, y);
  }

  convertXYToParticleRowCol(x: number, y: number) {
    const { x: offsetX, y: offsetY } = this.getOffsetXY();
    return {
      row: ~~((y - offsetY) / Simulation.GAP),
      col: ~~((x - offsetX) / Simulation.GAP),
    };
  }

  getParticlesPenDrawing(): Particle[] {
    const particles: Particle[] = [];
    const penCorners = this.getPenCorners();
    const upperLeftCorner = this.convertXYToParticleRowCol(penCorners[0].getX(), penCorners[0].getY());
    const lowerRightCorner = this.convertXYToParticleRowCol(penCorners[2].getX(), penCorners[2].getY());

    const rowStart = upperLeftCorner.row;
    const rowEnd = lowerRightCorner.row;

    const colStart = upperLeftCorner.col;
    const colEnd = lowerRightCorner.col;

    for (let i=rowStart;i<=rowEnd;i++) {
      for (let j=colStart;j<=colEnd;j++) {
        if (i < 0 || i >= this.rows || j < 0 || j >= this.cols) {
          continue;
        }
        particles.push(this.particlesGrid[i][j]);
      }
    }

    return particles;
  }

  drawOnCurrentMousePosition() {
    const particles = this.getParticlesPenDrawing();
    const { editType } = this.options;

    particles.forEach(particle => {
      if (editType === EditType.draw) {
        particle.setColor(this.options.color);
        particle.setHidden(false);
      } else if (editType === EditType.erase) {
        particle.setHidden(true);
      }
    });
  }

  penDraw() {
    const { editType } = this.options;

    if (editType === EditType.draw || editType === EditType.erase) {
      this.drawFromOldMouseToNewMousePosition();
    }
  }

  drawFromOldMouseToNewMousePosition() {
    this.drawOnCurrentMousePosition();

    const currentMousePosition = new Point(this.mousePosition.getX(), this.mousePosition.getY());

    const distance = Point.distance(currentMousePosition, this.oldMousePosition);
    const angle = Math.atan2(
      currentMousePosition.getY() - this.oldMousePosition.getY(),
      currentMousePosition.getX() - this.oldMousePosition.getX(),
    );
    const xVel = Simulation.GAP * Math.cos(angle);
    const yVel = Simulation.GAP * Math.sin(angle);

    this.mousePosition.setXY(this.oldMousePosition.getX(), this.oldMousePosition.getY());
    for (let i=0;i<distance/Simulation.GAP;i++) {
      this.mousePosition.addXY(xVel, yVel);
      this.drawOnCurrentMousePosition();
    }

    this.mousePosition.setXY(currentMousePosition.getX(), currentMousePosition.getY());

  }
  
  getOffsetXY() {
    return {
      x: (this.canvas.width - Simulation.particlesWidth) / 2,
      y: (this.canvas.height - Simulation.particlesHeight) / 2,
    };
  }

  initialize() {
    this.rows = ~~(Simulation.particlesHeight / Simulation.GAP);
    this.cols = ~~(Simulation.particlesWidth / Simulation.GAP);

    this.particlesGrid = [];
    const { x: offsetX, y: offsetY } = this.getOffsetXY();
    for (let i=0;i<this.rows;i++) {
      const gridRow: Particle[] = [];
      for (let j=0;j<this.cols;j++) {
        const position = new Point(offsetX + j*Simulation.GAP, offsetY + i*Simulation.GAP);
        const target = new Point(offsetX + j*Simulation.GAP, offsetY + i*Simulation.GAP);
        gridRow.push(new Particle(position, target, 'blue'));
      }
      this.particlesGrid.push(gridRow);
    }
  }

  clear() {
    this.particlesGrid.flat().forEach(particle => particle.setHidden(true));
  }

  setParticlesPositionToTarget() {
    this.particlesGrid.flat().forEach(particle => particle.setPositionToTarget());
  }

  fill() {
    const { row, col } = this.convertXYToParticleRowCol(this.mousePosition.getX(), this.mousePosition.getY());
    if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
      const currentCell = this.particlesGrid[row][col];
      const unvisitedParticles = this.particlesGrid.flat();
      this.fillRecursively(row, col, unvisitedParticles, currentCell.getColor(), currentCell.getHidden());
    }
  }

  private fillRecursively(row: number, col: number, unvisitedParticles: Particle[], oldColor: string, hidden: boolean) {
    const particle = this.particlesGrid[row][col];

    if (!unvisitedParticles.includes(particle)) {
      return;
    }

    if (hidden && !particle.getHidden()) {
      return;
    }

    if (!hidden && (particle.getColor() !== oldColor)) {
      return;
    }

    particle.setColor(this.options.color);
    particle.setHidden(false);
    unvisitedParticles.splice(unvisitedParticles.findIndex(cell => cell === particle), 1);

    if (row > 0) {
      this.fillRecursively(row-1, col, unvisitedParticles, oldColor, hidden);
    }
    if (row < this.rows - 1) {
      this.fillRecursively(row+1, col, unvisitedParticles, oldColor, hidden);
    }
    if (col > 0) {
      this.fillRecursively(row, col-1, unvisitedParticles, oldColor, hidden);
    }
    if (col < this.cols - 1) {
      this.fillRecursively(row, col+1, unvisitedParticles, oldColor, hidden);
    }
  }

  initializeImage = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.image, 0, 0, Simulation.particlesWidth, Simulation.particlesHeight);
    const pixels = this.ctx.getImageData(0, 0, Simulation.particlesWidth, Simulation.particlesHeight).data;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i=0;i<this.rows;i++) {
      for (let j=0;j<this.cols;j++) {
        const index = ((i*Simulation.GAP)*Simulation.particlesWidth + (j*Simulation.GAP)) * 4;
        const red = pixels[index];
        const green = pixels[index+1];
        const blue = pixels[index+2];
        const alpha = pixels[index+3];
        const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        if (color === 'rgba(255, 255, 255, 255)') {
          this.particlesGrid[i][j].setHidden(true);
        } else {
          this.particlesGrid[i][j].setHidden(false);
        }
        this.particlesGrid[i][j].setColor(color);
      }
    }
  }

  update = () => {
    if (this.options.editMode) { return; }
    this.particlesGrid.flat().forEach(particle => {
      if (particle.getHidden()) { return; }
      particle.update(this.mousePosition, parseInt(this.options.mouseSize)*9, this.isMouseDown);
    })
  }
}

export default Simulation;