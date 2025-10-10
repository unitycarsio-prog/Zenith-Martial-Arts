import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MartialArtSelector from './components/MartialArtSelector';
import DurationSelector from './components/DurationSelector';
import CoursePlanDisplay from './components/CoursePlanDisplay';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import { generateCoursePlan } from './services/geminiService';
import { MARTIAL_ARTS, DURATIONS } from './constants';
import type { CoursePlanDay } from './types';

interface StoredPlan {
  plan: CoursePlanDay[];
  martialArt: string;
  duration: string;
  startDate: string;
  completedDays: boolean[];
}

type Page = 'main' | 'about' | 'contact' | 'privacy';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [selectedArt, setSelectedArt] = useState<string | null>(null);
  const [isArtConfirmed, setIsArtConfirmed] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [coursePlan, setCoursePlan] = useState<CoursePlanDay[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [planStartDate, setPlanStartDate] = useState<string | null>(null);
  const [completedDays, setCompletedDays] = useState<boolean[]>([]);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('martialArtsPlan');
      if (storedData) {
        const parsedData: StoredPlan = JSON.parse(storedData);
        if (parsedData.plan && parsedData.martialArt && parsedData.startDate && parsedData.duration) {
            setCoursePlan(parsedData.plan);
            setSelectedArt(parsedData.martialArt);
            setSelectedDuration(parsedData.duration);
            setPlanStartDate(parsedData.startDate);
            const validCompletedDays = Array.isArray(parsedData.completedDays) && parsedData.completedDays.length === parsedData.plan.length 
                ? parsedData.completedDays 
                : Array(parsedData.plan.length).fill(false);
            setCompletedDays(validCompletedDays);
        } else {
            console.warn("Stored plan data is malformed. Clearing it.");
            localStorage.removeItem('martialArtsPlan');
        }
      }
    } catch (e) {
      console.error("Failed to parse stored plan:", e);
      localStorage.removeItem('martialArtsPlan');
    }
  }, []);
  
  const handleArtSelection = (art: string) => {
    setSelectedArt(art);
  };

  const handleConfirmArt = () => {
    if (selectedArt) {
      setIsArtConfirmed(true);
    }
  };
  
  const handleChangeArt = () => {
    setIsArtConfirmed(false);
    setSelectedDuration(null);
    setSelectedArt(null);
  };

  const handleGeneratePlan = useCallback(async () => {
    if (!selectedArt || !selectedDuration) {
      setError('Please select a martial art and a duration.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCoursePlan(null);

    try {
      const plan = await generateCoursePlan(selectedArt, selectedDuration);
      const startDate = new Date().toISOString();
      const newCompletedDays = Array(plan.length).fill(false);
      
      const dataToStore: StoredPlan = {
        plan,
        martialArt: selectedArt,
        duration: selectedDuration,
        startDate,
        completedDays: newCompletedDays,
      };
      localStorage.setItem('martialArtsPlan', JSON.stringify(dataToStore));
      
      setCoursePlan(plan);
      setPlanStartDate(startDate);
      setCompletedDays(newCompletedDays);

    } catch (err)      {
      setError(err instanceof Error ? `Failed to generate plan: ${err.message}` : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedArt, selectedDuration]);

  const handleToggleDayCompletion = (dayIndex: number) => {
    const newCompletedDays = [...completedDays];
    newCompletedDays[dayIndex] = !newCompletedDays[dayIndex];
    setCompletedDays(newCompletedDays);

    const storedData = localStorage.getItem('martialArtsPlan');
    if (storedData) {
        try {
            const planData: StoredPlan = JSON.parse(storedData);
            planData.completedDays = newCompletedDays;
            localStorage.setItem('martialArtsPlan', JSON.stringify(planData));
        } catch (e) {
            console.error("Failed to update stored plan progress:", e);
        }
    }
  };
  
  const handleStartNewPlan = () => {
    localStorage.removeItem('martialArtsPlan');
    setCoursePlan(null);
    setSelectedArt(null);
    setSelectedDuration(null);
    setPlanStartDate(null);
    setError(null);
    setIsArtConfirmed(false);
    setCompletedDays([]);
  };

  const renderContent = () => {
    switch (currentPage) {
        case 'about':
            return <AboutPage onBack={() => setCurrentPage('main')} />;
        case 'contact':
            return <ContactPage onBack={() => setCurrentPage('main')} />;
        case 'privacy':
            return <PrivacyPolicyPage onBack={() => setCurrentPage('main')} />;
        case 'main':
        default:
            if (coursePlan && selectedArt && planStartDate) {
              return (
                <CoursePlanDisplay
                  isLoading={false}
                  error={null}
                  plan={coursePlan}
                  martialArt={selectedArt}
                  startDate={planStartDate}
                  onBack={handleStartNewPlan}
                  completedDays={completedDays}
                  onToggleCompletion={handleToggleDayCompletion}
                />
              );
            }

            if (!isArtConfirmed) {
              return (
                <div className="w-full max-w-7xl mx-auto flex flex-col h-full">
                    <div className="text-center px-4 pt-8 pb-6 shrink-0">
                        <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">
                          Mastery
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                          Select a discipline and a training timeline. Our AI will forge a personalized learning plan just for you.
                        </p>
                        <h2 className="text-2xl font-bold mt-8 text-white">1. Choose Your Discipline</h2>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4">
                        <MartialArtSelector
                        martialArts={MARTIAL_ARTS}
                        selectedArt={selectedArt}
                        onSelect={handleArtSelection}
                        />
                    </div>

                    <div className="px-4 py-6 shrink-0 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700">
                        <div className={`transition-all duration-300 ease-in-out container mx-auto ${selectedArt ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}>
                            <button
                                onClick={handleConfirmArt}
                                disabled={!selectedArt}
                                className="w-full max-w-sm mx-auto flex items-center justify-center bg-violet-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-violet-500/50 shadow-lg shadow-violet-500/20 hover:bg-violet-700 transform hover:-translate-y-0.5 disabled:transform-none"
                            >
                                Confirm Selection
                            </button>
                        </div>
                    </div>
                </div>
              );
            }

            return (
                <div className="flex-1 flex flex-col justify-center items-center p-4">
                    <section id="duration" className="w-full max-w-3xl text-center">
                      <div className="mb-8">
                          <h2 className="text-3xl font-bold text-center text-white">2. Select Your Commitment</h2>
                          <div className="flex items-center justify-center gap-3 mt-3">
                            <p className="text-md text-slate-400">Discipline: <span className="font-bold text-violet-400">{selectedArt}</span></p>
                            <button onClick={handleChangeArt} className="text-sm font-semibold text-violet-400 hover:text-violet-300 underline transition-colors">
                              (Change)
                            </button>
                        </div>
                      </div>
                      <DurationSelector
                        durations={DURATIONS}
                        selectedDuration={selectedDuration}
                        onSelect={setSelectedDuration}
                      />
                    </section>

                    {selectedDuration && (
                        <div className="text-center mt-10 transition-opacity duration-700">
                        <button
                          onClick={handleGeneratePlan}
                          disabled={isLoading}
                          className="bg-violet-600 text-white font-bold py-3 px-10 rounded-lg text-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-violet-500/50 shadow-lg shadow-violet-500/20 hover:bg-violet-700 transform hover:-translate-y-1 disabled:transform-none"
                        >
                          {isLoading ? 'Forging Your Path...' : 'Generate Learning Plan'}
                        </button>
                      </div>
                    )}
                    {(isLoading || error) && !coursePlan && (
                      <div className="mt-8 w-full max-w-3xl">
                          <CoursePlanDisplay
                          isLoading={isLoading}
                          error={error}
                          plan={null}
                          martialArt={selectedArt}
                          onBack={() => {}}
                          completedDays={[]}
                          onToggleCompletion={() => {}}
                          />
                      </div>
                    )}
                </div>
            );
    }
  };


  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col container mx-auto px-4 w-full pt-20">
        {renderContent()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;