class CanvasImage {
  private image: HTMLImageElement;
  constructor(sourcePath: string, private width: number, private height: number) {
    this.image = new Image();
    this.image.src = sourcePath;
  }

  getWidth() { return this.width }
  getHeight() { return this.height }
  getImage() { return this.image }
};

export default CanvasImage;