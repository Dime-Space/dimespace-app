import { useState } from 'react';
import { Clock, Settings, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/ui/navbar';
import ProposalCard from '@/components/ui/feed/proposalcard';
import ChatModal from '@/components/ui/chatModal';

export default function ProposalPlatform() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Component */}
      <Navbar />

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="relative w-16 md:w-64 bg-white shadow-sm p-2 md:p-4 transition-all duration-300">
          <nav className="space-y-2">
            <div className="flex items-center gap-3 justify-center md:justify-start p-2 md:p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer group">
              <Clock className="w-5 h-5 flex-shrink-0" />
              <span className="hidden md:block">Histórico de propostas</span>
              <div className="md:hidden absolute left-20 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Histórico de propostas
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start p-2 md:p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer group">
              <Settings className="w-5 h-5 flex-shrink-0" />
              <span className="hidden md:block">Configurações</span>
              <div className="md:hidden absolute left-20 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Configurações
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start p-2 md:p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer group">
              <FileText className="w-5 h-5 flex-shrink-0" />
              <span className="hidden md:block">Fazer proposta</span>
              <div className="md:hidden absolute left-20 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Fazer proposta
              </div>
            </div>
          </nav>

          {/* Sporting Bet Ad - Hidden on smaller screens, shown on md and larger */}
          <div className="mt-8 hidden md:block">
            <Card className="bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-lg font-bold mb-2">sporting bet</div>
                  <div className="text-sm opacity-90">Apostas esportivas</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* First Proposal - With Image */}
            <ProposalCard
              title="Prefeitura de Taubaté"
              author="Responsável da Silva"
              timeAgo="26h"
              price="R$ 1.040,00"
              description="Quero um programa que faz tal da silva e que faz também um café da silva onde o café da silva vai até roma e volta de avião com o Cristiano Ronaldo Lorem Ipsum;"
              imageUrl="/placeholder.svg?height=256&width=600"
              imageAlt="Uber project"
            />

            {/* Second Proposal - Without Image */}
            <ProposalCard
              title="Prefeitura de Taubaté"
              author="Responsável da Silva"
              timeAgo="26h"
              price="R$ 1.040,00"
              description="Quero um programa que faz tal da silva e que faz também um café da silva onde o café da silva vai até roma e volta de avião com o Cristiano Ronaldo Lorem Ipsum."
            />

            {/* Third Proposal - With Image */}
            <ProposalCard
              title="Empresa de Tecnologia"
              author="João Santos"
              timeAgo="2h"
              price="R$ 2.500,00"
              description="Desenvolvimento de aplicativo mobile para delivery de comida com integração de pagamento e GPS."
              imageUrl="/placeholder.svg?height=256&width=600"
              imageAlt="Mobile app project"
            />
          </div>
        </main>
      </div>

      <Button
        className="fixed bottom-6 right-6 z-50 shadow-lg"
        variant="default"
        onClick={() => setIsChatOpen(true)}
      >
        Abrir Chat
      </Button>

      <ChatModal open={isChatOpen} onOpenChange={setIsChatOpen} />
    </div>
  );
}
