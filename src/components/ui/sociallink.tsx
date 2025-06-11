import React from 'react';

export interface SocialLinkProps {
  label: string;
  url: string;
  icon?: React.ReactElement;
  className?: string;
  textSize?: string;
  hideLabel?: boolean;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  label,
  url,
  icon,
  className = '',
  textSize = 'text-base',
  hideLabel = false,
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${className}`}
      aria-label={label}
    >
      {icon}
      {!hideLabel && label && (
        <span className={`${textSize} ${icon ? 'ml-2' : ''}`}>{label}</span>
      )}
    </a>
  );
};

export default SocialLink;
