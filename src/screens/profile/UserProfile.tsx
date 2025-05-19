import React from 'react';

import { Button } from '@/components/ui/button';
import { ProfileImage } from '@/components/ui/profileimage';

const UserProfile = () => {
  const urlImage = '/images/yuri.png';
  return (
    <div className="h-screen w-screen bg-gray-500 flex flex-col overflow-hidden">
      <img
        src={urlImage}
        alt="Yuri Alberto"
        className="w-full h-64 object-cover shrink-0 brightness-25"
      />

      <div className="bg-gray-800 flex flex-col lg:flex-row relative w-full h-auto lg:h-56 shadow-2xl">
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
        <div className="flex-1 flex flex-col lg:flex-row justify-between px-4">
          {/* Texto do nome e status, com margin-left zerada no lg */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:ml-4">
            <h1 className="text-[clamp(1.5rem,5vw,4rem)] text-white font-bold">
              Yuri Alberto
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl lg:text-3xl mt-2">
              Desenvolvedor Front-end
            </p>
          </div>

          {/* Contato */}
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="text-gray-300 text-xl md:text-2xl lg:text-3xl">
              Contato
            </h2>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </div>
  );
};

export default UserProfile;
