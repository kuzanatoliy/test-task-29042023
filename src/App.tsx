import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';

import { ErrorPage, HomePage, PersonPage } from './pages';

const router = createHashRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <Navigate to='/home' />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/person/:id',
        element: <PersonPage />,
      },
      {
        path: '/*',
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
