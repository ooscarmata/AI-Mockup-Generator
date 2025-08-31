
import React from 'react';
import { HomeIcon } from './Icons';

interface HeaderProps {
  onHomeClick: () => void;
  showHome: boolean;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick, showHome }) => {
  return (
    <header className="w-full h-16 flex items-center">
      {showHome && (
        <button
          onClick={onHomeClick}
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-primary transition-colors duration-300"
          aria-label="Go to home screen"
        >
          <div className="w-6 h-6">
            <HomeIcon />
          </div>
          <span className="font-semibold">Home</span>
        </button>
      )}
    </header>
  );
};

export default Header;
