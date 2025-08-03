import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type SpeechState = {
  isSpeaking: boolean;
  speechRate: number;
  isRecognizing: boolean;
  shouldRecognize: boolean;
  voicePrompt: string;
  voiceCommands: string[];
  commandCallback: ((command: string) => void) | null;
  setIsSpeaking: (speaking: boolean) => void;
  setSpeechRate: (rate: number) => void;
  setIsRecognizing: (recognizing: boolean) => void;
  setShouldRecognize: (shouldRecognize: boolean) => void;
  setVoicePrompt: (prompt: string) => void;
  setVoiceCommands: (commands: string[]) => void;
  setCommandCallback: (callback: ((command: string) => void) | null) => void;
};

const SPEECHRATE_KEY = "speechRate";

export const useSpeechStore = create<SpeechState>((set) => {
  AsyncStorage.getItem(SPEECHRATE_KEY).then((storedValue) => {
    if (storedValue !== null) {
      set({ speechRate: Number(storedValue) });
    }
  });

  return {
    isSpeaking: false,
    speechRate: 1,
    isRecognizing: false,
    shouldRecognize: false,
    voicePrompt: "",
    voiceCommands: [],
    commandCallback: null,
    setIsSpeaking: (speaking) => set({ isSpeaking: speaking }),
    setSpeechRate: (rate) => {
      AsyncStorage.setItem(SPEECHRATE_KEY, rate.toString());
      set({ speechRate: rate });
    },
    setIsRecognizing: (recognizing) => set({ isRecognizing: recognizing }),
    setShouldRecognize: (shouldRecognize) => set({ shouldRecognize }),
    setVoicePrompt: (prompt) => set({ voicePrompt: prompt }),
    setVoiceCommands: (commands) => set({ voiceCommands: commands }),
    setCommandCallback: (callback) => set({ commandCallback: callback }),
  };
});