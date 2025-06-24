import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Feed from './screens/feed/Feed';
import Components from './screens/components/Components';
import UserProfile from './screens/profile/UserProfile';
import CompanyProfile from './screens/profile/CompanyProfile';
import JobOffer from './screens/jobOffer/joboffer';
import ProtectedRoute from '@/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>tela 01</h1>,
  },
  {
    path: '/feed',
    element: <Feed />,
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
  {
    path: '/joboffer',
    element: <JobOffer />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
