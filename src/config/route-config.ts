import LandingPage from "../pages/LandingPage";
import ProjectsPage from "../pages/ProjectsPage";
import MazeGeneration from "../projects/MazeGeneration/MazeGeneration";
import SnakeGamePathFinding from "../projects/SnakeGamePathFinding/SnakeGamePathFinding";

const routeConfig: Route[] = [
  { path: '/projects', component: ProjectsPage },
  { path: "/", component: LandingPage },
  { path: '/projects/snake-game-path-finding', component: SnakeGamePathFinding },
  { path: '/projects/maze-generation', component: MazeGeneration },
];

interface Route {
  path: string;
  component: () => JSX.Element;
}

export default routeConfig;