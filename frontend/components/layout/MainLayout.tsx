'use client';

import { Panel, Group, Separator } from 'react-resizable-panels';
import ProblemPanel from '@/components/problem/ProblemPanel';
import CodeEditor from '@/components/editor/CodeEditor';
import VisualizationPanel from '@/components/visualization/VisualizationPanel';
import ControlPanel from '@/components/editor/ControlPanel';
import ConsoleOutput from '@/components/editor/ConsoleOutput';
import Header from './Header';
import { Problem } from '@/lib/types';

interface MainLayoutProps {
  problem: Problem;
  code: string;
  onCodeChange: (code: string) => void;
  onProblemChange?: (problem: Problem) => void;
}

export default function MainLayout({ problem, code, onCodeChange, onProblemChange }: MainLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e]">
      <Header problem={problem} onProblemChange={onProblemChange} />

      <div className="flex-1 px-2">
        <Group orientation="horizontal" className="h-full">
        {/* Problem Panel */}
        <Panel defaultSize={30} minSize={20}>
          <ProblemPanel problem={problem} />
        </Panel>

        <Separator className="w-1 bg-[#3e3e42] hover:bg-[#00c853] transition-colors" />

        {/* Editor Panel */}
        <Panel defaultSize={40} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <CodeEditor
                code={code}
                onChange={onCodeChange}
                language="python"
              />
            </div>
            <ControlPanel problemId={problem.id} />
            <div className="h-32">
              <ConsoleOutput />
            </div>
          </div>
        </Panel>

        <Separator className="w-1 bg-[#3e3e42] hover:bg-[#00c853] transition-colors" />

        {/* Visualization Panel */}
        <Panel defaultSize={30} minSize={25}>
          <VisualizationPanel />
        </Panel>
      </Group>
      </div>
    </div>
  );
}
