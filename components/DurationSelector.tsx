import React from 'react';
import type { Duration } from '../types';

interface DurationSelectorProps {
  durations: Duration[];
  selectedDuration: string | null;
  onSelect: (duration: string) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ durations, selectedDuration, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      {durations.map((duration) => (
        <button
          key={duration.value}
          onClick={() => onSelect(duration.value)}
          className={`
            px-5 py-2 font-semibold rounded-lg text-sm md:text-base
            transition-all duration-300 transform hover:-translate-y-0.5
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
            ${selectedDuration === duration.value 
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20 focus:ring-violet-400 border border-violet-600' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:border-slate-500 focus:ring-slate-400 border border-slate-600'}
          `}
        >
          {duration.label}
        </button>
      ))}
    </div>
  );
};

export default DurationSelector;