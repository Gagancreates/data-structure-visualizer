'use client';

import { ReactFlow, Node, Edge, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { VizNode, VizEdge } from '@/lib/types';
import { layoutTree } from '@/lib/utils/treeLayout';

interface TreeVisualizerProps {
  nodes: VizNode[];
  edges: VizEdge[];
  dsName: string;
  highlights?: string[];
}

export default function TreeVisualizer({ nodes, edges, dsName, highlights = [] }: TreeVisualizerProps) {
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
      background: highlights.includes(node.id)
        ? '#ffa726'
        : node.metadata?.isRoot
        ? '#00c853'
        : '#424242',
      color: '#fff',
      border: highlights.includes(node.id) ? '3px solid #fff' : '2px solid #666',
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
