import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
import Feed from './screens/feed/Feed';
import Components from './screens/components/Components'; 
import LoginPage from './screens/components/LoginPage';

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
    path: '/loginpage', 
    element: <LoginPage />, 
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