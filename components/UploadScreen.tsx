import React, { useRef, useState, useCallback } from 'react';
import { UploadedFile } from '../types';
import { toBase64 } from '../utils/fileUtils';
import { UploadIcon } from './Icons';

interface UploadScreenProps {
  onImageUpload: (file: UploadedFile) => void;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(async (file: File | null | undefined) => {
    if (file) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        setError('Invalid file type. Please upload a PNG or JPG file.');
        return;
      }
      setError(null);
      try {
        const uploadedFile = await toBase64(file);
        onImageUpload(uploadedFile);
      } catch (err) {
        setError('Could not process the file. Please try again.');
        console.error(err);
      }
    }
  }, [onImageUpload]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
  }, [handleFile]);
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  }, [handleFile]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="text-center flex flex-col items-center justify-center min-h-[60vh]">
      <div className="max-w-lg w-full">
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-primary mb-4">
          AI Mockup Generator
        </h1>
        <p className="text-lg text-brand-secondary mb-8">
          Turn your designs into professional, photorealistic mockups in seconds.
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg"
        />
        <div
          onClick={handleAreaClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${
            isDragging ? 'border-brand-accent bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="w-12 h-12 text-gray-400 mb-4">
            <UploadIcon />
          </div>
          <p className="text-brand-secondary mb-2">
            <span className="font-semibold text-brand-accent">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">Supports PNG and JPG files.</p>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default UploadScreen;