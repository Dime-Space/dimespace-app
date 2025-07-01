import { useState } from 'react';
import { Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import UserProfileSheet from '@/components/ui/userprofilesheet';
import LoginModal from '@/components/ui/loginModal';
import RegisterUserModal from './registermodal/user/registerUserModal';
import RegisterCompanyModal from './registermodal/company/registerCompanyModal';
import { useAuth } from '@/contexts/AuthContext';
import CreateProposalModal from '@/components/ui/createProposal';

interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function Navbar({ search, setSearch }: NavbarProps) {
  const { user, company, logout } = useAuth();

  const [showProfileSheet, setShowProfileSheet] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showRegisterCompanyModal, setShowRegisterCompanyModal] =
    useState(false);

  const handleLogout = () => {
    logout();
    setShowProfileSheet(false);
  };

  const handleUserIconClick = () => {
    if (user) {
      setShowProfileSheet(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <header className="bg-gray-800 text-white px-4 sm:px-6 py-3 w-full fixed top-0 left-0 z-40 shadow">
      <div className="flex items-center justify-between w-full min-w-0">
        <div className="text-2xl font-bold flex-shrink-0">D</div>

        {/* Search - Hidden on mobile, shown on larger screens */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar empresa por nome..."
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {user && (
            <p className="text-sm text-white">
              Olá, <b>{user.name}</b>
            </p>
          )}
          <button
            onClick={handleUserIconClick}
            aria-label="Abrir perfil ou login"
            className="cursor-pointer sm:w-8 sm:h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors flex-shrink-0"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {user && (
            <>
              <UserProfileSheet
                open={showProfileSheet}
                onOpenChange={setShowProfileSheet}
                userName={user.name}
                userEmail={user.email}
                onLogout={handleLogout}
                onProposalClick={() => {
                  if (!company) {
                    setShowRegisterCompanyModal(true);
                  } else {
                    console.log('Usuário já tem empresa:', company);
                    setShowProposalModal(true);
                  }
                }}
              />
              <RegisterCompanyModal
                open={showRegisterCompanyModal}
                onOpenChange={setShowRegisterCompanyModal}
              />
            </>
          )}

          {!user && (
            <>
              <LoginModal
                open={showLoginModal}
                onOpenChange={setShowLoginModal}
                onRegisterClick={() => {
                  setShowLoginModal(false);
                  setShowRegisterModal(true);
                }}
              />
              <RegisterUserModal
                open={showRegisterModal}
                onOpenChange={setShowRegisterModal}
              />
            </>
          )}
        </div>
      </div>

      <CreateProposalModal
        open={showProposalModal}
        onOpenChange={setShowProposalModal}
        onSuccess={() => {
          setShowProposalModal(false);
        }}
      />

      {/* Mobile Search */}
      <div className="lg:hidden mt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar empresa por nome..."
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
