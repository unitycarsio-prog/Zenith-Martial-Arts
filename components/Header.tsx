import React from 'react';
import FistIcon from './icons/FistIcon';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FistIcon className="h-8 w-8 text-violet-400" />
          <span className="text-xl font-bold text-slate-100 tracking-wide">
            Zenith Martial Arts
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;