import React, { useState, useEffect } from 'react';
import type { Duration } from '../types';

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  martialArt: string | null;
  durations: Duration[];
  onGeneratePlan: (duration: string) => void;
  isLoading: boolean;
}

const SelectionModal: React.FC<SelectionModalProps> = ({ isOpen, onClose, martialArt, durations, onGeneratePlan, isLoading }) => {
  const [step, setStep] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedDuration(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
        onClose();
       }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  if (!isOpen || !martialArt) return null;
  
  const handleConfirmArt = () => {
    setStep(2);
  };
  
  const handleSelectDuration = (duration: string) => {
    setSelectedDuration(duration);
  };
  
  const handleGenerate = () => {
      if (selectedDuration) {
          onGeneratePlan(selectedDuration);
      }
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in" 
        aria-modal="true" 
        role="dialog"
        onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg border border-slate-700 transform transition-all duration-300 scale-100 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 relative">
          <button onClick={onClose} aria-label="Close modal" className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-violet-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {step === 1 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Confirm Your Discipline</h2>
              <p className="text-4xl font-serif text-violet-400 mb-8">{martialArt}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button
                    onClick={onClose}
                    className="bg-slate-700 text-slate-300 font-bold py-3 px-8 rounded-lg text-lg transition-colors hover:bg-slate-600 order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                <button
                  onClick={handleConfirmArt}
                  className="bg-violet-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-violet-500/50 shadow-lg shadow-violet-500/20 hover:bg-violet-700 order-1 sm:order-2"
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          )}
          
          {step === 2 && (
             <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Select Your Commitment</h2>
                <p className="text-md text-slate-400 mb-6">Discipline: <span className="font-bold text-violet-400">{martialArt}</span></p>

                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
                    {durations.map((duration) => (
                        <button
                        key={duration.value}
                        onClick={() => handleSelectDuration(duration.value)}
                        className={`
                            px-5 py-2 font-semibold rounded-lg text-sm md:text-base
                            transition-all duration-300 transform hover:-translate-y-0.5
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
                            ${selectedDuration === duration.value 
                                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20 focus:ring-violet-400 border border-violet-600' 
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:border-slate-500 focus:ring-slate-400 border border-slate-600'}
                        `}
                        >
                        {duration.label}
                        </button>
                    ))}
                </div>
                
                <div className={`transition-all duration-500 ease-in-out ${selectedDuration ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !selectedDuration}
                        className="w-full max-w-sm mx-auto bg-violet-600 text-white font-bold py-3 px-10 rounded-lg text-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-violet-500/50 shadow-lg shadow-violet-500/20 hover:bg-violet-700 transform hover:-translate-y-1 disabled:transform-none"
                    >
                        {isLoading ? 'Forging Your Path...' : 'Generate Learning Plan'}
                    </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectionModal;