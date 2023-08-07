import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/MainLayout';

// Define a generic type for React functional components
type LoadableComponent<Props = {}> = React.FC<Props>;

const Loadable = <Props extends {}>(Component: LoadableComponent<Props>) => 
  (props: Props) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );



const LandingPage = Loadable(lazy(() => import('./pages/LandingPage')));
const QuestionsPage = Loadable(lazy(() => import('./pages/QuestionsPage')));
const ProfilePage = Loadable(lazy(() => import('./pages/ProfilePage')));
const RolePage = Loadable(lazy(() => import('./pages/RolePage')));
const DownloadPage = Loadable(lazy(() => import('./pages/DownloadPage')));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
    { path: 'start', element: <LandingPage /> },
      { path: 'questions', element: <QuestionsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'role', element: <RolePage /> },
      { path: 'download', element: <DownloadPage /> },
    { index: true, element: <LandingPage /> },  // default route
    ],
  },
];

export default routes;

