import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCompanyById } from '@/services/company/companyService';

import { ProfileImage } from '@/components/ui/profileimage';
import SocialLink from '@/components/ui/sociallink';
import { Button } from '@/components/ui/button';
import PhoneIcon from '@/assets/icons/IconPhone';
import FacebookIcon from '@/assets/icons/FacebookIcon';
import Navbar from '@/components/ui/navbar';
import { MessageCircleIcon } from 'lucide-react';
import { useAuth } from '@/contexts/hooks/useAuth';
import ChatModal from '@/components/ui/chatModal';

const CompanyProfile = () => {
  const { isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const companyId = Number(id);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const {
    data: company,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => getCompanyById(companyId),
    enabled: !!companyId,
  });

  if (isLoading) return <div>Carregando...</div>;
  if (isError || !company) return <div>Erro ao carregar empresa.</div>;

  const address = company.address
    ? `${company.address.street}, ${company.address.number} - ${company.address.city}, ${company.address.state}`
    : 'Endereço não informado';

  const coverImage = '/images/Corinthians.jpg';

  return (
    <>
      <div className="h-full w-full bg-gray-500 flex flex-col scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 overflow-y-auto">
        <Navbar />
        {isAuthenticated && (
          <Button
            className="fixed bottom-6 right-6 z-50 w-12 h-12 shadow-lg"
            variant="default"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircleIcon className="w-6 h-6" />
          </Button>
        )}

        <ChatModal open={isChatOpen} onOpenChange={setIsChatOpen} />

        <img
          src={coverImage}
          alt={`Capa ${company.name}`}
          className="w-full h-64 object-cover shrink-0 brightness-25"
        />

        <div className="bg-gray-800 flex flex-col lg:flex-row-reverse p-4 relative w-full h-auto lg:h-56 shadow-2xl">
          <div className="flex justify-center lg:justify-start mt-[-85px] lg:mr-32 z-10">
            <ProfileImage
              className="relative"
              name={company.name}
              src={coverImage}
              minSize={200}
              maxSize={250}
            />
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:mx-8">
            <h1 className="text-[clamp(1.5rem,5vw,4rem)] text-white font-bold">
              {company.name}
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl lg:text-3xl mt-2">
              Serviços prestados com excelência desde{' '}
              {new Date(company.created_at).getFullYear()}
            </p>
          </div>

          {/* Social Links fictícios por enquanto */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 lg:px-8 mt-4 lg:mt-0">
            <SocialLink
              label="Facebook"
              url="https://facebook.com"
              className="text-gray-300"
              icon={<FacebookIcon className="h-10 w-10 text-black" />}
              textSize="text-sm md:text-xl"
            />
          </div>
        </div>

        <div className="flex flex-row-reverse">
          <div className="bg-gray-700 p-6 text-white h-full w-full lg:w-1/4">
            <div className="flex flex-col space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Informações</h2>
                <div className="space-y-3">
                  <SocialLink
                    label={company.phone}
                    url={`tel:${company.phone}`}
                    className="text-gray-300"
                    icon={
                      <PhoneIcon className="h-6 w-6 fill-gray-400 stroke-gray-500" />
                    }
                    textSize="text-base"
                  />
                  <SocialLink
                    label={company.email ?? 'contato@empresa.com'}
                    url={`mailto:${company.email ?? 'contato@empresa.com'}`}
                    className="text-gray-300"
                    icon={
                      <PhoneIcon className="h-6 w-6 fill-gray-400 stroke-gray-500" />
                    }
                    textSize="text-base"
                  />
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-6 w-6 fill-gray-400" />
                    <span className="text-gray-300">CNPJ: {company.cnpj}</span>
                  </div>
                  <SocialLink
                    label={address}
                    url={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                    className="text-gray-300"
                    icon={
                      <PhoneIcon className="h-6 w-6 fill-gray-400 stroke-gray-500" />
                    }
                    textSize="text-base"
                  />

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-4 py-3">
                    Visualizar Propostas
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Sobre Nós</h2>
                <div className="bg-gray-600 p-4 rounded-lg">
                  <p className="text-gray-300">
                    Somos uma empresa especializada em soluções tecnológicas
                    para o futuro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
