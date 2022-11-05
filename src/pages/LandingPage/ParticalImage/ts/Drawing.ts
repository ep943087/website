import Simulation from "./Simulation";

class Drawing {
  private ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement, private simulation: Simulation) {
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
  }

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const stillMoving = this.simulation.getParticles().some(particle => {
      const { x, y, targetX, targetY } = particle.getDimensions();
      return x !== targetX || y !== targetY;
    });

    if (stillMoving || this.simulation.getTimeAfterDone() < 8) {
      this.simulation.getParticles().forEach(particle => {
        const { x, y, color, length } = particle.getDimensions();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, length, length);
      });
      if (!stillMoving)  {
        this.simulation.incrementTimeAfterDone();
      }
    } else {
      this.ctx.drawImage(this.simulation.getImage(), 0, 0, this.canvas.width, this.canvas.height);
    }
  }
};

export default Drawing;