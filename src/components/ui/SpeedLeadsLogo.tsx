import React from 'react';

interface ISpeedLeadsLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'text-lg sm:text-xl',
  md: 'text-xl sm:text-2xl md:text-3xl',
  lg: 'text-3xl sm:text-4xl md:text-5xl',
  xl: 'text-4xl sm:text-5xl md:text-6xl',
};

const SpeedLeadsLogo: React.FC<ISpeedLeadsLogoProps> = ({ size = 'md', className = '' }) => (
  <span dir="ltr" className={`inline-flex items-baseline ${sizeClasses[size]} ${className}`}>
    <span className="font-logo-speed font-bold text-white">Speed</span>
    <span className="font-logo-leads italic gradient-text">Leads</span>
    <span className="text-white font-bold">.AI</span>
  </span>
);

export default SpeedLeadsLogo;
