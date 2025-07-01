import React, { useState } from 'react';
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
import { updateUserProfile } from '@/services/user/userServices';
import { toast } from 'sonner';
import EditUserModal from '@/components/ui/editmodal/editUserModal';
import CreateProposalModal from '@/components/ui/createProposal';
import { UserEditData } from '@/types/types';

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateProposalOpen, setIsCreateProposalOpen] = useState(false);

  const { user, company } = useAuth();
  const navigate = useNavigate();
  const handleUserIconClick = () => {
    if (user?.id) {
      navigate(`/profile/${user.id}`);
    }
  };

  const handleUserUpdate = async (formData: UserEditData) => {
    if (!user) return;

    // Cria um objeto copiando os dados do formulário
    const payload = { ...formData };

    // Remove o campo de senha se estiver vazio (evita sobrescrever com string vazia)
    if (!payload.password) {
      delete payload.password;
    }

    try {
      await updateUserProfile(user.id, payload);

      toast.success('Perfil atualizado com sucesso!');
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar perfil');
    }
  };

  const handleCompanyIconClick = () => {
    if (company?.id) {
      navigate(`/company-profile/${company.id}`);
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
            {company && (
              <div className="flex items-center py-4 gap-3">
                <div
                  className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={handleCompanyIconClick}
                >
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold">{company.name}</h4>
                </div>
              </div>
            )}
          </div>

          <nav className="space-y-2">
            <button
              onClick={onProposalClick}
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer w-full text-left"
            >
              <Plus className="w-5 h-5" />
              <span>Quero fazer propostas</span>
            </button>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer w-full text-left"
            >
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

          <EditUserModal
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            onSubmit={handleUserUpdate}
          />

          <CreateProposalModal
            open={isCreateProposalOpen}
            onOpenChange={setIsCreateProposalOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
