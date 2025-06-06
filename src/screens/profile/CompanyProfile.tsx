import React from 'react';
import { ProfileImage } from '@/components/ui/profileimage';
import SocialLink from '@/components/ui/sociallink';
import { Button } from '@/components/ui/button';
import PhoneIcon from '@/assets/icons/IconPhone';
import FacebookIcon from '@/assets/icons/FacebookIcon';

const CompanyProfile = () => {
  const coverImage = '/images/Corinthians.jpg';
  const profileImage = '/images/Corinthians.jpg';
  const companyName = 'Corinthians';
  const description = 'Serviços futebolísticos de qualidade há mais de 2 anos.';
  const socialLinks = [
    {
      label: 'Facebook',
      url: 'https://facebook.com',
      icon: <FacebookIcon className="h-10 w-10 text-black" />,
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com',
      icon: <PhoneIcon className="h-10 w-10 text-gray-400" />,
    },
  ];
  const contactInfo = {
    phone: '(11) 99999-9999',
    email: 'contato@corinthians.com',
    cnpj: '00.000.000/0001-00',
    address: 'Rua Exemplo, 123 - São Paulo, SP',
  };
  const about = {
    description:
      'Somos uma empresa especializada em Corinthians. Somos uma empresa especializada em Corinthians. Somos uma empresa especializada em Corinthians. Somos uma empresa especializada em Corinthians. Somos uma empresa especializada em Corinthians. Somos uma empresa especializada em Corinthians.',
  };
  const proposalsButtonText = 'Visualizar Propostas';
  return (
    <div className="h-full w-full bg-gray-500 flex flex-col scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 overflow-y-auto">
      <img
        src={coverImage}
        alt={`Capa ${companyName}`}
        className="w-full h-64 object-cover shrink-0 brightness-25"
      />

      <div className="bg-gray-800 flex flex-col lg:flex-row-reverse p-4 relative w-full h-auto lg:h-56 shadow-2xl">
        {/* Profile Image Section */}
        <div className="flex justify-center lg:justify-start mt-[-85px] lg:mr-32 z-10">
          <ProfileImage
            className="relative"
            name={companyName}
            src={profileImage}
            minSize={200}
            maxSize={250}
          />
        </div>

        {/* Company Info Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:mx-8">
          <h1 className="text-[clamp(1.5rem,5vw,4rem)] text-white font-bold">
            {companyName}
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl lg:text-3xl mt-2">
            {description}
          </p>
        </div>

        {/* Social Links Section */}
        {socialLinks.length > 0 && (
          <div className="flex-1 flex flex-col items-center justify-center px-4 lg:px-8 mt-4 lg:mt-0">
            {socialLinks.map((link, index) => (
              <SocialLink
                key={index}
                label={link.label}
                url={link.url}
                className="text-gray-300"
                icon={link.icon} // passa o ícone já estilizado aqui
                textSize="text-sm md:text-xl"
              />
            ))}
          </div>
        )}
      </div>

      {/* Contact and About Section */}
      <div className="flex flex-row-reverse">
        <div className="bg-gray-700 p-6 text-white h-full w-full lg:w-1/4">
          <div className="flex flex-col space-y-6">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Informações</h2>
              <div className="space-y-3">
                {contactInfo.phone && (
                  <SocialLink
                    label={contactInfo.phone}
                    className="text-gray-300 hover:text-white"
                    icon={
                      <PhoneIcon className="fill-gray-400 stroke-gray-500 hover:fill-green-500 transition-colors h-6 w-6" />
                    }
                    url={`tel:${contactInfo.phone}`}
                    textSize="text-base"
                  />
                )}

                {contactInfo.email && (
                  <SocialLink
                    label={contactInfo.email}
                    className="text-gray-300 hover:text-white"
                    icon={
                      <PhoneIcon className="fill-gray-400 stroke-gray-500 hover:fill-green-500 transition-colors h-6 w-6" />
                    }
                    url={`mailto:${contactInfo.email}`}
                    textSize="text-base"
                  />
                )}

                {contactInfo.cnpj && (
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-6 w-6 fill-gray-400" />
                    <span className="text-gray-300">
                      CNPJ: {contactInfo.cnpj}
                    </span>
                  </div>
                )}

                {contactInfo.address && (
                  <SocialLink
                    label={contactInfo.address}
                    className="text-gray-300 hover:text-white"
                    icon={
                      <PhoneIcon className="fill-gray-400 stroke-gray-500 hover:fill-green-500 transition-colors h-6 w-6" />
                    }
                    url={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                    textSize="text-base"
                  />
                )}

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-4 py-3">
                  {proposalsButtonText}
                </Button>
              </div>
            </div>

            {/* About Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Sobre Nós</h2>
              <div className="bg-gray-600 p-4 rounded-lg">
                <p className="text-gray-300 md:max-h-12 overflow-y-auto scrollbar-thin">
                  {about.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
