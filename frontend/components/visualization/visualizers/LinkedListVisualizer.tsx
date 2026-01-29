'use client';

import { ReactFlow, Node, Edge, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { VizNode, VizEdge } from '@/lib/types';

interface LinkedListVisualizerProps {
  nodes: VizNode[];
  edges: VizEdge[];
  dsName: string;
  highlights?: string[];
}

export default function LinkedListVisualizer({ nodes, edges, dsName, highlights = [] }: LinkedListVisualizerProps) {
  const flowNodes: Node[] = nodes.map((node, idx) => ({
    id: node.id,
    type: 'default',
    position: { x: idx * 200, y: 150 },
    data: {
      label: (
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold">{node.value}</div>
          {node.metadata?.isHead && (
            <div className="text-xs text-green-400 mt-1 font-semibold">HEAD</div>
          )}
          {node.metadata?.isTail && (
            <div className="text-xs text-blue-400 mt-1 font-semibold">TAIL</div>
          )}
        </div>
      )
    },
    style: {
      background: highlights.includes(node.id) ? '#ffa726' : '#424242',
      color: '#fff',
      border: highlights.includes(node.id) ? '3px solid #fff' : '2px solid #666',
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
          panOnDrag={true}
        />
      </div>
    </div>
  );
}
