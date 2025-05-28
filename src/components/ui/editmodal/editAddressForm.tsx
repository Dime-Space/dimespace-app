import { Input } from '@/components/ui/input';
import { UseFormRegister } from 'react-hook-form';

interface AddressFormProps {
  register: UseFormRegister<any>;
}

const AddressForm: React.FC<AddressFormProps> = ({ register }) => (
  <div className="flex flex-col gap-4 items-center">
    <Input placeholder="CEP" {...register('cep')} className="w-64" />
    <Input placeholder="Estado" {...register('estado')} className="w-64" />
    <Input placeholder="Cidade" {...register('cidade')} className="w-64" />
    <Input placeholder="Rua" {...register('rua')} className="w-64" />
    <Input placeholder="Número" {...register('numero')} className="w-64" />
    <Input
      placeholder="Complemento"
      {...register('complemento')}
      className="w-64"
    />
  </div>
);

export default AddressForm;
