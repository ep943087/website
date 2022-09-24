import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import routeConfig from './config/route-config';
import Footer from './Layout/Footer';
import TopNavigation from './Layout/TopNavigation';
import './Layout/Layout.css';

function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <TopNavigation />
        <div className="main">
          <Routes>
            {routeConfig.map(route => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
