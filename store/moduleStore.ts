import { create } from 'zustand';

type ModuleState = {
	moduleIndex: number | null;
	setModuleIndex: (index: number) => void;
};

export const useModeulStore = create<ModuleState>((set) => ({
	moduleIndex: null,
	setModuleIndex: (index) => set({ moduleIndex: index }),
}));