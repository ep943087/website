import Simulation from "./Simulation";
import { EditType } from "./types";

class Drawing {
  private ctx: CanvasRenderingContext2D;
  constructor(private canvas: HTMLCanvasElement, private simulation: Simulation) {
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
  }

  drawParticles() {
    const particles = this.simulation.getParticlesGrid();

    particles.flat().forEach(particle => {
      if (particle.getHidden()) { return; }
      this.ctx.fillStyle = particle.getColor();
      const position = particle.getPosition();
      this.ctx.fillRect(position.getX(), position.getY(), Simulation.GAP, Simulation.GAP);
    });
  }

  drawMouseRadius() {
    const mousePosition = this.simulation.getMousePosition();
    this.ctx.strokeStyle = "red";
    this.ctx.beginPath();
    this.ctx.arc(mousePosition.getX(), mousePosition.getY(), this.simulation.getMouseRadius(), 0, 2*Math.PI);
    this.ctx.stroke();
  }

  drawPen() {
    this.ctx.strokeStyle = "red";
    const penCorners = this.simulation.getPenCorners();
    this.ctx.beginPath();
    this.ctx.moveTo(penCorners[0].getX(), penCorners[0].getY());
    for (let i=1;i<penCorners.length;i++) {
      this.ctx.lineTo(penCorners[i].getX(), penCorners[i].getY());
    }
    this.ctx.lineTo(penCorners[0].getX(), penCorners[0].getY());
    this.ctx.stroke();
  }

  drawEditMode() {
    const { editType } = this.simulation.getOptions();
    const { x, y } = this.simulation.getOffsetXY();

    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(x, y, Simulation.particlesWidth, Simulation.particlesHeight);
    if (editType === EditType.draw || editType === EditType.erase) {
      this.drawPen();
    }
  }

  draw = () => {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.ctx.fillStyle = "black";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawParticles();

    if (this.simulation.getOptions().editMode) {
      this.drawEditMode();
    }
  }
}

export default Drawing;