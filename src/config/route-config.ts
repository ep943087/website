import LandingPage from "../pages/LandingPage";
import ProjectsPage from "../pages/ProjectsPage";

const routeConfig: Route[] = [
  { path: '/projects', component: ProjectsPage },
  { path: "/", component: LandingPage },
];

interface Route {
  path: string;
  component: () => JSX.Element;
}

export default routeConfig;