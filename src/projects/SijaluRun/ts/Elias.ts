import CanvasImage from "../../../utils/CanvasImage";
import Enemy from "./Enemy";
import Simulation from "./Simulation";

class Elias extends Enemy {

  private static Image: CanvasImage = new CanvasImage('/elias.png', 60, 120);

  constructor() {
    super();
    this.width = 50;
    this.height = 100;
    this.y = Simulation.getInitialY(this.height);
  }

  getImage() {
    return Elias.Image;
  }
};

export default Elias;