import React, { useState, useMemo } from 'react';
import type { CoursePlanDay } from '../types';

interface CoursePlanDisplayProps {
  isLoading: boolean;
  error: string | null;
  plan: CoursePlanDay[] | null;
  martialArt: string | null;
  startDate?: string;
  onBack: () => void;
  completedDays: boolean[];
  onToggleCompletion: (dayIndex: number) => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-slate-800 rounded-lg shadow-md">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-500"></div>
    <p className="text-violet-400 text-lg font-semibold">Generating your personalized plan...</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-900/50 border border-red-700 text-red-300 px-6 py-4 rounded-lg relative" role="alert">
    <strong className="font-bold text-red-200">An Error Occurred</strong>
    <span className="block mt-1 sm:inline">{message}</span>
  </div>
);

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);


const CoursePlanDisplay: React.FC<CoursePlanDisplayProps> = ({ isLoading, error, plan, martialArt, startDate, onBack, completedDays, onToggleCompletion }) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

  const todayIndex = useMemo(() => {
    if (!startDate) return -1;
    const start = new Date(startDate);
    const today = new Date();
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [startDate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!plan) {
    return null;
  }

  const todaysTask = todayIndex >= 0 && todayIndex < plan.length ? plan[todayIndex] : null;
  const isTodayTaskComplete = todaysTask && todayIndex !== -1 ? completedDays[todayIndex] : false;
  
  const completedCount = completedDays.filter(Boolean).length;
  const progressPercentage = plan.length > 0 ? (completedCount / plan.length) * 100 : 0;

  const getTodayMessage = () => {
    if (todayIndex < 0) {
        const start = new Date(startDate!);
        return `Your journey begins on ${start.toLocaleDateString()}. Get ready!`;
    }
    if (todayIndex >= plan.length) {
        return "You've completed your training plan. Congratulations on your dedication!";
    }
    return `Day ${todayIndex + 1} of your training. Stay focused!`;
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  return (
    <section id="course-plan" className="max-w-4xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-4xl font-serif text-white">Your <span className="text-violet-400">{martialArt}</span> Path</h3>
        </div>
        <button
          onClick={onBack}
          className="bg-slate-800 text-slate-300 font-semibold py-2 px-5 rounded-lg text-sm hover:bg-slate-700 transition-colors duration-300 border border-slate-600 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          Create New Plan
        </button>
      </div>
      
       <div className="mb-8 bg-slate-800 border border-slate-700 rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-2 text-sm">
            <h4 className="font-semibold text-slate-400">Your Progress</h4>
            <span className="font-bold text-violet-400">{completedCount} / {plan.length} Days Completed</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>


      <div className="bg-slate-800 border-2 border-violet-500 rounded-2xl shadow-lg shadow-violet-500/20 p-6 md:p-8 mb-8">
        <h4 className="text-3xl font-bold font-serif text-violet-400 mb-2">Today's Focus</h4>
        <p className="text-slate-400 mb-6">{getTodayMessage()}</p>
        {todaysTask ? (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h5 className={`text-2xl font-bold text-white transition-colors ${isTodayTaskComplete ? 'text-slate-500 line-through' : ''}`}>{todaysTask.title}</h5>
               <button 
                onClick={() => onToggleCompletion(todayIndex)}
                className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-300 transform hover:-translate-y-0.5
                ${isTodayTaskComplete 
                    ? 'bg-green-900/50 border-green-700 text-green-300' 
                    : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:border-slate-500'}`}
              >
                {isTodayTaskComplete ? <CheckIcon className="h-5 w-5" /> : <div className="h-5 w-5 border-2 rounded-full border-slate-500"></div>}
                {isTodayTaskComplete ? 'Completed!' : 'Mark as Complete'}
              </button>
            </div>
            <ul className="space-y-3 pl-5 list-disc text-slate-300 marker:text-violet-500">
              {todaysTask.details.map((detail, i) => (
                <li key={i} className={`leading-relaxed text-lg transition-colors ${isTodayTaskComplete ? 'line-through text-slate-500' : ''}`}>{detail}</li>
              ))}
            </ul>
             {isTodayTaskComplete && (
                <p className="mt-6 text-center font-semibold text-green-400 animate-pulse">Great work! Rest up and prepare for the next challenge.</p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-24">
             <p className="text-slate-400 text-lg">No task scheduled for today. Rest and prepare for what's next.</p>
          </div>
        )}
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-sm p-6 md:p-8">
          <h4 className="text-3xl font-bold font-serif text-white mb-6">Full Training Schedule</h4>
          <div className="space-y-2">
              {plan.map((item, index) => {
                const isComplete = completedDays[index];
                return (
                  <div key={index} className="border-b border-slate-700 last:border-b-0">
                      <button
                          onClick={() => toggleAccordion(index)}
                          className="w-full flex justify-between items-center text-left p-4 hover:bg-slate-700/50 transition-colors duration-200 rounded-md"
                      >
                          <div className="flex items-center gap-4">
                              {isComplete ? <CheckIcon className="h-6 w-6 text-green-500"/> : <div className="h-6 w-6 border-2 border-slate-300 rounded-full"></div>}
                              <span className={`font-bold text-lg transition-colors ${isComplete ? 'text-slate-500 line-through' : 'text-white'}`}>{item.title}</span>
                              {index === todayIndex && !isComplete && (
                                  <span className="text-xs bg-green-500 text-white font-bold py-0.5 px-2 rounded-full animate-pulse">
                                      Today
                                  </span>
                              )}
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-slate-400 transition-transform duration-300 ${openAccordionIndex === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                      </button>
                      {openAccordionIndex === index && (
                          <div className="p-4 pt-0">
                              <ul className="space-y-3 pl-5 list-disc text-slate-400 marker:text-violet-500">
                                  {item.details.map((detail, i) => (
                                      <li key={i} className={`leading-relaxed transition-colors ${isComplete ? 'line-through text-slate-500' : ''}`}>{detail}</li>
                                  ))}
                              </ul>
                          </div>
                      )}
                  </div>
                )
              })}
          </div>
      </div>
    </section>
  );
};

export default CoursePlanDisplay;