import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EditAddressModal from './editAddressModal';
import { useState, useEffect } from 'react';
import BaseEditModal from './baseEditModal';
import { useAuth } from '@/contexts/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { userEditSchema } from '@/schemas/schemas';
import { UserEditData } from '@/types/types';
import { formatCPF, formatTelefone } from '@/components/formatter';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

const EditUserModal: React.FC<Props> = ({ open, onOpenChange, onSubmit }) => {
  const { user } = useAuth();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserEditData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      cpf: '',
      phone: '',
      area: '',
      biography: '',
      birthdate: '',
      skill: '',
    },
    resolver: zodResolver(userEditSchema),
  });

  // Atualiza os valores do form quando o modal abrir ou o usuário mudar
  useEffect(() => {
    if (user && open) {
      reset({
        name: user.name || '',
        email: user.email || '',
        password: '',
        cpf: formatCPF(user.cpf || ''),
        phone: formatTelefone(user.phone || ''),
        area: user.area || '',
        biography: user.biography || '',
        birthdate: user.birthdate || '',
        skill: user.skill || '',
      });
    }
  }, [user, open, reset]);

  const cpf = watch('cpf');
  const phone = watch('phone');

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
        <Input placeholder="Nome" {...register('name')} className="w-64" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <Input
          placeholder="Email"
          type="email"
          {...register('email')}
          className="w-64"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Input
          placeholder="Senha"
          type="password"
          {...register('password')}
          className="w-64"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <Input
          placeholder="CPF"
          {...register('cpf')}
          value={cpf}
          onChange={(e) => setValue('cpf', formatCPF(e.target.value))}
          className="w-64"
        />
        {errors.cpf && (
          <p className="text-red-500 text-sm">{errors.cpf.message}</p>
        )}

        <Input
          placeholder="Telefone"
          {...register('phone')}
          value={phone}
          onChange={(e) => setValue('phone', formatTelefone(e.target.value))}
          className="w-64"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}

        <Input
          placeholder="Área de atuação"
          {...register('area')}
          className="w-64"
        />
        {errors.area && (
          <p className="text-red-500 text-sm">{errors.area.message}</p>
        )}

        <Input
          placeholder="Biografia"
          {...register('biography')}
          className="w-64"
        />

        <Input
          placeholder="Data de nascimento"
          type="date"
          {...register('birthdate')}
          className="w-64"
        />
        {errors.birthdate && (
          <p className="text-red-500 text-sm">{errors.birthdate.message}</p>
        )}

        <select
          {...register('skill')}
          className="w-64 px-3 py-2 border rounded-md text-gray-700"
        >
          <option value="">Experiência</option>
          <option value="intern">Estagiário</option>
          <option value="junior">Junior</option>
          <option value="mid-level">Pleno</option>
          <option value="senior">Senior</option>
        </select>
        {errors.skill && (
          <p className="text-red-500 text-sm">{errors.skill.message}</p>
        )}

        <Button type="submit" className="w-64">
          Salvar
        </Button>
      </form>

      <div className="flex flex-col gap-4 items-center mt-4">
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
            console.log('Endereço atualizado:', data);
            setIsAddressModalOpen(false);
          }}
        />
      </div>
    </BaseEditModal>
  );
};

export default EditUserModal;
