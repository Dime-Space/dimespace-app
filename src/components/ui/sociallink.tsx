import React from 'react';
import DimeIcons, { IconName } from '@/assets/icons/pageicon';

export interface SocialLinkProps {
  label: string;
  url: string;
  icon?:
    | IconName
    | React.ReactElement<{ className?: string; size?: number | string }>;
  className?: string;
  iconSize?: number | string;
  textSize?: string;
  iconColor?: {
    fill?: string;
    stroke?: string;
  };
  hideLabel?: boolean;
  strokeWidth?: string | number;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  label,
  url,
  icon,
  className = '',
  iconSize = 24,
  textSize = 'text-base',
  iconColor = {
    fill: 'currentColor',
    stroke: 'currentColor',
  },
  hideLabel = false,
  strokeWidth = '2',
}) => {
  const isDimeIcon = typeof icon === 'string';
  const sizeClass = typeof iconSize === 'string' ? iconSize : '';
  const pixelSize = typeof iconSize === 'number' ? iconSize : undefined;

  const renderIcon = () => {
    if (!icon) return null;

    if (isDimeIcon) {
      return (
        <DimeIcons
          icon={icon as IconName}
          size={pixelSize}
          fillColor={iconColor?.fill}
          strokeColor={iconColor?.stroke}
          strokeWidth={strokeWidth}
          className={sizeClass}
        />
      );
    }

    // Solução type-safe para clonar o elemento
    const iconProps = {
      ...icon.props,
      className: `${icon.props.className || ''} ${sizeClass}`.trim(),
      size: pixelSize ?? (icon.props as { size?: number | string }).size,
    };

    return React.cloneElement(icon, iconProps);
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${className}`}
      aria-label={label}
    >
      {renderIcon()}
      {!hideLabel && label && (
        <span className={`${textSize} ${icon ? 'ml-2' : ''}`}>{label}</span>
      )}
    </a>
  );
};

export default SocialLink;
