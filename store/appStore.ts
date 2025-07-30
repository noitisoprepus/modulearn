import { create } from "zustand";

type AppState = {
  hasAppStarted: boolean;
  markAppStarted: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  hasAppStarted: false,
  markAppStarted: () => set({ hasAppStarted: true }),
}));