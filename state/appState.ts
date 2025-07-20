import { create } from 'zustand';

type AppState = {
	isSpeaking: boolean;
	moduleIndex: number | null;
	setIsSpeaking: (speaking: boolean) => void;
	setModuleIndex: (index: number) => void;
	resetNavigation: () => void;
};

export const useAppState = create<AppState>((set) => ({
	isSpeaking: false,
	moduleIndex: null,
	setIsSpeaking: (speaking) => set({ isSpeaking: speaking }),
	setModuleIndex: (index) => set({ moduleIndex: index }),
	resetNavigation: () => set({ isSpeaking: false, moduleIndex: null })
}));