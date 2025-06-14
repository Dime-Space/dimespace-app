// StarIcon.tsx
import React from 'react';

type IconProps = {
  className?: string;
  fill?: string;
  stroke?: string;
  size?: number | string;
  strokeWidth?: number | string;
};

const StarIcon: React.FC<IconProps> = ({
  className = '',
  fill = 'currentColor',
  stroke = 'none',
  size = 24,
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={fill}
    stroke={stroke}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.00001 0H7.00001L5.51292 4.57681L0.700554 4.57682L0.0825195 6.47893L3.97581 9.30756L2.48873 13.8843L4.10677 15.0599L8.00002 12.2313L11.8933 15.0599L13.5113 13.8843L12.0242 9.30754L15.9175 6.47892L15.2994 4.57681L10.4871 4.57681L9.00001 0Z"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default StarIcon;
