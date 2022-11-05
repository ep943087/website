import ImagePartical from "./ImageParticle";

class Simulation {
  private gap: number = 3;
  private particles: ImagePartical[] = [];
  private image: HTMLImageElement;
  private timeAfterDone: number = 0;
  private beforeMoving: number = 0;
  private calculateXYMethods: (() => {x: number, y: number})[];

  constructor(private canvas: HTMLCanvasElement) {
    this.image = new Image();
    this.image.src = 'portrait.jpg';
    this.image.onload = this.initialize;
    this.calculateXYMethods = [
      this.calculateCircleRingXY,
      this.calculateDonutXY,
      this.calculateFourFlowerXY,
      this.calculateFractionCircleXY,
      this.calculateSpiralXY,
      this.calculateStarXY,
    ];
  }

  getParticles() { return this.particles; }
  getImage() { return this.image; }
  getTimeAfterDone() { return this.timeAfterDone; }
  getRandomCalculateXYMethod() { return this.calculateXYMethods[Math.floor(Math.random()*this.calculateXYMethods.length)]; }

  incrementTimeAfterDone() { this.timeAfterDone++; }

  initialize = () => {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetWidth;
    this.image.width = this.canvas.width;
    this.image.height = this.canvas.width;
    this.timeAfterDone = 0;
    this.beforeMoving = 0;

    const { width, height } = this.canvas;

    const context = this.canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
    context.drawImage(this.image, 0, 0, width, height);
    const pixels = context.getImageData(0, 0, width, height).data;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles = [];
    const calculateXY = this.getRandomCalculateXYMethod();

    for (let i=0;i<width;i+=this.gap) {
      for (let j=0;j<height;j+=this.gap) {
        const index = (i*width + j) * 4;
        const targetX = j;
        const targetY = i;
        const centerX = width/2;
        const centerY = height/2;
        const { x, y } = calculateXY();
        const red = pixels[index];
        const green = pixels[index+1];
        const blue = pixels[index+2];
        const alpha = pixels[index+3];
        const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        const particle = new ImagePartical(targetX, targetY, this.gap, centerX + x, centerY + y, color);
        this.particles.push(particle);
      }
    }
  }

  calculateCircleRingXY = () => {
    const angle = Math.random() * 10 * Math.PI;
    const radius = Math.sin(8*angle/5);
    const x = 140 * (radius * Math.cos(angle));
    const y = 140 * (radius * Math.sin(angle));
    return { x, y };
  }

  calculateSpiralXY = () => {
    const angle = Math.random() * 17 * Math.PI;
    const radius = angle;
    const x = 4 * (radius * Math.cos(angle));
    const y = 4 * (radius * Math.sin(angle));
    return { x, y };
  }

  calculateStarXY = () => {
    const angle = Math.random() * 17 * Math.PI;
    const radius = Math.sin(5 * angle) + 2;
    const x = 40 * (radius * Math.cos(angle));
    const y = 40 * (radius * Math.sin(angle));
    return { x, y };
  }

  calculateDonutXY = () => {
    const angle = Math.random() * 100 * Math.PI;
    const radius = Math.sin(24/25 * angle) + 2;
    const x = 45 * (radius * Math.cos(angle));
    const y = 45 * (radius * Math.sin(angle));
    return { x, y };
  }

  calculateFourFlowerXY = () => {
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.sin(4 * angle);
    const x = 130 * (radius * Math.cos(angle));
    const y = 130 * (radius * Math.sin(angle));
    return { x, y };
  }

  calculateFractionCircleXY = () => {
    const angle = Math.random() * 6 * Math.PI;
    const radius = Math.sin(2/3 * angle);
    const x = 130 * (radius * Math.cos(angle));
    const y = 130 * (radius * Math.sin(angle));
    return { x, y };
  }

  calculateTanPI = () => {
    const angle = Math.random() * 6 * Math.PI;
    const radius = Math.tan(2*angle)+10;
    const x = 6 * (radius * Math.cos(angle));
    const y = 6 * (radius * Math.sin(angle));
    return { x, y };
  }

  
  calculateSpiralFlower = () => {
    const angle = Math.random() * 6 * Math.PI;
    const radius = Math.tan(3*angle)+2;
    const x = 5 * (radius * Math.cos(angle));
    const y = 5 * (radius * Math.sin(angle));
    return { x, y };
  }

  update = () => {
    if (this.beforeMoving < 350) {
      this.particles.forEach(particle => {
        particle.rotate(this.canvas.width/2, this.canvas.height/2, -Math.PI*2/500);
      })
      this.beforeMoving++;
      return;
    }

    this.particles.forEach(particle => {
      particle.update();
    });
  }
};

export default Simulation;