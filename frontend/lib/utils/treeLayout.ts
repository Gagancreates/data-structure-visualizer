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
