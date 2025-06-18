/**
 * useAuth Hook
 *
 * Este hook customizado simplifica o acesso ao contexto de autenticação.
 * Ele retorna o objeto `AuthContext`, que contém `user`, `login`, `logout` e `isAuthenticated`.
 *
 * ✅ Use para:
 *   - Acessar os dados do usuário logado em qualquer componente.
 *   - Fazer login e logout a partir de um formulário ou botão.
 *   - Verificar se o usuário está autenticado.
 *
 * ❌ NÃO use para fazer chamadas à API diretamente (isso é função do authService).
 *
 * Exemplo:
 *   const { user, login, logout, isAuthenticated } = useAuth();
 */

import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
