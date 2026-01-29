'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { mockProblems } from '@/lib/mock/mockProblems';
import { useExecutionStore } from '@/lib/store/executionStore';
import { Problem } from '@/lib/types';

export default function Home() {
  const [currentProblem, setCurrentProblem] = useState(mockProblems[0]);
  const [code, setCode] = useState(currentProblem.starterCode);
  const { reset } = useExecutionStore();

  const handleProblemChange = (problem: Problem) => {
    setCurrentProblem(problem);
    setCode(problem.starterCode);
    reset(); // Clear any existing visualization
  };

  return (
    <ErrorBoundary>
      <MainLayout
        problem={currentProblem}
        code={code}
        onCodeChange={setCode}
        onProblemChange={handleProblemChange}
      />
    </ErrorBoundary>
  );
}
