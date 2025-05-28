import React from 'react';
import { ProfileImage } from '@/components/ui/profileimage';
import SocialLink, { SocialLinkProps } from '@/components/ui/sociallink';
import DimeIcons, { IconName } from '@/assets/icons/pageicon';
import { Button } from '@/components/ui/button';

export interface CompanyProfileProps {
  coverImage: string;
  profileImage: string;
  companyName: string;
  description: string;
  socialLinks?: SocialLinkProps[];
  contactInfo: {
    phone?: string;
    email?: string;
    cnpj?: string;
    address?: string;
  };
  about: {
    description: string;
  };
  proposalsButtonText?: string;
}

const CompanyProfile = ({
  coverImage,
  profileImage,
  companyName,
  description,
  socialLinks = [],
  contactInfo,
  about,
  proposalsButtonText = 'Visualizar Propostas',
}: CompanyProfileProps) => {
  return (
    <div className="h-screen w-full bg-gray-500 flex flex-col">
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
                icon={link.icon as IconName} // Type assertion segura
                iconSize="h-10 w-10"
                iconColor={{
                  fill: 'black',
                  stroke: 'gray-400',
                }}
                textSize="text-sm md:text-xl"
              />
            ))}
          </div>
        )}
      </div>

      {/* Contact and About Section */}
      <div className="flex h-full flex-row-reverse">
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
                      <DimeIcons
                        className="fill-gray-400 stroke-gray-500 hover:fill-green-500 transition-colors h-6 w-6"
                        icon="phone"
                      />
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
                      <DimeIcons
                        className="fill-gray-400 stroke-gray-500 hover:fill-green-500 transition-colors h-6 w-6"
                        icon="email"
                      />
                    }
                    url={`mailto:${contactInfo.email}`}
                    textSize="text-base"
                  />
                )}

                {contactInfo.cnpj && (
                  <div className="flex items-center gap-2">
                    <DimeIcons
                      className="h-6 w-6 fill-gray-400"
                      icon="phone" // Altere para o ícone adequado
                    />
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
                      <DimeIcons
                        className="fill-gray-400 stroke-gray-500 hover:fill-green-500 transition-colors h-6 w-6"
                        icon="location"
                      />
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
                <p className="text-gray-300">{about.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
