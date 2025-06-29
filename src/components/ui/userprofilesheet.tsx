import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { User, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface UserProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  userEmail: string;
  onLogout?: () => void;
  onProposalClick?: () => void;
}

export default function UserProfileSheet({
  open,
  onOpenChange,
  userName,
  userEmail,
  onLogout,
  onProposalClick,
}: UserProfileSheetProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleUserIconClick = () => {
    if (user?.id) {
      navigate(`/profile/${user.id}`);
    }
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* Removi o SheetTrigger e botão interno */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Perfil do Usuário</SheetTitle>
          <SheetDescription>
            Gerencie seu perfil e configurações
          </SheetDescription>
        </SheetHeader>

        <div className=" ml-8">
          <div className="border-b pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                onClick={handleUserIconClick}
              >
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h4 className="font-semibold">{userName}</h4>
                <p className="text-sm text-gray-600">{userEmail}</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={onProposalClick}
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer w-full text-left"
            >
              <Plus className="w-5 h-5" />
              <span>Quero fazer propostas</span>
            </button>
            <button className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer w-full text-left">
              <User className="w-5 h-5" />
              <span>Atualizar perfil</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer w-full text-left"
            >
              <span>Sair</span>
            </button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
