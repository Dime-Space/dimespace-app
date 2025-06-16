import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/services/auth/authService'; // ou outro caminho do seu projeto

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAuth = isAuthenticated(); // verifica localStorage, cookie, etc.

  return isAuth ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
