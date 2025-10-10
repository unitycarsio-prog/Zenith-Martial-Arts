import React from 'react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="bg-slate-800 text-slate-300 font-semibold py-2 px-5 rounded-lg text-sm hover:bg-slate-700 transition-colors duration-300 border border-slate-600 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          Back
        </button>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-sm p-6 md:p-8">
        <h1 className="text-4xl font-serif text-white mb-6">About Zenith Martial Arts</h1>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            Welcome to Zenith Martial Arts, your personal AI-powered guide on the path to martial arts mastery. Our mission is to make learning martial arts accessible, structured, and personalized for everyone, regardless of their starting point.
          </p>
          <p>
            We believe that the journey of a martial artist is one of discipline, dedication, and continuous learning. However, finding a clear, structured path can be challenging for beginners. That's where our powerful AI comes in. By leveraging state-of-the-art generative technology, we forge comprehensive, day-by-day training plans tailored to your chosen discipline and commitment level.
          </p>
          <p>
            Whether you have 3 days to learn the basics or 6 months to dedicate to the craft, our application provides a detailed roadmap. Each plan covers the essential foundations, from stances and etiquette to strikes, blocks, and fundamental techniques, ensuring you build a solid base for your practice.
          </p>
          <p>
            Embark on your journey with us. Choose your art, set your timeline, and let us help you unlock your potential.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
