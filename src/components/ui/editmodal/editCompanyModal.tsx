import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import EditAddressModal from './editAddressModal';
import BaseEditModal from './baseEditModal';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

const EditCompanyModal: React.FC<Props> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const { register, handleSubmit } = useForm();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  return (
    <BaseEditModal
      open={open}
      onOpenChange={onOpenChange}
      title="Editar Empresa"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center"
      >
        <Input
          placeholder="Nome da empresa"
          {...register('name')}
          className="w-64"
        />
        <Input placeholder="CNPJ" {...register('cnpj')} className="w-64" />
        <Input placeholder="Telefone" {...register('phone')} className="w-64" />
        <div className="flex items-center gap-2 w-64">
          <input
            type="checkbox"
            {...register('useSameAddress')}
            className="scale-110"
          />
          <label className="text-sm text-gray-700">
            Usar endereço da conta
          </label>
        </div>
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

export default EditCompanyModal;
