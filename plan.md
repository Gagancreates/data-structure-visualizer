 Project Name: ds_visualizer
  Tech Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, React Flow, Monaco Editor

  ---
  Phase 1: Foundation & Core Layout (Week 1)

  Goals

  - Working Next.js project with proper structure
  - Complete UI layout (HackerRank-style)
  - Monaco Editor integrated
  - One working visualizer (Array)
  - Basic mock execution flow

  Deliverables

  1.1 Project Setup

  npx create-next-app@latest ds_visualizer --typescript --tailwind --app
  cd ds_visualizer

  # Install dependencies
  npm install @monaco-editor/react
  npm install reactflow dagre @types/dagre
  npm install react-resizable-panels
  npm install zustand  # State management
  npm install lucide-react  # Icons

  1.2 Project Structure

  ds_visualizer/
  ├── src/
  │   ├── app/
  │   │   ├── layout.tsx
  │   │   ├── page.tsx                    # Main IDE page
  │   │   └── globals.css
  │   ├── components/
  │   │   ├── layout/
  │   │   │   ├── MainLayout.tsx          # 3-panel layout
  │   │   │   └── Header.tsx
  │   │   ├── editor/
  │   │   │   ├── CodeEditor.tsx          # Monaco wrapper
  │   │   │   ├── ControlPanel.tsx        # Run/Step/Reset buttons
  │   │   │   └── ConsoleOutput.tsx
  │   │   ├── problem/
  │   │   │   ├── ProblemPanel.tsx
  │   │   │   ├── ProblemDescription.tsx
  │   │   │   └── DifficultyBadge.tsx
  │   │   └── visualization/
  │   │       ├── VisualizationPanel.tsx  # Main container
  │   │       ├── EmptyState.tsx
  │   │       └── visualizers/
  │   │           └── ArrayVisualizer.tsx # Phase 1: Arrays only
  │   ├── lib/
  │   │   ├── types/
  │   │   │   ├── problem.ts
  │   │   │   ├── execution.ts
  │   │   │   └── visualization.ts
  │   │   ├── store/
  │   │   │   └── executionStore.ts       # Zustand store
  │   │   └── mock/
  │   │       ├── mockProblems.ts
  │   │       └── mockExecutionEngine.ts
  │   └── styles/
  │       └── theme.ts                     # Color constants
  ├── public/
  ├── package.json
  └── tailwind.config.ts

  1.3 Core Type Definitions

  src/lib/types/problem.ts:
  export interface Problem {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    examples: Example[];
    constraints: string[];
    starterCode: string;
    testCases: TestCase[];
    dataStructures: DataStructureType[]; // What DS this problem uses
  }

  export interface Example {
    input: string;
    output: string;
    explanation?: string;
  }

  export interface TestCase {
    input: string;
    expectedOutput: string;
  }

  export type DataStructureType = 'array' | 'linkedlist' | 'tree' | 'stack' | 'queue' | 'graph' | 'hashmap';

  src/lib/types/visualization.ts:
  export interface VisualizationEvent {
    step: number;
    timestamp: number;
    type: 'create' | 'update' | 'delete' | 'link' | 'highlight' | 'swap';
    data: VisualizationData;
  }

  export interface VisualizationData {
    dsType: DataStructureType;
    dsName: string; // Variable name like "nums", "head", "root"
    nodes: VizNode[];
    edges?: VizEdge[];
    highlights?: string[];
    message: string;
  }

  export interface VizNode {
    id: string;
    value: any;
    index?: number; // For arrays
    position?: { x: number; y: number };
    metadata?: {
      isHead?: boolean;
      isTail?: boolean;
      isRoot?: boolean;
      color?: string;
    };
  }

  export interface VizEdge {
    id: string;
    source: string;
    target: string;
    label?: string; // 'next', 'prev', 'left', 'right'
  }

  src/lib/types/execution.ts:
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

  1.4 Zustand Store

  src/lib/store/executionStore.ts:
  import { create } from 'zustand';
  import { ExecutionState, VisualizationEvent } from '@/lib/types';

  interface ExecutionStore extends ExecutionState {
    // Actions
    setEvents: (events: VisualizationEvent[]) => void;
    stepForward: () => void;
    stepBackward: () => void;
    reset: () => void;
    play: () => void;
    pause: () => void;
    setSpeed: (speed: number) => void;
    addConsoleMessage: (type: 'log' | 'error' | 'success', message: string) => void;
  }

  export const useExecutionStore = create<ExecutionStore>((set, get) => ({
    status: 'idle',
    currentStep: 0,
    totalSteps: 0,
    events: [],
    consoleOutput: [],
    speed: 1000,

    setEvents: (events) => set({
      events,
      totalSteps: events.length,
      currentStep: 0,
      status: 'paused',
      consoleOutput: []
    }),

    stepForward: () => set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1)
    })),

    stepBackward: () => set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0)
    })),

    reset: () => set({
      currentStep: 0,
      status: 'idle',
      consoleOutput: []
    }),

    play: () => {
      set({ status: 'running' });
      const interval = setInterval(() => {
        const state = get();
        if (state.currentStep >= state.totalSteps - 1) {
          clearInterval(interval);
          set({ status: 'completed' });
        } else {
          get().stepForward();
        }
      }, get().speed);
    },

    pause: () => set({ status: 'paused' }),

    setSpeed: (speed) => set({ speed }),

    addConsoleMessage: (type, message) => set((state) => ({
      consoleOutput: [
        ...state.consoleOutput,
        { type, message, timestamp: Date.now() }
      ]
    }))
  }));

  1.5 Mock Data

  src/lib/mock/mockProblems.ts:
  import { Problem } from '@/lib/types';

  export const mockProblems: Problem[] = [
    {
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'Easy',
      description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

  You may assume that each input would have exactly one solution, and you may not use the same element twice.

  You can return the answer in any order.`,
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]'
        }
      ],
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.'
      ],
      starterCode: `def twoSum(nums, target):
      """
      :type nums: List[int]
      :type target: int
      :rtype: List[int]
      """
      # Write your code here
      pass

  # Test
  result = twoSum([2, 7, 11, 15], 9)
  print(result)`,
      testCases: [
        { input: '[2,7,11,15], 9', expectedOutput: '[0,1]' },
        { input: '[3,2,4], 6', expectedOutput: '[1,2]' }
      ],
      dataStructures: ['array', 'hashmap']
    }
  ];

  src/lib/mock/mockExecutionEngine.ts:
  import { VisualizationEvent } from '@/lib/types';

  export const generateMockExecution = (problemId: string): VisualizationEvent[] => {
    if (problemId === 'two-sum') {
      return [
        {
          step: 0,
          timestamp: 0,
          type: 'create',
          data: {
            dsType: 'array',
            dsName: 'nums',
            nodes: [
              { id: 'nums-0', value: 2, index: 0 },
              { id: 'nums-1', value: 7, index: 1 },
              { id: 'nums-2', value: 11, index: 2 },
              { id: 'nums-3', value: 15, index: 3 }
            ],
            message: 'Initialize array: nums = [2, 7, 11, 15], target = 9'
          }
        },
        {
          step: 1,
          timestamp: 500,
          type: 'highlight',
          data: {
            dsType: 'array',
            dsName: 'nums',
            nodes: [
              { id: 'nums-0', value: 2, index: 0 },
              { id: 'nums-1', value: 7, index: 1 },
              { id: 'nums-2', value: 11, index: 2 },
              { id: 'nums-3', value: 15, index: 3 }
            ],
            highlights: ['nums-0'],
            message: 'Checking index 0: nums[0] = 2'
          }
        },
        {
          step: 2,
          timestamp: 1000,
          type: 'highlight',
          data: {
            dsType: 'array',
            dsName: 'nums',
            nodes: [
              { id: 'nums-0', value: 2, index: 0 },
              { id: 'nums-1', value: 7, index: 1 },
              { id: 'nums-2', value: 11, index: 2 },
              { id: 'nums-3', value: 15, index: 3 }
            ],
            highlights: ['nums-0', 'nums-1'],
            message: 'Checking index 1: nums[1] = 7. Sum: 2 + 7 = 9 ✓'
          }
        },
        {
          step: 3,
          timestamp: 1500,
          type: 'highlight',
          data: {
            dsType: 'array',
            dsName: 'nums',
            nodes: [
              { id: 'nums-0', value: 2, index: 0, metadata: { color: 'green' } },
              { id: 'nums-1', value: 7, index: 1, metadata: { color: 'green' } },
              { id: 'nums-2', value: 11, index: 2 },
              { id: 'nums-3', value: 15, index: 3 }
            ],
            highlights: ['nums-0', 'nums-1'],
            message: 'Found solution: [0, 1]'
          }
        }
      ];
    }

    return [];
  };

  1.6 Key Components

  src/app/page.tsx:
  'use client';

  import { useState } from 'react';
  import MainLayout from '@/components/layout/MainLayout';
  import { mockProblems } from '@/lib/mock/mockProblems';

  export default function Home() {
    const [currentProblem] = useState(mockProblems[0]);
    const [code, setCode] = useState(currentProblem.starterCode);

    return (
      <MainLayout
        problem={currentProblem}
        code={code}
        onCodeChange={setCode}
      />
    );
  }

  src/components/layout/MainLayout.tsx:
  'use client';

  import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from 'react-resizable-panels';
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
  }

  export default function MainLayout({ problem, code, onCodeChange }: MainLayoutProps) {
    return (
      <div className="h-screen flex flex-col bg-[#1e1e1e]">
        <Header problem={problem} />

        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Problem Panel */}
          <ResizablePanel defaultSize={30} minSize={20}>
            <ProblemPanel problem={problem} />
          </ResizablePanel>

          <ResizableHandle className="w-1 bg-[#3e3e42] hover:bg-[#00c853] transition-colors" />

          {/* Editor Panel */}
          <ResizablePanel defaultSize={40} minSize={30}>
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
          </ResizablePanel>

          <ResizableHandle className="w-1 bg-[#3e3e42] hover:bg-[#00c853] transition-colors" />

          {/* Visualization Panel */}
          <ResizablePanel defaultSize={30} minSize={25}>
            <VisualizationPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }

  src/components/editor/CodeEditor.tsx:
  'use client';

  import Editor from '@monaco-editor/react';

  interface CodeEditorProps {
    code: string;
    onChange: (value: string) => void;
    language: string;
  }

  export default function CodeEditor({ code, onChange, language }: CodeEditorProps) {
    return (
      <Editor
        height="100%"
        defaultLanguage={language}
        value={code}
        onChange={(value) => onChange(value || '')}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: 'JetBrains Mono, Fira Code, monospace',
          minimap: { enabled: true },
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
        }}
      />
    );
  }

  src/components/editor/ControlPanel.tsx:
  'use client';

  import { Play, Pause, SkipForward, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
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
            className="p-2 bg-[#424242] hover:bg-[#4e4e4e] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={stepForward}
            disabled={currentStep >= totalSteps - 1}
            className="p-2 bg-[#424242] hover:bg-[#4e4e4e] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
          >
            <ChevronRight size={16} />
          </button>

          <button
            onClick={status === 'running' ? pause : play}
            disabled={totalSteps === 0}
            className="p-2 bg-[#424242] hover:bg-[#4e4e4e] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
          >
            {status === 'running' ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            onClick={reset}
            disabled={totalSteps === 0}
            className="p-2 bg-[#424242] hover:bg-[#4e4e4e] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
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

  src/components/visualization/visualizers/ArrayVisualizer.tsx:
  'use client';

  import { VizNode } from '@/lib/types';

  interface ArrayVisualizerProps {
    nodes: VizNode[];
    highlights?: string[];
    dsName: string;
  }

  export default function ArrayVisualizer({ nodes, highlights = [], dsName }: ArrayVisualizerProps) {
    const boxWidth = 70;
    const boxHeight = 70;
    const gap = 8;
    const totalWidth = nodes.length * (boxWidth + gap);

    const getNodeColor = (node: VizNode, isHighlighted: boolean) => {
      if (node.metadata?.color === 'green') return '#00c853';
      if (isHighlighted) return '#ffa726';
      return '#424242';
    };

    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="text-sm text-gray-400 mb-4 font-mono">{dsName}</div>

        <svg width={totalWidth} height={150} className="overflow-visible">
          {nodes.map((node, idx) => {
            const isHighlighted = highlights.includes(node.id);
            const x = idx * (boxWidth + gap);

            return (
              <g key={node.id}>
                {/* Box */}
                <rect
                  x={x}
                  y={30}
                  width={boxWidth}
                  height={boxHeight}
                  fill={getNodeColor(node, isHighlighted)}
                  stroke={isHighlighted ? '#fff' : '#666'}
                  strokeWidth={isHighlighted ? 3 : 2}
                  rx={6}
                  className="transition-all duration-300"
                />

                {/* Value */}
                <text
                  x={x + boxWidth / 2}
                  y={30 + boxHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fff"
                  fontSize="20"
                  fontWeight="600"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {node.value}
                </text>

                {/* Index */}
                <text
                  x={x + boxWidth / 2}
                  y={30 + boxHeight + 20}
                  textAnchor="middle"
                  fill="#888"
                  fontSize="14"
                  fontFamily="JetBrains Mono, monospace"
                >
                  [{node.index}]
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  1.7 Phase 1 Acceptance Criteria

  - ✅ Clean Next.js app runs on localhost:3000
  - ✅ 3-panel resizable layout works
  - ✅ Monaco Editor loads with syntax highlighting
  - ✅ Problem panel displays problem description
  - ✅ "Run" button triggers mock execution
  - ✅ Array visualizer shows boxes with values
  - ✅ Step forward/backward works
  - ✅ Highlighting updates correctly
  - ✅ Console shows execution messages
  - ✅ Dark theme throughout

  ---
  Phase 2: Advanced Visualizations (Week 2)

  Goals

  - Add Linked List visualizer (React Flow)
  - Add Tree visualizer (React Flow + dagre)
  - Add Stack/Queue visualizers
  - Multiple problems support
  - Better execution messages

  Deliverables

  2.1 New Mock Problems

  Add to mockProblems.ts:
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    description: '...',
    starterCode: `class ListNode:
      def __init__(self, val=0, next=None):
          self.val = val
          self.next = next

  def reverseList(head):
      # Write your code here
      pass`,
    dataStructures: ['linkedlist']
  },
  {
    id: 'binary-tree-inorder',
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    description: '...',
    starterCode: `class TreeNode:
      def __init__(self, val=0, left=None, right=None):
          self.val = val
          self.left = left
          self.right = right

  def inorderTraversal(root):
      # Write your code here
      pass`,
    dataStructures: ['tree']
  }

  2.2 Linked List Visualizer

  src/components/visualization/visualizers/LinkedListVisualizer.tsx:
  'use client';

  import ReactFlow, { Node, Edge, MarkerType } from 'reactflow';
  import 'reactflow/dist/style.css';
  import { VizNode, VizEdge } from '@/lib/types';

  interface LinkedListVisualizerProps {
    nodes: VizNode[];
    edges: VizEdge[];
    dsName: string;
  }

  export default function LinkedListVisualizer({ nodes, edges, dsName }: LinkedListVisualizerProps) {
    const flowNodes: Node[] = nodes.map((node, idx) => ({
      id: node.id,
      type: 'default',
      position: { x: idx * 200, y: 150 },
      data: {
        label: (
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold">{node.value}</div>
            {node.metadata?.isHead && (
              <div className="text-xs text-green-400 mt-1">HEAD</div>
            )}
            {node.metadata?.isTail && (
              <div className="text-xs text-blue-400 mt-1">TAIL</div>
            )}
          </div>
        )
      },
      style: {
        background: '#424242',
        color: '#fff',
        border: '2px solid #666',
        borderRadius: 12,
        padding: '16px 24px',
        fontSize: 16,
      }
    }));

    const flowEdges: Edge[] = edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      animated: true,
      style: { stroke: '#00c853', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#00c853' },
      labelStyle: { fill: '#888', fontSize: 12 }
    }));

    return (
      <div className="w-full h-full bg-[#1e1e1e]">
        <div className="text-center text-sm text-gray-400 py-2 font-mono">{dsName}</div>
        <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
          <ReactFlow
            nodes={flowNodes}
            edges={flowEdges}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll={false}
            panOnDrag={false}
          />
        </div>
      </div>
    );
  }

  2.3 Tree Visualizer with Auto-Layout

  src/lib/utils/treeLayout.ts:
  import dagre from 'dagre';
  import { VizNode, VizEdge } from '@/lib/types';

  export const layoutTree = (nodes: VizNode[], edges: VizEdge[]) => {
    const g = new dagre.graphlib.Graph();
    g.setDefaultEdgeLabel(() => ({}));
    g.setGraph({
      rankdir: 'TB',  // Top to Bottom
      nodesep: 80,
      ranksep: 100,
      marginx: 50,
      marginy: 50
    });

    nodes.forEach(node => {
      g.setNode(node.id, { width: 60, height: 60 });
    });

    edges.forEach(edge => {
      g.setEdge(edge.source, edge.target);
    });

    dagre.layout(g);

    return nodes.map(node => ({
      ...node,
      position: {
        x: g.node(node.id).x - 30,
        y: g.node(node.id).y - 30
      }
    }));
  };

  src/components/visualization/visualizers/TreeVisualizer.tsx:
  'use client';

  import ReactFlow, { Node, Edge, MarkerType } from 'reactflow';
  import { VizNode, VizEdge } from '@/lib/types';
  import { layoutTree } from '@/lib/utils/treeLayout';

  interface TreeVisualizerProps {
    nodes: VizNode[];
    edges: VizEdge[];
    dsName: string;
  }

  export default function TreeVisualizer({ nodes, edges, dsName }: TreeVisualizerProps) {
    const layoutedNodes = layoutTree(nodes, edges);

    const flowNodes: Node[] = layoutedNodes.map(node => ({
      id: node.id,
      position: node.position!,
      data: {
        label: (
          <div className="flex items-center justify-center">
            <span className="text-lg font-bold">{node.value}</span>
          </div>
        )
      },
      style: {
        background: node.metadata?.isRoot ? '#00c853' : '#424242',
        color: '#fff',
        border: '2px solid #666',
        borderRadius: '50%',
        width: 60,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    }));

    const flowEdges: Edge[] = edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      style: {
        stroke: edge.label === 'left' ? '#42a5f5' : '#ef5350',
        strokeWidth: 2
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: edge.label === 'left' ? '#42a5f5' : '#ef5350'
      },
      labelStyle: { fill: '#888', fontSize: 10 }
    }));

    return (
      <div className="w-full h-full bg-[#1e1e1e]">
        <div className="text-center text-sm text-gray-400 py-2 font-mono">{dsName}</div>
        <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
          <ReactFlow
            nodes={flowNodes}
            edges={flowEdges}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll={true}
            minZoom={0.5}
            maxZoom={1.5}
          />
        </div>
      </div>
    );
  }

  2.4 Update VisualizationPanel Router

  src/components/visualization/VisualizationPanel.tsx:
  'use client';

  import { useExecutionStore } from '@/lib/store/executionStore';
  import ArrayVisualizer from './visualizers/ArrayVisualizer';
  import LinkedListVisualizer from './visualizers/LinkedListVisualizer';
  import TreeVisualizer from './visualizers/TreeVisualizer';
  import EmptyState from './EmptyState';

  export default function VisualizationPanel() {
    const { events, currentStep, status } = useExecutionStore();

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
            <LinkedListVisualizer nodes={nodes} edges={edges} dsName={dsName} />
          )}

          {dsType === 'tree' && (
            <TreeVisualizer nodes={nodes} edges={edges} dsName={dsName} />
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

  2.5 Add Mock Executions for New Problems

  Update mockExecutionEngine.ts with linked list and tree execution events.

  2.6 Phase 2 Acceptance Criteria

  - ✅ Linked List visualizer shows nodes with arrows
  - ✅ Tree visualizer shows hierarchical structure
  - ✅ Multiple problems selectable (add problem selector)
  - ✅ All visualizers handle highlights correctly
  - ✅ Layout algorithms work (dagre for trees)
  - ✅ Smooth transitions between steps

  ---
  Phase 3: Polish & Production Ready (Week 3)

  Goals

  - Speed control slider
  - Better animations
  - More problems (5+ total)
  - Error handling
  - Code validation
  - Performance optimization
  - Documentation

  Deliverables

  3.1 Problem Selector

  src/components/layout/Header.tsx:
  'use client';

  import { Problem } from '@/lib/types';
  import { mockProblems } from '@/lib/mock/mockProblems';
  import DifficultyBadge from '@/components/problem/DifficultyBadge';

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
          className="bg-[#3e3e42] text-white px-4 py-2 rounded-md border border-[#666] outline-none focus:border-[#00c853]"
        >
          {mockProblems.map(p => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        <DifficultyBadge difficulty={problem.difficulty} />
      </div>
    );
  }

  3.2 Speed Control

  Update ControlPanel.tsx:
  // Add speed slider
  const { speed, setSpeed } = useExecutionStore();

  <div className="flex items-center gap-2">
    <span className="text-xs text-gray-400">Speed:</span>
    <input
      type="range"
      min="100"
      max="2000"
      step="100"
      value={speed}
      onChange={(e) => setSpeed(Number(e.target.value))}
      className="w-24"
    />
    <span className="text-xs text-gray-400">{speed}ms</span>
  </div>

  3.3 Animations

  Add to Tailwind config:
  // tailwind.config.ts
  module.exports = {
    theme: {
      extend: {
        animation: {
          'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'fade-in': 'fadeIn 0.3s ease-in',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(-10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          }
        }
      }
    }
  }

  3.4 More Problems

  Add 3+ more problems covering:
  - Valid Parentheses (Stack)
  - Maximum Depth of Binary Tree (Tree)
  - Merge Two Sorted Lists (Linked List)
  - Contains Duplicate (Array + HashMap)

  3.5 Error Boundaries

  src/components/ErrorBoundary.tsx:
  'use client';

  import { Component, ReactNode } from 'react';

  interface Props {
    children: ReactNode;
  }

  interface State {
    hasError: boolean;
    error?: Error;
  }

  export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
      return { hasError: true, error };
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
              <p className="text-gray-400 mb-4">{this.state.error?.message}</p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 bg-[#00c853] rounded-md"
              >
                Try again
              </button>
            </div>
          </div>
        );
      }

      return this.props.children;
    }
  }

  3.6 Loading States

  Add skeleton loaders for Monaco Editor and visualizations.

  3.7 README Documentation

  Create comprehensive README with:
  - Project overview
  - Tech stack
  - Setup instructions
  - Architecture diagram
  - Future roadmap (backend integration)
  - Screenshots

  3.8 Phase 3 Acceptance Criteria

  - ✅ 5+ working problems with visualizations
  - ✅ Speed control slider functional
  - ✅ Smooth animations on state changes
  - ✅ Error boundaries prevent crashes
  - ✅ Loading states for all async operations
  - ✅ Responsive design (works on 1920x1080+)
  - ✅ Clean, documented code
  - ✅ README with setup guide
  - ✅ No console errors
  - ✅ Ready for backend integration

  ---
  Summary Timeline
  ┌─────────┬──────────┬───────────────────────────────────────────┐
  │  Phase  │ Duration │              Key Deliverable              │
  ├─────────┼──────────┼───────────────────────────────────────────┤
  │ Phase 1 │ Week 1   │ Working frontend with array visualization │
  ├─────────┼──────────┼───────────────────────────────────────────┤
  │ Phase 2 │ Week 2   │ All major data structure visualizers      │
  ├─────────┼──────────┼───────────────────────────────────────────┤
  │ Phase 3 │ Week 3   │ Polished MVP ready for backend            │
  └─────────┴──────────┴───────────────────────────────────────────┘
  Next Steps After Phase 3

  1. Backend Integration (Phase 4 - separate planning):
    - Build Node.js execution server
    - Implement Python AST instrumentation
    - WebSocket real-time streaming
    - Support actual code execution
  2. Advanced Features (Phase 5+):
    - Multi-language support (JavaScript, Java)
    - Custom test cases
    - Solution comparison
    - Sharing visualizations