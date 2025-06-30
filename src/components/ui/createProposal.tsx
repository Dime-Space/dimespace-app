import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/hooks/useAuth';
import { createProposal } from '@/services/proposals/proposalServices';
import { userInfo } from 'os';



interface CreateProposalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void; // Opcional: callback para atualizar lista após criar
}

export interface ProposalFormData {
  company_id: number | undefined;
  title: string;
  description: string;
  value: string;
  final_date: string;
  skill_requested: string;
  status: string;
}

const CreateProposalModal: React.FC<CreateProposalModalProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {

  const { user, company } = useAuth();

  console.log('Dados do usuário:', user);
  console.log('Dados da empresa:', company);

  const [form, setForm] = useState<ProposalFormData>({
    company_id: company?.id ? Number(company.id) : undefined,
    title: '',
    description: '',
    value: '',
    final_date: '',
    skill_requested: '',
    status: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createProposal(form);
      if (onSuccess) onSuccess();
      onOpenChange(false);
      setForm({
        company_id: company?.id ? Number(company.id) : undefined,
        title: '',
        description: '',
        value: '',
        final_date: '',
        skill_requested: '',
        status: '',
      });
    } catch (err: any) {
      setError('Erro ao criar proposta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Atualiza o company_id caso mude o contexto
  React.useEffect(() => {
    setForm((prev) => ({
      ...prev,
      company_id: company?.id ? Number(company.id) : undefined,
    }));
  }, [company]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Proposta de Serviço</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Company ID</label>
            <Input
              name="company_id"
              value={form.company_id ?? ''}
              disabled
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Título</label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Descrição</label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Valor</label>
            <Input
              name="value"
              value={form.value}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Data Final</label>
            <Input
              name="final_date"
              type="date"
              value={form.final_date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Skill Requisitada</label>
            <Input
              name="skill_requested"
              value={form.skill_requested}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <Input
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? 'Criando...' : 'Criar Proposta'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProposalModal;