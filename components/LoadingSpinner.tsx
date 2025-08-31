
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
        <p className="text-brand-secondary">Generating your mockup...</p>
    </div>
  );
};

export default LoadingSpinner;
