import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, Settings, FileText, MessageCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import Navbar from '@/components/ui/navbar';
import ProposalCard from '@/components/ui/feed/proposalcard';
import ChatModal from '@/components/ui/chatModal';
import { useAuth } from '@/contexts/hooks/useAuth';
import { getProposals } from '@/services/proposals/proposalServices';
import ProposalCardSkeleton from '@/components/ui/feed/proposalskeleton';
import { Proposal } from '@/types/types';
import ProposalDetailsModal from '@/components/ui/feed/proposaldetailsmodal';

export default function ProposalPlatform() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState('');

  const openProposalDetails = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  const {
    data: proposals,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['proposals'],
    queryFn: getProposals,
  });

  const filteredProposals = proposals?.filter((proposal: Proposal) =>
    proposal.company?.name?.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar search={search} setSearch={setSearch} />

      <div className="flex">
        <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-16 md:w-64 bg-white shadow-sm p-2 md:p-4 z-30 overflow-y-auto">
          <nav className="space-y-2">
            <SidebarItem icon={<Clock />} label="Histórico de propostas" />
            <SidebarItem icon={<Settings />} label="Configurações" />
            <SidebarItem icon={<FileText />} label="Fazer proposta" />
          </nav>

          <div className="mt-8 hidden md:block">
            <Card className="bg-gradient-to-br from-blue-900 to-blue-700 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold mb-2">sporting bet</div>
                <div className="text-sm opacity-90">Apostas esportivas</div>
              </CardContent>
            </Card>
          </div>
        </aside>

        <main className="flex-1 p-6 mt-16 ml-16 md:ml-64">
          <div className="max-w-4xl mx-auto space-y-6">
            {isLoading && (
              <>
                {[...Array(3)].map((_, idx) => (
                  <ProposalCardSkeleton key={idx} />
                ))}
              </>
            )}
            {isError && (
              <p className="text-red-500">Erro ao carregar propostas.</p>
            )}
            {filteredProposals?.length === 0 && !isLoading && !isError && (
              <p className="text-gray-600">Nenhuma proposta encontrada.</p>
            )}

            {filteredProposals?.map((proposal: Proposal) => (
              <ProposalCard
                key={proposal.id}
                title={proposal.title}
                author={proposal.company?.name || 'Desconhecido'}
                timeAgo={formatDistanceToNow(parseISO(proposal.created_at), {
                  addSuffix: true,
                  locale: ptBR,
                })}
                price={`R$ ${Number(proposal.value).toLocaleString('pt-BR')}`}
                description={proposal.description}
                skills={proposal.skill_requested}
                status={proposal.status}
                finalDate={proposal.final_date}
                onDetailsClick={() => openProposalDetails(proposal)}
              />
            ))}
          </div>
        </main>
      </div>

      {isAuthenticated && (
        <Button
          className="fixed bottom-6 right-6 z-50 w-12 h-12 shadow-lg"
          variant="default"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircleIcon className="w-6 h-6" />
        </Button>
      )}

      {selectedProposal && (
        <ProposalDetailsModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          proposal={selectedProposal}
          onContact={() => {
            if (!selectedProposal) return;
            console.log('Candidatura iniciada:', {
              userId: user?.id,
              userName: user?.name,
              companyId: selectedProposal.company.id,
              companyName: selectedProposal.company.name,
              proposalId: selectedProposal.id,
              proposalTitle: selectedProposal.title,
            });
          }}
        />
      )}
      <ChatModal open={isChatOpen} onOpenChange={setIsChatOpen} />
    </div>
  );
}

function SidebarItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 justify-center md:justify-start p-2 md:p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer group relative">
      <div className="w-5 h-5 flex-shrink-0">{icon}</div>
      <span className="hidden md:block">{label}</span>
      <div className="md:hidden absolute left-20 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}