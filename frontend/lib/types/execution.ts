import { VisualizationEvent } from './visualization';

export interface ExecutionState {
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error';
  currentStep: number;
  totalSteps: number;
  events: VisualizationEvent[];
  consoleOutput: ConsoleMessage[];
  error?: string;
  speed: number; // ms per step for auto-play
}

export interface ConsoleMessage {
  type: 'log' | 'error' | 'success';
  message: string;
  timestamp: number;
}
