import React from 'react';
import { ProfileImage } from '@/components/ui/profileimage';
import SocialLink from '@/components/ui/sociallink';
import DimeIcons from '@/assets/icons/pageicon';
import { Button } from '@/components/ui/button';

const UserProfile = () => {
  const urlImage = '/images/yuri.png';

  return (
    <div className="h-screen w-screen bg-gray-500 flex flex-col">
      <img
        src={urlImage}
        alt="Yuri Alberto"
        className="w-full h-64 object-cover shrink-0 brightness-25"
      />

      <div className="bg-gray-800 flex flex-col lg:flex-row p-4 relative w-full h-auto lg:h-56 shadow-2xl">
        {/* Imagem de perfil */}
        <div className="flex justify-center lg:justify-start mt-[-85px] lg:ml-32 z-10">
          <ProfileImage
            className="relative"
            name="Yuri Alberto"
            src={urlImage}
            minSize={200}
            maxSize={250}
          />
        </div>

        {/* Container que agrupa nome + contato */}
        <div className="flex flex-col lg:flex-row px-4 w-full">
          {/* Texto do nome e status, com margin-left zerada no lg */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:mx-8">
            <h1 className="text-[clamp(1.5rem,5vw,4rem)] text-white font-bold">
              Yuri Alberto
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl lg:text-3xl mt-2">
              Desenvolvedor Front-end
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
      </div>
      <div className="bg-gray-700 p-6 text-white h-full w-full lg:w-1/4">
        <div className="flex flex-col space-y-6">
          {/* Seção de Contato */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contato</h2>
            <div className="space-y-3">
              <SocialLink
                label="(11) 99999-9999"
                className="text-gray-300 hover:text-white"
                icon={
                  <DimeIcons
                    className="fill-black stroke-gray-400 hover:fill-red-500 hover:stroke-red-700 transition-colors h-6 w-6"
                    icon="phone"
                  />
                }
                url="tel:+5511999999999"
                textSize="text-base"
              />

              <SocialLink
                label="yuri@exemplo.com"
                className="text-gray-300 hover:text-white"
                icon={
                  <DimeIcons
                    className="fill-black stroke-gray-400 hover:fill-red-500 hover:stroke-red-700 transition-colors h-6 w-6"
                    icon="email"
                  />
                }
                url="mailto:yuri@exemplo.com"
                textSize="text-base"
              />

              <Button className="w-full text-black bg-gray-300 hover:bg-gray-800 hover:text-white transition-colors mt-2">
                Enviar Mensagem
              </Button>
            </div>
          </div>

          {/* Seção de Avaliação */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Avaliação</h2>
            <div className="bg-gray-600 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <DimeIcons
                    key={i}
                    className={`h-5 w-5 pr-1 ${i < 4 ? 'fill-yellow-400 stroke-yellow-500' : 'fill-gray-400 stroke-gray-500'}`}
                    icon="star"
                  />
                ))}
                <span className="ml-2 text-yellow-400 font-semibold">4.0</span>
              </div>
              <p className="text-gray-300 text-sm">
                "Yuri é um desenvolvedor excepcional com habilidades técnicas
                impressionantes e uma grande capacidade de trabalhar em equipe."
              </p>
              <p className="text-gray-400 mt-2 text-right text-sm">
                - Antigo Empregador
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
