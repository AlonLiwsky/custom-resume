import routes from './routes';
import { useRoutes } from 'react-router-dom';
import useAuthTokenRefresh from './hooks/useAuthTokenRefresh';

const App: React.FC = () => {
  const content = useRoutes(routes);
  useAuthTokenRefresh();
  return content
};

export default App;

