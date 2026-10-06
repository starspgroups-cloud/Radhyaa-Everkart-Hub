import React from 'react';
import { ASSETS } from '../data/assets';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  light?: boolean;
  emblemOnly?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  light = false,
  emblemOnly = false,
}) => {
  const imgDimension =
    size === 'sm'
      ? 'w-9 h-9'
      : size === 'lg'
      ? 'w-16 h-16'
      : size === 'xl'
      ? 'w-24 h-24'
      : 'w-12 h-12';

  const textClasses =
    size === 'sm' ? 'text-base' : size === 'lg' || size === 'xl' ? 'text-2xl' : 'text-xl';

  if (emblemOnly) {
    return (
      <div className={`relative ${imgDimension} rounded-full overflow-hidden shadow-md border-2 border-white/80 ${className}`}>
        <img
          src={ASSETS.logo}
          alt="Radhyaa Everkart Hub Official Emblem"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Official Circular Botanical Brand Emblem */}
      <div
        className={`relative ${imgDimension} rounded-full overflow-hidden shrink-0 shadow-sm border ${
          light ? 'border-amber-200/50 ring-2 ring-white/10' : 'border-[#1C4832]/30 ring-1 ring-[#112E1F]/10'
        }`}
      >
        <img
          src={ASSETS.logo}
          alt="Radhyaa Everkart Hub Official Emblem"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col leading-tight">
        <span
          className={`font-serif tracking-wider font-semibold uppercase ${textClasses} ${
            light ? 'text-[#FAF8F5]' : 'text-[#112E1F]'
          }`}
        >
          Radhyaa Everkart Hub
        </span>
        {showTagline && (
          <span
            className={`text-[11px] tracking-wide font-sans mt-0.5 ${
              light ? 'text-amber-200/90' : 'text-[#245A3E]'
            }`}
          >
            Every Season · Every Occasion · Every Need
          </span>
        )}
      </div>
    </div>
  );
};
