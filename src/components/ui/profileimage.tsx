import React, { useState } from 'react';

interface ProfileImageProps {
  name: string;
  src?: string; // Caminho completo da imagem
  size?: number;
  className?: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  name,
  src,
  size = 120,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full border-4 border-primary shadow-md bg-muted text-muted-foreground overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={`Foto de ${name}`}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="text-2xl font-bold">{getInitials(name)}</span>
      )}
    </div>
  );
};
