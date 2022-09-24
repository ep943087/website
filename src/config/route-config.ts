import LandingPage from "../Layout/LandingPage";
import AboutPage from "../pages/AboutPage";

const routeConfig: Route[] = [
  { path: '/about', component: AboutPage },
  { path: "/", component: LandingPage },
];

interface Route {
  path: string;
  component: () => JSX.Element;
}

export default routeConfig;