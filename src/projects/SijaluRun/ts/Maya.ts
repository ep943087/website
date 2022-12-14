import CanvasImage from "../../../utils/CanvasImage";
import Enemy from "./Enemy";
import Simulation from "./Simulation";

class Maya extends Enemy {

  private static Image: CanvasImage = new CanvasImage('/maya.png', 100, 54);

  constructor() {
    super();
    this.width = 80;
    this.height = 54;
    this.y = Simulation.getInitialY(this.height);
  }

  getImage() {
    return Maya.Image;
  }
};

export default Maya;