import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";

type AppState = {
  hasAppStarted: boolean;
  accessibilityEnabled: boolean;
  markAppStarted: () => void;
  setAccessibilityEnabled: (enabled: boolean) => void;
}

const ACCESSIBILITY_KEY = "accessibilityEnabled";

export const useAppStore = create<AppState>((set) => {
  AsyncStorage.getItem(ACCESSIBILITY_KEY).then((storedValue) => {
    if (storedValue !== null) {
      set({ accessibilityEnabled: storedValue === "true" });
    }
  });

  return {
    hasAppStarted: false,
    accessibilityEnabled: true,
    markAppStarted: () => set({ hasAppStarted: true }),
    setAccessibilityEnabled: (enabled) => {
      AsyncStorage.setItem(ACCESSIBILITY_KEY, enabled.toString());
      set({ accessibilityEnabled: enabled });
    },
  };
});