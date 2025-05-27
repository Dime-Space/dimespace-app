import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import AddressForm from './editAddressForm';

interface EditAddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const { register, handleSubmit } = useForm();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <h2 className="text-lg font-bold mb-4 text-center mt-4">
          Editar Endereço
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4"
        >
          <AddressForm register={register} />
          <Button type="submit" className="w-64 mt-4">
            Salvar Endereço
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditAddressModal;
