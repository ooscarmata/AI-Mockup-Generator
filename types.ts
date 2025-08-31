
// FIX: Import React to make React.ReactNode a valid type.
import React from 'react';

export enum View {
  UPLOAD = 'UPLOAD',
  SELECTION = 'SELECTION',
  PREVIEW = 'PREVIEW',
}

export interface UploadedFile {
  base64: string;
  mimeType: string;
}

export interface GeneratedImage {
  base64: string;
  mimeType: string;
}

export interface MockupCategory {
    name: string;
    prompt: string;
    icon: React.ReactNode;
}
