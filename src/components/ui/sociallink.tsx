import React from 'react';

interface SocialLinkProps {
  icon: React.ReactNode;
  label: string;
  url: string;
  className?: string;
  iconSize?: string;
  textSize?: string;
  iconColor?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  icon,
  label,
  url,
  className = '',
  iconSize,
  textSize = '',
  iconColor = 'text-current',
}) => {
  const renderIcon = () => {
    if (!React.isValidElement(icon)) return icon;

    // Extrai as props existentes de forma type-safe
    const existingProps = icon.props as React.ComponentProps<'svg'> & {
      className?: string;
    };

    // Cria novas props com tipagem explícita
    const newProps: React.ComponentProps<'svg'> = {
      ...existingProps,
      className:
        `${existingProps.className || ''} ${iconColor} ${iconSize}`.trim(),
      'aria-hidden': true,
    };

    return React.createElement(icon.type, newProps);
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors ${className}`}
    >
      <span className={`${iconSize} flex items-center justify-center`}>
        {renderIcon()}
      </span>
      {label && <span className={textSize}>{label}</span>}
    </a>
  );
};

export default SocialLink;
