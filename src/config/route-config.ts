import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import ProjectsPage from "../pages/ProjectsPage";
import RegisterPage from "../pages/RegisterPage";
import MazeGeneration from "../projects/MazeGeneration/MazeGeneration";
import SnakeGamePathFinding from "../projects/SnakeGamePathFinding/SnakeGamePathFinding";

const routeConfig: Route[] = [
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },

  { path: '/projects', component: ProjectsPage },
  { path: '/projects/snake-game-path-finding', component: SnakeGamePathFinding },
  { path: '/projects/maze-generation', component: MazeGeneration },

  { path: "/", component: LandingPage },
];

interface Route {
  path: string;
  component: () => JSX.Element;
}

export default routeConfig;