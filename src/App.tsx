import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
import Feed from './screens/feed/Feed';
import Components from './screens/components/Components';
import UserProfile from './screens/profile/UserProfile';
import CompanyProfile from './screens/profile/CompanyProfile';

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
  {
    path: '/company-profile',
    element: (
      <CompanyProfile
        coverImage="/images/Corinthians.jpg"
        profileImage="/images/Corinthians.jpg"
        companyName="Corinthians Tech Corp"
        description="Soluções Digitais para o Futuro"
        socialLinks={[
          {
            label: 'Facebook',
            url: 'https://facebook.com/corinthians',
            icon: 'facebook',
            iconColor: { fill: '#3b82f6' }, // Tailwind 'text-blue-500' is #3b82f6
          },
        ]}
        contactInfo={{
          phone: '(11) 4002-8922',
          email: 'contato@corinthians.com',
          address: 'Av. Paulista, 1000 - São Paulo/SP',
        }}
        about={{
          description: 'Líderes em desenvolvimento de software...',
        }}
        proposalsButtonText="Ver Propostas"
      />
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
