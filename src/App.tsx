import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Feed from './screens/feed/Feed';
import Components from './screens/components/Components';
import UserProfile from './screens/profile/UserProfile';
import CompanyProfile from './screens/profile/CompanyProfile';
import JobOffer from './screens/jobOffer/joboffer';
import ProtectedRoute from '@/ProtectedRoute';

import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Feed />,
  },
  {
    path: '/feed',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/components',
    element: <Components />,
  },
  {
    path: '/profile/:id',
    element: <UserProfile />,
  },

  {
    path: '/company-profile/:id',
    element: <CompanyProfile />,
  },
  {
    path: '/joboffer',
    element: <JobOffer />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
