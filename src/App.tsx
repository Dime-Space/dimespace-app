import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
import Feed from './screens/feed/Feed';
import Components from './screens/components/Components'; // Importe o novo componente
import UserProfile from './screens/profile/UserProfile';
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
    element: <UserProfile />,
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
