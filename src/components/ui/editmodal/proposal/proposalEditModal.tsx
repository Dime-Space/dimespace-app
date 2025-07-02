import React, { useEffect, useState } from 'react';
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
import { z } from 'zod';
import { Proposal } from '@/types/types';
import { updateProposal } from '@/services/proposals/proposalServices';
import { formatCurrency } from '@/components/formatter';
import { useUpdateProposal } from '@/services/proposals/proposalServices';

const proposalSchema = z.object({
  title: z.string().min(3, 'Título muito curto'),
  description: z.string().min(10, 'Descrição muito curta'),
  value: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Valor inválido'),
  final_date: z.string().refine(
    (date) => {
      const now = new Date();
      const inputDate = new Date(date);
      return inputDate > now;
    },
    { message: 'Data final deve ser futura' },
  ),
  skill_requested: z
    .array(z.string().min(2, 'Skill muito curta'))
    .min(1, 'Adicione ao menos uma skill'),
  status: z.enum(['aberto', 'fechado'], {
    errorMap: () => ({ message: 'Status deve ser "aberto" ou "fechado"' }),
  }),
});

interface EditProposalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: Proposal;
  onSuccess?: () => void;
}

const EditProposalModal: React.FC<EditProposalModalProps> = ({
  open,
  onOpenChange,
  proposal,
  onSuccess,
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    value: '',
    final_date: '',
    skill_requested: [] as string[],
    status: 'aberto',
  });

  const { mutateAsync } = useUpdateProposal();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (proposal) {
      let parsedSkills: string[] = [];

      try {
        if (Array.isArray(proposal.skill_requested)) {
          parsedSkills = proposal.skill_requested;
        } else if (typeof proposal.skill_requested === 'string') {
          // Tenta fazer JSON.parse
          try {
            const json = JSON.parse(proposal.skill_requested);
            if (Array.isArray(json)) {
              parsedSkills = json;
            } else if (typeof json === 'string') {
              parsedSkills = [json];
            }
          } catch {
            // fallback: split por vírgula
            parsedSkills = proposal.skill_requested
              .split(',')
              .map((s) => s.trim());
          }
        }
      } catch (err) {
        console.warn('Erro ao processar skill_requested:', err);
      }

      setForm({
        title: proposal.title,
        description: proposal.description,
        value: Number(proposal.value).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        }),
        final_date: proposal.final_date.split('T')[0],
        skill_requested: parsedSkills,
        status: proposal.status,
      });
    }
  }, [proposal]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'value' ? formatCurrency(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const rawValue = form.value.replace(/\./g, '').replace(',', '.');

    const parsed = proposalSchema.safeParse({
      ...form,
      value: rawValue,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      await mutateAsync({
        id: proposal.id,
        data: {
          ...parsed.data,
          skill_requested: parsed.data.skill_requested.join(', '),
        },
      });
      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar proposta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Proposta</DialogTitle>
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
              <option value="aberto">Aberto</option>
              <option value="fechado">Fechado</option>
            </select>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProposalModal;
