import { DataStructureType } from './problem';

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
