
import React from 'react';
import { MockupCategory } from '../types';
import MockupCard from './MockupCard';

interface SelectionScreenProps {
  categories: MockupCategory[];
  onSelectMockup: (category: MockupCategory) => void;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ categories, onSelectMockup }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-brand-primary mb-2">Choose a Mockup</h2>
      <p className="text-brand-secondary mb-8">Select a category to generate your design mockup.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
        {categories.map((category) => (
          <MockupCard
            key={category.name}
            category={category}
            onClick={() => onSelectMockup(category)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectionScreen;
