import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import routeConfig from './config/route-config';
import Layout from './Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routeConfig.map(route => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
