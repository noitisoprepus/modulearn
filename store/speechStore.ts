import { create } from 'zustand';

type SpeechState = {
  isSpeaking: boolean;
  isRecognizing: boolean;
  shouldRecognize: boolean;
  voicePrompt: string;
  voiceCommands: string[];
  commandCallback: ((command: string) => void) | null;
  setIsSpeaking: (speaking: boolean) => void;
  setIsRecognizing: (recognizing: boolean) => void;
  setShouldRecognize: (shouldRecognize: boolean) => void;
  setVoicePrompt: (prompt: string) => void;
  setVoiceCommands: (commands: string[]) => void;
  setCommandCallback: (callback: ((command: string) => void) | null) => void;
};

export const useSpeechStore = create<SpeechState>((set) => ({
  isSpeaking: false,
  isRecognizing: false,
  shouldRecognize: false,
  voicePrompt: "",
  voiceCommands: [],
  commandCallback: null,
  setIsSpeaking: (speaking) => set({ isSpeaking: speaking }),
  setIsRecognizing: (recognizing) => set({ isRecognizing: recognizing }),
  setShouldRecognize: (shouldRecognize) => set({ shouldRecognize }),
  setVoicePrompt: (prompt) => set({ voicePrompt: prompt }),
  setVoiceCommands: (commands) => set({ voiceCommands: commands }),
  setCommandCallback: (callback) => set({ commandCallback: callback }),
}));