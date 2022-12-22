import Enemy from "./Enemy";
import Simulation from "./Simulation";

class Maya extends Enemy {
  constructor() {
    super();
    this.width = 50;
    this.height = 55;
    this.y = Simulation.getInitialY(this.height);
  }
};

export default Maya;