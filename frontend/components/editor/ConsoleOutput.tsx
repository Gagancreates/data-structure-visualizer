'use client';

import { useExecutionStore } from '@/lib/store/executionStore';

export default function ConsoleOutput() {
  const { consoleOutput } = useExecutionStore();

  return (
    <div className="h-full bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col">
      <div className="px-4 py-2 bg-[#252526] border-b border-[#3e3e42]">
        <h3 className="text-sm font-semibold text-gray-300">Console</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-3 font-mono text-sm">
        {consoleOutput.length === 0 ? (
          <p className="text-gray-500 italic">No output yet. Click Run to start.</p>
        ) : (
          <div className="space-y-1">
            {consoleOutput.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.type === 'error' ? 'text-red-400' :
                  msg.type === 'success' ? 'text-green-400' :
                  'text-gray-300'
                }`}
              >
                {msg.message}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
