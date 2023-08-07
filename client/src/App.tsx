import routes from './routes';
import { useRoutes } from 'react-router-dom';
import { StoreProvider } from './utils/store';

const App = () => {
  const content = useRoutes(routes);
  return (
  <StoreProvider>
    {content}
  </StoreProvider>
  )
};

export default App;

