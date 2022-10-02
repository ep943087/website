import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import routeConfig from './config/route-config';
import Layout from './Layout/Layout';
import GlobalProvider from './context/Global/GlobalProvider';

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Layout>
          <Routes>
            {routeConfig.map(route => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </Layout>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
