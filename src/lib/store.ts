import { create } from 'zustand';

interface AppState {
  inputText: string;
  setInputText: (text: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  inputText: '',
  setInputText: (text) => set({ inputText: text }),
  isProcessing: false,
  setIsProcessing: (processing) => set({ isProcessing: processing }),
}));
