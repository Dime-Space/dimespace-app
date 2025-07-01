import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/hooks/useAuth';
import { createProposal } from '@/services/proposals/proposalServices';
import { z } from 'zod';
import { formatCurrency } from '@/components/formatter';

const proposalSchema = z.object({
  company_id: z.number().optional(),
  title: z.string().min(3, 'Título muito curto'),
  description: z.string().min(10, 'Descrição muito curta'),
  value: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Valor inválido'),
  final_date: z.string().refine(
    (date) => {
      const now = new Date();
      const inputDate = new Date(date);
      return inputDate > now;
    },
    {
      message: 'Data final deve ser futura',
    },
  ),
  skill_requested: z
    .array(z.string().min(2, 'Skill muito curta'))
    .min(1, 'Adicione ao menos uma skill'),

  status: z.enum(['aberto', 'fechado'], {
    errorMap: () => ({ message: 'Status deve ser "aberto" ou "fechado"' }),
  }),
});

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
  skill_requested: string[];
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
    skill_requested: [],
    status: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'value') {
      const formatted = formatCurrency(value);
      setForm((prev) => ({
        ...prev,
        [name]: formatted,
      }));
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Converte valor formatado para número string válido (ex: "1.234,56" → "1234.56")
    const rawValue = form.value
      .replace(/\./g, '') // remove pontos dos milhares
      .replace(',', '.'); // troca vírgula decimal por ponto

    const parsedForm = {
      ...form,
      value: rawValue,
    };

    const result = proposalSchema.safeParse(parsedForm);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;
      setError(errorMessage);
      setLoading(false);
      return;
    }

    const submissionData = {
      ...result.data,
      skill_requested: result.data.skill_requested.join(', '),
    };

    try {
      await createProposal(submissionData);
      onSuccess?.();
      onOpenChange(false);
      setForm({
        company_id: company?.id ? Number(company.id) : undefined,
        title: '',
        description: '',
        value: '',
        final_date: '',
        skill_requested: [],
        status: 'aberto',
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
            <label className="block text-sm font-medium">
              Skills Requisitadas
            </label>
            <div className="flex flex-wrap gap-2 border rounded-md p-2">
              {form.skill_requested.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        skill_requested: prev.skill_requested.filter(
                          (_, i) => i !== index,
                        ),
                      }));
                    }}
                    className="ml-1 text-xs text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Digite uma skill e pressione Enter"
                className="flex-grow min-w-[120px] text-sm focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    const input = e.currentTarget.value.trim();
                    if (input && !form.skill_requested.includes(input)) {
                      setForm((prev) => ({
                        ...prev,
                        skill_requested: [...prev.skill_requested, input],
                      }));
                    }
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-input rounded-md px-3 py-2 text-sm"
              required
            >
              <option value="">Selecione</option>
              <option value="aberto">Aberto</option>
              <option value="fechado">Fechado</option>
            </select>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
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
