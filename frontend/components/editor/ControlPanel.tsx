'use client';

import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useExecutionStore } from '@/lib/store/executionStore';
import { generateMockExecution } from '@/lib/mock/mockExecutionEngine';

interface ControlPanelProps {
  problemId: string;
}

export default function ControlPanel({ problemId }: ControlPanelProps) {
  const {
    status,
    currentStep,
    totalSteps,
    setEvents,
    stepForward,
    stepBackward,
    reset,
    play,
    pause
  } = useExecutionStore();

  const handleRun = () => {
    const events = generateMockExecution(problemId);
    setEvents(events);
  };

  return (
    <div className="border-t border-[#3e3e42] bg-[#252526] p-3 flex items-center gap-3">
      <button
        onClick={handleRun}
        className="px-4 py-2 bg-[#00c853] hover:bg-[#00e676] text-white rounded-md flex items-center gap-2 transition-colors"
      >
        <Play size={16} />
        Run
      </button>

      <div className="flex gap-2">
        <button
          onClick={stepBackward}
          disabled={currentStep === 0}
          className="p-2 bg-[#424242] hover:bg-[#4e4e4e] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors text-white"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={stepForward}
          disabled={currentStep >= totalSteps - 1}
          className="p-2 bg-[#424242] hover:bg-[#4e4e4e] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors text-white"
        >
          <ChevronRight size={16} />
        </button>

        <button
          onClick={status === 'running' ? pause : play}
          disabled={totalSteps === 0}
          className="p-2 bg-[#424242] hover:bg-[#4e4e4e] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors text-white"
        >
          {status === 'running' ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button
          onClick={reset}
          disabled={totalSteps === 0}
          className="p-2 bg-[#424242] hover:bg-[#4e4e4e] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors text-white"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {totalSteps > 0 && (
        <div className="ml-auto text-sm text-gray-400">
          Step {currentStep + 1} / {totalSteps}
        </div>
      )}
    </div>
  );
}
