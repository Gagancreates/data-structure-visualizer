'use client';

import { Problem } from '@/lib/types';
import { mockProblems } from '@/lib/mock/mockProblems';

interface HeaderProps {
  problem: Problem;
  onProblemChange?: (problem: Problem) => void;
}

export default function Header({ problem, onProblemChange }: HeaderProps) {
  return (
    <div className="h-14 bg-[#252526] border-b border-[#3e3e42] flex items-center px-6 gap-4">
      <h1 className="text-xl font-bold text-[#00c853]">DS Visualizer</h1>

      <select
        value={problem.id}
        onChange={(e) => {
          const selected = mockProblems.find(p => p.id === e.target.value);
          if (selected && onProblemChange) onProblemChange(selected);
        }}
        className="bg-[#3e3e42] text-white px-4 py-2 rounded-md border border-[#666] outline-none focus:border-[#00c853] cursor-pointer"
      >
        {mockProblems.map(p => (
          <option key={p.id} value={p.id}>
            {p.title}
          </option>
        ))}
      </select>

      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
        problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
        'bg-red-500/20 text-red-400'
      }`}>
        {problem.difficulty}
      </span>
    </div>
  );
}
