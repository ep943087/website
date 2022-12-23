import CanvasImage from "./CanvasImage";

class CanvasImagesAnimation {
  private index: number = 0;
  constructor(private canvasImages: CanvasImage[], private maxIndex: number) {}

  reset() {
    this.index = 0;
  }

  getImage(incrementIndex: boolean = true) {
    const index = ~~(this.index / this.maxIndex * this.canvasImages.length);
    if (incrementIndex) {
      this.index = (this.index+1) % this.maxIndex;;
    }
    return this.canvasImages[index];
  }

  getRandomImageIndex(): number {
    return ~~(Math.random()*this.canvasImages.length);
  }

  getRandomImage(): CanvasImage {
    return this.canvasImages[this.getRandomImageIndex()];
  }

  getImageByIndex(index: number): CanvasImage {
    return this.canvasImages[index];
  }
}

export default CanvasImagesAnimation;