import React from 'react';
import type { MartialArt } from '../types';
import FistIcon from './icons/FistIcon';

interface MartialArtSelectorProps {
  martialArts: MartialArt[];
  selectedArt: string | null;
  onSelect: (art: string) => void;
}

const colorVariants: Record<string, Record<string, string>> = {
  red:    { border: 'border-transparent', hoverBorder: 'hover:border-red-400',    selected: 'border-red-500 ring-4 ring-red-500/20',    icon: 'text-red-500' },
  sky:    { border: 'border-transparent', hoverBorder: 'hover:border-sky-400',    selected: 'border-sky-500 ring-4 ring-sky-500/20',    icon: 'text-sky-500' },
  blue:   { border: 'border-transparent', hoverBorder: 'hover:border-blue-400',   selected: 'border-blue-500 ring-4 ring-blue-500/20',   icon: 'text-blue-500' },
  amber:  { border: 'border-transparent', hoverBorder: 'hover:border-amber-400',  selected: 'border-amber-500 ring-4 ring-amber-500/20',  icon: 'text-amber-500' },
  purple: { border: 'border-transparent', hoverBorder: 'hover:border-purple-400', selected: 'border-purple-500 ring-4 ring-purple-500/20', icon: 'text-purple-500' },
  rose:   { border: 'border-transparent', hoverBorder: 'hover:border-rose-400',   selected: 'border-rose-500 ring-4 ring-rose-500/20',   icon: 'text-rose-500' },
  teal:   { border: 'border-transparent', hoverBorder: 'hover:border-teal-400',   selected: 'border-teal-500 ring-4 ring-teal-500/20',   icon: 'text-teal-500' },
  slate:  { border: 'border-transparent', hoverBorder: 'hover:border-slate-400',  selected: 'border-slate-500 ring-4 ring-slate-500/20',  icon: 'text-slate-500' },
  fuchsia:{ border: 'border-transparent', hoverBorder: 'hover:border-fuchsia-400',selected: 'border-fuchsia-500 ring-4 ring-fuchsia-500/20',icon: 'text-fuchsia-500' },
  green:  { border: 'border-transparent', hoverBorder: 'hover:border-green-400',  selected: 'border-green-500 ring-4 ring-green-500/20',  icon: 'text-green-500' },
  yellow: { border: 'border-transparent', hoverBorder: 'hover:border-yellow-400', selected: 'border-yellow-500 ring-4 ring-yellow-500/20', icon: 'text-yellow-500' },
  cyan:   { border: 'border-transparent', hoverBorder: 'hover:border-cyan-400',   selected: 'border-cyan-500 ring-4 ring-cyan-500/20',   icon: 'text-cyan-500' },
  lime:   { border: 'border-transparent', hoverBorder: 'hover:border-lime-400',   selected: 'border-lime-500 ring-4 ring-lime-500/20',   icon: 'text-lime-500' },
  indigo: { border: 'border-transparent', hoverBorder: 'hover:border-indigo-400', selected: 'border-indigo-500 ring-4 ring-indigo-500/20', icon: 'text-indigo-500' },
  pink:   { border: 'border-transparent', hoverBorder: 'hover:border-pink-400',   selected: 'border-pink-500 ring-4 ring-pink-500/20',   icon: 'text-pink-500' },
  gray:   { border: 'border-transparent', hoverBorder: 'hover:border-gray-400',   selected: 'border-gray-500 ring-4 ring-gray-500/20',   icon: 'text-gray-500' },
  orange: { border: 'border-transparent', hoverBorder: 'hover:border-orange-400', selected: 'border-orange-500 ring-4 ring-orange-500/20', icon: 'text-orange-500' },
  emerald:{ border: 'border-transparent', hoverBorder: 'hover:border-emerald-400',selected: 'border-emerald-500 ring-4 ring-emerald-500/20',icon: 'text-emerald-500' },
  violet: { border: 'border-transparent', hoverBorder: 'hover:border-violet-400', selected: 'border-violet-500 ring-4 ring-violet-500/20', icon: 'text-violet-500' }
};

const MartialArtSelector: React.FC<MartialArtSelectorProps> = ({ martialArts, selectedArt, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {martialArts.map((art) => {
        const isSelected = selectedArt === art.name;
        const artColor = colorVariants[art.color] || colorVariants.indigo;

        return (
          <div
            key={art.name}
            onClick={() => onSelect(art.name)}
            className={`
              group cursor-pointer rounded-xl overflow-hidden
              transition-all duration-300 transform
              flex flex-col items-center justify-center p-4 h-40
              bg-slate-800
              border-2 ${artColor.border} ${artColor.hoverBorder}
              shadow-lg hover:shadow-xl shadow-black/20
              hover:scale-105 hover:-translate-y-1
              ${isSelected ? `${artColor.selected} scale-105` : 'border-slate-700'}
            `}
          >
            <FistIcon className={`
              w-12 h-12 mb-3 transition-all duration-300
              ${artColor.icon}
              ${isSelected ? '' : 'opacity-80 group-hover:opacity-100'}`}
            />
            <h3 className={`
              font-semibold text-center
              ${isSelected ? 'text-white' : `text-slate-400 group-hover:text-white`}
            `}>
              {art.name}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default MartialArtSelector;