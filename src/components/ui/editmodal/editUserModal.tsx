import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EditAddressModal from './editAddressModal';
import { useState } from 'react';
import BaseEditModal from './baseEditModal';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

const EditUserModal: React.FC<Props> = ({ open, onOpenChange, onSubmit }) => {
  const { register, handleSubmit } = useForm();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  return (
    <BaseEditModal
      open={open}
      onOpenChange={onOpenChange}
      title="Editar Usuário"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center"
      >
        <Input placeholder="Nome" {...register('nome')} className="w-64" />
        <Input
          placeholder="Email"
          type="email"
          {...register('email')}
          className="w-64"
        />
        <Input
          placeholder="Senha"
          type="password"
          {...register('senha')}
          className="w-64"
        />
        <Input placeholder="CPF" {...register('cpf')} className="w-64" />
        <Input
          placeholder="Telefone"
          type="tel"
          {...register('telefone')}
          className="w-64"
        />
        <Input
          placeholder="Área de atuação"
          {...register('area')}
          className="w-64"
        />
        <select
          {...register('skill')}
          className="w-64 px-3 py-2 border rounded-md text-gray-700"
          defaultValue=""
        >
          <option value="" disabled>
            Experiência
          </option>
          <option value="intern">Estagiário</option>
          <option value="junior">Junior</option>
          <option value="mid-level">Pleno</option>
          <option value="senior">Senior</option>
        </select>
        <Button type="submit" className="w-64">
          Salvar
        </Button>
      </form>
      <div className="flex flex-col gap-4 items-center">
        <Button
          type="button"
          variant="outline"
          className="w-64"
          onClick={() => setIsAddressModalOpen(true)}
        >
          Editar Endereço
        </Button>
        <EditAddressModal
          open={isAddressModalOpen}
          onOpenChange={setIsAddressModalOpen}
          onSubmit={(data) => {
            // Salvar endereço no backend ou atualizar estado local
            console.log('Endereço atualizado:', data);
            setIsAddressModalOpen(false);
          }}
        />
      </div>
    </BaseEditModal>
  );
};

export default EditUserModal;
