import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
import Feed from './screens/feed/Feed';
import Components from './screens/components/Components';
import UserProfile from './screens/profile/UserProfile';
import CompanyProfile from './screens/profile/CompanyProfile';
import ProtectedRoute from '@/ProtectedRoute'; // ajuste o caminho

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>tela 01</h1>,
  },
  {
    path: '/feed',
    element: (
      <ProtectedRoute>
        <Feed />
      </ProtectedRoute>
    ),
  },
  {
    path: '/components',
    element: <Components />,
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/company-profile',
    element: (
      <ProtectedRoute>
        <CompanyProfile />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
