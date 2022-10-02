import LandingPage from "../pages/LandingPage";
import ProjectsPage from "../pages/ProjectsPage";
import SkillsPage from "../pages/SkillsPage";

const routeConfig: Route[] = [
  { path: '/projects', component: ProjectsPage },
  { path: '/skills', component: SkillsPage },
  { path: "/", component: LandingPage },
];

interface Route {
  path: string;
  component: () => JSX.Element;
}

export default routeConfig;