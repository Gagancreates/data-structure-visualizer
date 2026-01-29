import { Problem } from '@/lib/types';

interface ProblemDescriptionProps {
  problem: Problem;
}

export default function ProblemDescription({ problem }: ProblemDescriptionProps) {
  return (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <p className="text-gray-300 whitespace-pre-line leading-relaxed">
          {problem.description}
        </p>
      </div>

      {/* Examples */}
      <div>
        <h3 className="text-white font-semibold mb-3">Examples:</h3>
        <div className="space-y-4">
          {problem.examples.map((example, idx) => (
            <div key={idx} className="bg-[#1e1e1e] p-4 rounded-lg border border-[#3e3e42]">
              <div className="space-y-2 font-mono text-sm">
                <div>
                  <span className="text-gray-400">Input: </span>
                  <span className="text-blue-400">{example.input}</span>
                </div>
                <div>
                  <span className="text-gray-400">Output: </span>
                  <span className="text-green-400">{example.output}</span>
                </div>
                {example.explanation && (
                  <div>
                    <span className="text-gray-400">Explanation: </span>
                    <span className="text-gray-300">{example.explanation}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Constraints */}
      <div>
        <h3 className="text-white font-semibold mb-3">Constraints:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
          {problem.constraints.map((constraint, idx) => (
            <li key={idx} className="font-mono">{constraint}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
