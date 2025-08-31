
import React from 'react';
import { MockupCategory } from '../types';

interface MockupCardProps {
  category: MockupCategory;
  onClick: () => void;
}

const MockupCard: React.FC<MockupCardProps> = ({ category, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-brand-accent transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="text-brand-secondary group-hover:text-brand-accent transition-colors duration-300 w-10 h-10 mb-3">
        {category.icon}
      </div>
      <span className="text-sm font-medium text-brand-primary text-center">
        {category.name}
      </span>
    </button>
  );
};

export default MockupCard;
