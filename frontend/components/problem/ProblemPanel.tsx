'use client';

import { Problem } from '@/lib/types';
import ProblemDescription from './ProblemDescription';
import DifficultyBadge from './DifficultyBadge';

interface ProblemPanelProps {
  problem: Problem;
}

export default function ProblemPanel({ problem }: ProblemPanelProps) {
  return (
    <div className="h-full bg-[#252526] overflow-y-auto">
      <div className="py-6 px-8 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">{problem.title}</h2>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>

        {/* Description */}
        <ProblemDescription problem={problem} />
      </div>
    </div>
  );
}
