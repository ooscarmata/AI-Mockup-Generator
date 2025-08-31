
import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { DownloadIcon, RefreshIcon } from './Icons';
import { GeneratedImage } from '../types';

interface PreviewScreenProps {
  generatedImage: GeneratedImage | null;
  isLoading: boolean;
  error: string | null;
  onGenerateAnother: () => void;
  mockupTitle: string;
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({
  generatedImage,
  isLoading,
  error,
  onGenerateAnother,
  mockupTitle
}) => {
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = `data:${generatedImage.mimeType};base64,${generatedImage.base64}`;
    const extension = generatedImage.mimeType.split('/')[1] || 'png';
    link.download = `${mockupTitle.toLowerCase().replace(/ /g, '_')}_mockup.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-brand-primary mb-2">{mockupTitle} Mockup</h2>
      <p className="text-brand-secondary mb-8">Here's your generated mockup. Download it or try another version.</p>
      
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-8 aspect-square flex items-center justify-center">
        {isLoading && <LoadingSpinner />}
        {error && !isLoading && (
            <div className="text-center text-red-500">
                <p className="font-semibold">Generation Failed</p>
                <p>{error}</p>
            </div>
        )}
        {!isLoading && generatedImage && (
          <img
            src={`data:${generatedImage.mimeType};base64,${generatedImage.base64}`}
            alt="Generated mockup"
            className="max-w-full max-h-full object-contain rounded-md"
          />
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleDownload}
          disabled={!generatedImage || isLoading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-accent text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <DownloadIcon />
          Download
        </button>
        <button
          onClick={onGenerateAnother}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-brand-primary font-semibold rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 transition-all duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          <RefreshIcon />
          {isLoading ? 'Generating...' : 'Generate Another Version'}
        </button>
      </div>
    </div>
  );
};

export default PreviewScreen;
