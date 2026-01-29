import { create } from 'zustand';
import { ExecutionState, VisualizationEvent } from '@/lib/types';

interface ExecutionStore extends ExecutionState {
  // Actions
  setEvents: (events: VisualizationEvent[]) => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  play: () => void;
  pause: () => void;
  setSpeed: (speed: number) => void;
  addConsoleMessage: (type: 'log' | 'error' | 'success', message: string) => void;
}

export const useExecutionStore = create<ExecutionStore>((set, get) => ({
  status: 'idle',
  currentStep: 0,
  totalSteps: 0,
  events: [],
  consoleOutput: [],
  speed: 1000,

  setEvents: (events) => set({
    events,
    totalSteps: events.length,
    currentStep: 0,
    status: 'paused',
    consoleOutput: []
  }),

  stepForward: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1)
  })),

  stepBackward: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0)
  })),

  reset: () => set({
    currentStep: 0,
    status: 'idle',
    consoleOutput: []
  }),

  play: () => {
    set({ status: 'running' });
    const interval = setInterval(() => {
      const state = get();
      if (state.currentStep >= state.totalSteps - 1) {
        clearInterval(interval);
        set({ status: 'completed' });
      } else {
        get().stepForward();
      }
    }, get().speed);
  },

  pause: () => set({ status: 'paused' }),

  setSpeed: (speed) => set({ speed }),

  addConsoleMessage: (type, message) => set((state) => ({
    consoleOutput: [
      ...state.consoleOutput,
      { type, message, timestamp: Date.now() }
    ]
  }))
}));
