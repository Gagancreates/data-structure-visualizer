'use client';

import { useExecutionStore } from '@/lib/store/executionStore';
import ArrayVisualizer from './visualizers/ArrayVisualizer';
import LinkedListVisualizer from './visualizers/LinkedListVisualizer';
import TreeVisualizer from './visualizers/TreeVisualizer';
import EmptyState from './EmptyState';

export default function VisualizationPanel() {
  const { events, currentStep } = useExecutionStore();

  if (events.length === 0) {
    return <EmptyState />;
  }

  const currentEvent = events[currentStep];
  const { dsType, nodes, edges = [], highlights = [], message, dsName } = currentEvent.data;

  return (
    <div className="h-full flex flex-col bg-[#252526]">
      {/* Message Bar */}
      <div className="border-b border-[#3e3e42] p-4 bg-[#2d2d30]">
        <p className="text-sm text-gray-300">{message}</p>
      </div>

      {/* Visualizer */}
      <div className="flex-1 overflow-hidden">
        {(dsType === 'array' || dsType === 'stack' || dsType === 'queue') && (
          <ArrayVisualizer nodes={nodes} highlights={highlights} dsName={dsName} />
        )}

        {dsType === 'linkedlist' && (
          <LinkedListVisualizer nodes={nodes} edges={edges} dsName={dsName} highlights={highlights} />
        )}

        {dsType === 'tree' && (
          <TreeVisualizer nodes={nodes} edges={edges} dsName={dsName} highlights={highlights} />
        )}
      </div>

      {/* Legend */}
      <div className="border-t border-[#3e3e42] p-3 bg-[#2d2d30]">
        <div className="flex gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#ffa726] rounded"></div>
            <span>Highlighted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#00c853] rounded"></div>
            <span>Modified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
