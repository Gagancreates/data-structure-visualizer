import { Play } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#252526] text-gray-400">
      <Play size={64} className="mb-4 opacity-30" />
      <h3 className="text-xl font-semibold mb-2">No Visualization Yet</h3>
      <p className="text-sm">Click the Run button to see the visualization</p>
    </div>
  );
}
