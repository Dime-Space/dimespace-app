import React from 'react';
import { ProfileImage } from '@/components/ui/profileimage';
import SocialLink from '@/components/ui/sociallink';
import DimeIcons from '@/assets/icons/pageicon';
import { Button } from '@/components/ui/button';

const CompanyProfile = () => {
  const urlImage = '/images/Corinthians.jpg';

  return (
    <div className="h-full w-full bg-gray-500 flex flex-col">
      <img
        src={urlImage}
        alt="Corinthians"
        className="w-full h-64 object-cover shrink-0 brightness-25"
      />

      <div className="bg-gray-800 flex flex-col lg:flex-row-reverse p-4 relative w-full h-auto lg:h-56 shadow-2xl">
        {/* Imagem de perfil */}
        <div className="flex justify-center lg:justify-start mt-[-85px] lg:mr-32 z-10">
          <ProfileImage
            className="relative"
            name="Corinthians"
            src={urlImage}
            minSize={200}
            maxSize={250}
          />
        </div>

        {/* Container que agrupa nome + contato */}
        {/* Texto do nome e status, com margin-left zerada no lg */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:mx-8">
          <h1 className="text-[clamp(1.5rem,5vw,4rem)] text-white font-bold">
            Cortinas
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl lg:text-3xl mt-2">
            Empresa de Tecnologia e Inovação
          </p>
        </div>

        {/* Contato */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 lg:px-8 mt-4 lg:mt-0">
          <SocialLink
            label="Facebook"
            className="text-gray-300"
            icon={
              <DimeIcons
                className="fill-black stroke-gray-400 hover:fill-red-500 hover:stroke-red-700 transition-colors h-10 w-10"
                icon="facebook"
              />
            }
            url="https://facebook.com"
            textSize="text-sm md:text-xl" // Texto menor
            iconColor="text-gray-300" // Cor do ícone
          />
          <SocialLink
            label="Github"
            className="text-gray-300"
            icon={
              <DimeIcons
                className="fill-black stroke-gray-400  hover:fill-red-500 hover:stroke-red-700 transition-colors h-10 w-10"
                icon="github"
              />
            }
            url="https://github.com"
            textSize="text-sm md:text-xl" // Texto menor
          />
        </div>
      </div>
      {/* Barra de baixo com informações de contato e sobre a empresa */}
      <div className="flex flex-row-reverse">
        <div className="bg-gray-700 p-6 text-white h-full w-full lg:w-1/4">
          <div className="flex flex-col space-y-6">
            {/* Informações de contato */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Informações</h2>
              <div className="space-y-3">
                <SocialLink
                  label="(11) 4002-8922"
                  className="text-gray-300 hover:text-white"
                  icon={
                    <DimeIcons
                      className="fill-gray-400 stroke-gray-500 hover:fill-green-500 transition-colors h-6 w-6"
                      icon="phone"
                    />
                  }
                  url="tel:+551140028922"
                  textSize="text-base"
                />

                <SocialLink
                  label="contato@techcorp.com"
                  className="text-gray-300 hover:text-white"
                  icon={
                    <DimeIcons
                      className="fill-gray-400 stroke-gray-500 hover:fill-green-500 transition-colors h-6 w-6"
                      icon="email"
                    />
                  }
                  url="mailto:contato@techcorp.com"
                  textSize="text-base"
                />

                <div className="flex items-center gap-2">
                  <DimeIcons
                    className="h-6 w-6 fill-gray-400"
                    icon="phone" // Temporário
                  />
                  <span className="text-gray-300">
                    CNPJ: 00.000.000/0001-00
                  </span>
                </div>

                <SocialLink
                  label="Av. Paulista, 1000 - São Paulo/SP"
                  className="text-gray-300 hover:text-white"
                  icon={
                    <DimeIcons
                      className="fill-gray-400 stroke-gray-500 hover:fill-green-500 transition-colors h-6 w-6"
                      icon="phone" // Temporário
                    />
                  }
                  url="https://maps.com/techcorp"
                  textSize="text-base"
                />

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-4 py-3">
                  Visualizar Propostas
                </Button>
              </div>
            </div>

            {/* Sobre a empresa */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Sobre Nós</h2>
              <div className="bg-gray-600 p-4 rounded-lg">
                <p className="text-gray-300">
                  Líderes em soluções tecnológicas inovadoras para empresas
                  globais. Especializados em desenvolvimento de software
                  empresarial, IA e transformação digital.
                </p>
                <div className="mt-4 flex gap-4 justify-end">
                  <DimeIcons
                    className="h-6 w-6 fill-blue-400"
                    icon="phone" // Temporário
                  />
                  <DimeIcons
                    className="h-6 w-6 fill-yellow-400"
                    icon="phone" // Temporário
                  />
                  <DimeIcons
                    className="h-6 w-6 fill-green-400"
                    icon="phone" // Temporário
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
