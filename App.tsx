
import React, { useState, useCallback } from 'react';
import { UploadedFile, View, MockupCategory, GeneratedImage } from './types';
import UploadScreen from './components/UploadScreen';
import SelectionScreen from './components/SelectionScreen';
import PreviewScreen from './components/PreviewScreen';
import Header from './components/Header';
import { generateMockup } from './services/geminiService';
import { MOCKUP_CATEGORIES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.UPLOAD);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [selectedMockup, setSelectedMockup] = useState<MockupCategory | null>(null);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: UploadedFile) => {
    setUploadedFile(file);
    setCurrentView(View.SELECTION);
    setError(null);
    setGeneratedImage(null);
  };

  const resetApp = () => {
    setCurrentView(View.UPLOAD);
    setUploadedFile(null);
    setSelectedMockup(null);
    setGeneratedImage(null);
    setIsLoading(false);
    setError(null);
  };

  const handleMockupGeneration = useCallback(async (mockup: MockupCategory, isVariation: boolean = false) => {
    if (!uploadedFile) {
      setError('No design uploaded. Please go back home and upload a file.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentView(View.PREVIEW);
    setSelectedMockup(mockup);

    try {
      const result = await generateMockup(uploadedFile, mockup.prompt, isVariation);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError('Sorry, something went wrong while generating the mockup. Please try again.');
      // Keep the user on the preview screen to show the error
    } finally {
      setIsLoading(false);
    }
  }, [uploadedFile]);

  const renderContent = () => {
    switch (currentView) {
      case View.UPLOAD:
        return <UploadScreen onImageUpload={handleImageUpload} />;
      case View.SELECTION:
        return <SelectionScreen categories={MOCKUP_CATEGORIES} onSelectMockup={(mockup) => handleMockupGeneration(mockup, false)} />;
      case View.PREVIEW:
        if (!selectedMockup) {
            resetApp();
            return null;
        }
        return (
          <PreviewScreen
            generatedImage={generatedImage}
            isLoading={isLoading}
            error={error}
            onGenerateAnother={() => handleMockupGeneration(selectedMockup, true)}
            mockupTitle={selectedMockup.name}
          />
        );
      default:
        return <UploadScreen onImageUpload={handleImageUpload} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-light text-brand-primary flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <Header onHomeClick={resetApp} showHome={currentView !== View.UPLOAD} />
        <main className="mt-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
