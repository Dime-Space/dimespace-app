import React from 'react';
import { ProfileImage } from '@/components/ui/profileimage';
import SocialLink from '@/components/ui/sociallink';
import DimeIcons from '@/assets/icons/pageicon';

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
                  fillColor="white"
                  strokeColor="black"
                  icon="facebook"
                />
              }
              url="https://facebook.com"
              iconSize="w-8 h-8 md:w-12 md:h-12" // Tamanho menor do ícone
              textSize="text-sm md:text-xl" // Texto menor
              iconColor="text-gray-300" // Cor do ícone
            />
            <SocialLink
              label="Github"
              className="text-gray-300"
              icon={
                <DimeIcons
                  fillColor="white"
                  strokeColor="black"
                  icon="github"
                />
              }
              url="https://github.com"
              iconSize="w-8 h-8 md:w-12 md:h-12" // Tamanho menor do ícone
              textSize="text-sm md:text-xl" // Texto menor
              iconColor="text-gray-300" // Cor do ícone
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-700 p-6 text-white h-full w-full lg:w-1/4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Sobre Mim</h2>
          <p className="text-gray-300">
            Desenvolvedor front-end com 5 anos de experiência em React e
            TypeScript. Apaixonado por criar interfaces intuitivas e
            performáticas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
