import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MartialArtSelector from './components/MartialArtSelector';
import CoursePlanDisplay from './components/CoursePlanDisplay';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import SelectionModal from './components/SelectionModal';
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
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [coursePlan, setCoursePlan] = useState<CoursePlanDay[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [planStartDate, setPlanStartDate] = useState<string | null>(null);
  const [completedDays, setCompletedDays] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGeneratePlan = useCallback(async (duration: string) => {
    if (!selectedArt) {
      setError('Please select a martial art.');
      return;
    }

    setIsModalOpen(false);
    setIsLoading(true);
    setError(null);
    setCoursePlan(null);
    setSelectedDuration(duration);

    try {
      const plan = await generateCoursePlan(selectedArt, duration);
      const startDate = new Date().toISOString();
      const newCompletedDays = Array(plan.length).fill(false);
      
      const dataToStore: StoredPlan = {
        plan,
        martialArt: selectedArt,
        duration: duration,
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
  }, [selectedArt]);

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
            
            if (isLoading) {
                return (
                    <div className="flex-1 flex flex-col justify-center items-center p-4">
                        <CoursePlanDisplay
                            isLoading={true}
                            error={error}
                            plan={null}
                            martialArt={selectedArt}
                            onBack={() => {}}
                            completedDays={[]}
                            onToggleCompletion={() => {}}
                        />
                    </div>
                );
            }

            return (
                <>
                    <div className="w-full max-w-7xl mx-auto flex flex-col h-full">
                        <div className="text-center px-4 pt-8 pb-6 shrink-0">
                            <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">
                              Mastery
                            </h1>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                              Select a discipline. Our AI will forge a personalized learning plan just for you.
                            </p>
                            <h2 className="text-2xl font-bold mt-8 text-white">Choose Your Discipline</h2>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4">
                            <MartialArtSelector
                                martialArts={MARTIAL_ARTS}
                                selectedArt={selectedArt}
                                onSelect={handleArtSelection}
                            />
                        </div>
                    </div>
                    <SelectionModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        martialArt={selectedArt}
                        durations={DURATIONS}
                        onGeneratePlan={handleGeneratePlan}
                        isLoading={isLoading}
                    />
                </>
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