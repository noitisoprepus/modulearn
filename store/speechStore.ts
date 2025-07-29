import { create } from 'zustand';

type SpeechState = {
  isSpeaking: boolean;
  isRecognizing: boolean;
  setIsSpeaking: (speaking: boolean) => void;
  setIsRecognizing: (recognizing: boolean) => void;
};

export const useSpeechStore = create<SpeechState>((set) => ({
  isSpeaking: false,
  isRecognizing: false,
  setIsSpeaking: (speaking) => set({ isSpeaking: speaking }),
  setIsRecognizing: (recognizing) => set({ isRecognizing: recognizing }),
}));