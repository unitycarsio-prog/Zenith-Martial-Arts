import React from 'react';

type Page = 'main' | 'about' | 'contact' | 'privacy';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full py-6 mt-8 border-t border-slate-800">
      <div className="container mx-auto px-4 text-center text-slate-400">
        <div className="flex justify-center items-center space-x-6 mb-4">
          <button onClick={() => onNavigate('about')} className="text-sm hover:text-violet-400 transition-colors duration-300">About Us</button>
          <button onClick={() => onNavigate('contact')} className="text-sm hover:text-violet-400 transition-colors duration-300">Contact Us</button>
          <button onClick={() => onNavigate('privacy')} className="text-sm hover:text-violet-400 transition-colors duration-300">Privacy Policy</button>
        </div>
        <p>&copy; {new Date().getFullYear()} Zenith Martial Arts. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;