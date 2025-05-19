import React, { useEffect, useState } from 'react';

interface ProfileImageProps {
  name: string;
  src?: string; // Caminho completo da imagem
  size?: number; // Tamanho fixo (opcional, sobrescreve a lógica)
  minSize?: number; // Tamanho mínimo responsivo
  maxSize?: number; // Tamanho máximo responsivo
  className?: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  name,
  src,
  size,
  minSize = 96, // padrão: 96px
  maxSize = 256, // padrão: 256px
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const [responsiveSize, setResponsiveSize] = useState(size ?? minSize);

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  useEffect(() => {
    const calculateSize = () => {
      if (size !== undefined) return; // Se tamanho fixo foi passado, ignora

      const width = window.innerWidth;
      // Mapeia linearmente entre 360px e 1280px (ajustável)
      const minViewport = 360;
      const maxViewport = 1280;
      const clamped = Math.min(Math.max(width, minViewport), maxViewport);
      const ratio = (clamped - minViewport) / (maxViewport - minViewport);
      const newSize = Math.round(minSize + ratio * (maxSize - minSize));
      setResponsiveSize(newSize);
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, [size, minSize, maxSize]);

  const finalSize = size ?? responsiveSize;

  return (
    <div
      className={`flex items-center justify-center rounded-full border-8 shadow-2xl bg-muted text-muted-foreground overflow-hidden ${className}`}
      style={{ width: finalSize, height: finalSize }}
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
