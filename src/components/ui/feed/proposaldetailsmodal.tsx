import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Proposal as ProposalType } from '@/types/types';

interface ProposalDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: ProposalType;
  onContact?: () => void;
}

export default function ProposalDetailsModal({
  open,
  onOpenChange,
  proposal,
  onContact,
}: ProposalDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{proposal.company.name}</DialogTitle>
        </DialogHeader>

        <div className="flex gap-6 mt-2">
          {proposal.company.image_key && (
            <img
              src={proposal.company.image_key}
              alt="Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Valor:</strong> R${' '}
              {Number(proposal.value).toLocaleString('pt-BR')}
            </p>
            <p>
              <strong>Descrição:</strong> {proposal.description}
            </p>
            {proposal.company.cnpj && (
              <p>
                <strong>CNPJ:</strong> {proposal.company.cnpj}
              </p>
            )}
            {/* Se quiser endereço, adicione na sua API ou tipo */}
            {proposal.company.phone && (
              <p>
                <strong>Telefone:</strong> {proposal.company.phone}
              </p>
            )}
          </div>
        </div>

        {/* {Array.isArray(proposal.workPhotos) && proposal.workPhotos.length > 0 && (
          <div>
            {proposal.workPhotos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`Foto ${idx + 1}`}
                className="w-48 h-48 object-cover rounded"
              />
            ))}
          </div>
        )} */}

        {onContact && (
          <Button className="mt-6 w-full" onClick={onContact}>
            Entrar em contato
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
