import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LangtonsAnt from "../projects/LangtonsAnt/LangtonsAnt";
import MazeGeneration from "../projects/MazeGeneration/MazeGeneration";
import Particles from "../projects/Particles/Particles";
import SijaluRun from "../projects/SijaluRun/SijaluRun";
import SnakeGamePathFinding from "../projects/SnakeGamePathFinding/SnakeGamePathFinding";
import Tetris from "../projects/Tetris/Tetris";

const routeConfig: Route[] = [
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },

  { path: '/projects', component: ProjectsPage },
  { path: '/projects/snake-game-path-finding', component: SnakeGamePathFinding },
  { path: '/projects/maze-generation', component: MazeGeneration },
  { path: '/projects/particles', component: Particles },
  { path: '/projects/langtons-ant', component: LangtonsAnt },
  { path: '/projects/tetris', component: Tetris },
  { path: '/projects/sijalu-run', component: SijaluRun },

  { path: "/", component: LandingPage },
];

interface Route {
  path: string;
  component: () => JSX.Element;
}

export default routeConfig;