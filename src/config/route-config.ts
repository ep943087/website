import LandingPage from "../pages/LandingPage";
import ProjectsPage from "../pages/ProjectsPage";
import SnakeGamePathFinding from "../projects/SnakeGamePathFinding/SnakeGamePathFinding";

const routeConfig: Route[] = [
  { path: '/projects', component: ProjectsPage },
  { path: "/", component: LandingPage },
  { path: '/projects/snake-game-path-finding', component: SnakeGamePathFinding },
];

interface Route {
  path: string;
  component: () => JSX.Element;
}

export default routeConfig;