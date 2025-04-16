import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
import Feed from './screens/feed/Feed';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>tela 01</h1>, // adicione uma tela aqui
  },
  {
    path: '/feed',
    element: <Feed />,
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
