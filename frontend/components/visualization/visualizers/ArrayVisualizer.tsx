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
