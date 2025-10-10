import React from 'react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
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
        <h1 className="text-4xl font-serif text-white mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-slate-300 leading-relaxed">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-bold text-slate-100 pt-4">1. Introduction</h2>
            <p>Zenith Martial Arts ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our web application.</p>

            <h2 className="text-xl font-bold text-slate-100 pt-4">2. Information We Collect</h2>
            <p>We use your browser's local storage to save your generated course plan, including the selected martial art, duration, start date, and your progress (completed days). This information is stored solely on your device and is not transmitted to our servers. We do not collect any personal identification information like your name, email address, or IP address.</p>

            <h2 className="text-xl font-bold text-slate-100 pt-4">3. How We Use Your Information</h2>
            <p>The information stored locally is used exclusively to provide the core functionality of our application, allowing you to resume your training plan where you left off. We do not use this data for any other purpose, such as advertising or analytics.</p>

            <h2 className="text-xl font-bold text-slate-100 pt-4">4. Information Sharing</h2>
            <p>Since we do not collect or store your data on our servers, we do not and cannot share your information with any third parties.</p>

            <h2 className="text-xl font-bold text-slate-100 pt-4">5. Data Security</h2>
            <p>All data is stored on your local device. The security of this data depends on the security of your own device and browser. We do not have access to this information.</p>

            <h2 className="text-xl font-bold text-slate-100 pt-4">6. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

            <h2 className="text-xl font-bold text-slate-100 pt-4">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at support@zenithmartialarts.dev.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
