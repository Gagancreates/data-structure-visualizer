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

  if (problemId === 'reverse-linked-list') {
    return [
      {
        step: 0,
        timestamp: 0,
        type: 'create',
        data: {
          dsType: 'linkedlist',
          dsName: 'head',
          nodes: [
            { id: 'node-1', value: 1, metadata: { isHead: true } },
            { id: 'node-2', value: 2 },
            { id: 'node-3', value: 3 },
            { id: 'node-4', value: 4 },
            { id: 'node-5', value: 5, metadata: { isTail: true } }
          ],
          edges: [
            { id: 'edge-1-2', source: 'node-1', target: 'node-2', label: 'next' },
            { id: 'edge-2-3', source: 'node-2', target: 'node-3', label: 'next' },
            { id: 'edge-3-4', source: 'node-3', target: 'node-4', label: 'next' },
            { id: 'edge-4-5', source: 'node-4', target: 'node-5', label: 'next' }
          ],
          message: 'Initial linked list: 1 -> 2 -> 3 -> 4 -> 5'
        }
      },
      {
        step: 1,
        timestamp: 500,
        type: 'highlight',
        data: {
          dsType: 'linkedlist',
          dsName: 'head',
          nodes: [
            { id: 'node-1', value: 1, metadata: { isHead: true } },
            { id: 'node-2', value: 2 },
            { id: 'node-3', value: 3 },
            { id: 'node-4', value: 4 },
            { id: 'node-5', value: 5, metadata: { isTail: true } }
          ],
          edges: [
            { id: 'edge-1-2', source: 'node-1', target: 'node-2', label: 'next' },
            { id: 'edge-2-3', source: 'node-2', target: 'node-3', label: 'next' },
            { id: 'edge-3-4', source: 'node-3', target: 'node-4', label: 'next' },
            { id: 'edge-4-5', source: 'node-4', target: 'node-5', label: 'next' }
          ],
          highlights: ['node-1', 'node-2'],
          message: 'Start reversing: current = 1, next = 2'
        }
      },
      {
        step: 2,
        timestamp: 1000,
        type: 'update',
        data: {
          dsType: 'linkedlist',
          dsName: 'head',
          nodes: [
            { id: 'node-2', value: 2, metadata: { isHead: true } },
            { id: 'node-1', value: 1 },
            { id: 'node-3', value: 3 },
            { id: 'node-4', value: 4 },
            { id: 'node-5', value: 5, metadata: { isTail: true } }
          ],
          edges: [
            { id: 'edge-2-1', source: 'node-2', target: 'node-1', label: 'next' },
            { id: 'edge-2-3', source: 'node-2', target: 'node-3', label: 'next' },
            { id: 'edge-3-4', source: 'node-3', target: 'node-4', label: 'next' },
            { id: 'edge-4-5', source: 'node-4', target: 'node-5', label: 'next' }
          ],
          highlights: ['node-2', 'node-3'],
          message: 'Reversed link: 2 -> 1, now processing: current = 2, next = 3'
        }
      },
      {
        step: 3,
        timestamp: 1500,
        type: 'update',
        data: {
          dsType: 'linkedlist',
          dsName: 'head',
          nodes: [
            { id: 'node-5', value: 5, metadata: { isHead: true } },
            { id: 'node-4', value: 4 },
            { id: 'node-3', value: 3 },
            { id: 'node-2', value: 2 },
            { id: 'node-1', value: 1, metadata: { isTail: true } }
          ],
          edges: [
            { id: 'edge-5-4', source: 'node-5', target: 'node-4', label: 'next' },
            { id: 'edge-4-3', source: 'node-4', target: 'node-3', label: 'next' },
            { id: 'edge-3-2', source: 'node-3', target: 'node-2', label: 'next' },
            { id: 'edge-2-1', source: 'node-2', target: 'node-1', label: 'next' }
          ],
          message: 'Linked list reversed! New head: 5 -> 4 -> 3 -> 2 -> 1'
        }
      }
    ];
  }

  if (problemId === 'binary-tree-inorder') {
    return [
      {
        step: 0,
        timestamp: 0,
        type: 'create',
        data: {
          dsType: 'tree',
          dsName: 'root',
          nodes: [
            { id: 'node-1', value: 1, metadata: { isRoot: true } },
            { id: 'node-2', value: 2 },
            { id: 'node-3', value: 3 }
          ],
          edges: [
            { id: 'edge-1-2', source: 'node-1', target: 'node-2', label: 'right' },
            { id: 'edge-2-3', source: 'node-2', target: 'node-3', label: 'left' }
          ],
          message: 'Tree structure: root = 1, right child = 2, left child of 2 = 3'
        }
      },
      {
        step: 1,
        timestamp: 500,
        type: 'highlight',
        data: {
          dsType: 'tree',
          dsName: 'root',
          nodes: [
            { id: 'node-1', value: 1, metadata: { isRoot: true } },
            { id: 'node-2', value: 2 },
            { id: 'node-3', value: 3 }
          ],
          edges: [
            { id: 'edge-1-2', source: 'node-1', target: 'node-2', label: 'right' },
            { id: 'edge-2-3', source: 'node-2', target: 'node-3', label: 'left' }
          ],
          highlights: ['node-1'],
          message: 'Visit root (1): check left subtree first (none)'
        }
      },
      {
        step: 2,
        timestamp: 1000,
        type: 'highlight',
        data: {
          dsType: 'tree',
          dsName: 'root',
          nodes: [
            { id: 'node-1', value: 1, metadata: { isRoot: true } },
            { id: 'node-2', value: 2 },
            { id: 'node-3', value: 3 }
          ],
          edges: [
            { id: 'edge-1-2', source: 'node-1', target: 'node-2', label: 'right' },
            { id: 'edge-2-3', source: 'node-2', target: 'node-3', label: 'left' }
          ],
          highlights: ['node-1'],
          message: 'Add root to result: [1]'
        }
      },
      {
        step: 3,
        timestamp: 1500,
        type: 'highlight',
        data: {
          dsType: 'tree',
          dsName: 'root',
          nodes: [
            { id: 'node-1', value: 1, metadata: { isRoot: true } },
            { id: 'node-2', value: 2 },
            { id: 'node-3', value: 3 }
          ],
          edges: [
            { id: 'edge-1-2', source: 'node-1', target: 'node-2', label: 'right' },
            { id: 'edge-2-3', source: 'node-2', target: 'node-3', label: 'left' }
          ],
          highlights: ['node-3'],
          message: 'Visit right subtree: process left child (3)'
        }
      },
      {
        step: 4,
        timestamp: 2000,
        type: 'highlight',
        data: {
          dsType: 'tree',
          dsName: 'root',
          nodes: [
            { id: 'node-1', value: 1, metadata: { isRoot: true } },
            { id: 'node-2', value: 2 },
            { id: 'node-3', value: 3 }
          ],
          edges: [
            { id: 'edge-1-2', source: 'node-1', target: 'node-2', label: 'right' },
            { id: 'edge-2-3', source: 'node-2', target: 'node-3', label: 'left' }
          ],
          highlights: ['node-2'],
          message: 'Add 3, then 2 to result: [1, 3, 2] - Complete!'
        }
      }
    ];
  }

  if (problemId === 'valid-parentheses') {
    return [
      {
        step: 0,
        timestamp: 0,
        type: 'create',
        data: {
          dsType: 'stack',
          dsName: 'stack',
          nodes: [],
          message: 'Initialize empty stack. Input: "()[]{}"'
        }
      },
      {
        step: 1,
        timestamp: 500,
        type: 'create',
        data: {
          dsType: 'stack',
          dsName: 'stack',
          nodes: [
            { id: 'stack-0', value: '(', index: 0 }
          ],
          highlights: ['stack-0'],
          message: 'Push "(" onto stack'
        }
      },
      {
        step: 2,
        timestamp: 1000,
        type: 'delete',
        data: {
          dsType: 'stack',
          dsName: 'stack',
          nodes: [],
          message: 'Found matching ")" - Pop "(" from stack'
        }
      },
      {
        step: 3,
        timestamp: 1500,
        type: 'create',
        data: {
          dsType: 'stack',
          dsName: 'stack',
          nodes: [
            { id: 'stack-0', value: '[', index: 0 }
          ],
          highlights: ['stack-0'],
          message: 'Push "[" onto stack'
        }
      },
      {
        step: 4,
        timestamp: 2000,
        type: 'delete',
        data: {
          dsType: 'stack',
          dsName: 'stack',
          nodes: [],
          message: 'Found matching "]" - Pop "[" from stack'
        }
      },
      {
        step: 5,
        timestamp: 2500,
        type: 'create',
        data: {
          dsType: 'stack',
          dsName: 'stack',
          nodes: [
            { id: 'stack-0', value: '{', index: 0 }
          ],
          highlights: ['stack-0'],
          message: 'Push "{" onto stack'
        }
      },
      {
        step: 6,
        timestamp: 3000,
        type: 'delete',
        data: {
          dsType: 'stack',
          dsName: 'stack',
          nodes: [],
          message: 'Found matching "}" - Stack empty! Valid parentheses ✓'
        }
      }
    ];
  }

  if (problemId === 'max-depth-binary-tree') {
    return [
      {
        step: 0,
        timestamp: 0,
        type: 'create',
        data: {
          dsType: 'tree',
          dsName: 'root',
          nodes: [
            { id: 'node-3', value: 3, metadata: { isRoot: true } },
            { id: 'node-9', value: 9 },
            { id: 'node-20', value: 20 },
            { id: 'node-15', value: 15 },
            { id: 'node-7', value: 7 }
          ],
          edges: [
            { id: 'edge-3-9', source: 'node-3', target: 'node-9', label: 'left' },
            { id: 'edge-3-20', source: 'node-3', target: 'node-20', label: 'right' },
            { id: 'edge-20-15', source: 'node-20', target: 'node-15', label: 'left' },
            { id: 'edge-20-7', source: 'node-20', target: 'node-7', label: 'right' }
          ],
          message: 'Tree structure: Finding maximum depth'
        }
      },
      {
        step: 1,
        timestamp: 500,
        type: 'highlight',
        data: {
          dsType: 'tree',
          dsName: 'root',
          nodes: [
            { id: 'node-3', value: 3, metadata: { isRoot: true } },
            { id: 'node-9', value: 9 },
            { id: 'node-20', value: 20 },
            { id: 'node-15', value: 15 },
            { id: 'node-7', value: 7 }
          ],
          edges: [
            { id: 'edge-3-9', source: 'node-3', target: 'node-9', label: 'left' },
            { id: 'edge-3-20', source: 'node-3', target: 'node-20', label: 'right' },
            { id: 'edge-20-15', source: 'node-20', target: 'node-15', label: 'left' },
            { id: 'edge-20-7', source: 'node-20', target: 'node-7', label: 'right' }
          ],
          highlights: ['node-3'],
          message: 'Start at root (3), depth = 1'
        }
      },
      {
        step: 2,
        timestamp: 1000,
        type: 'highlight',
        data: {
          dsType: 'tree',
          dsName: 'root',
          nodes: [
            { id: 'node-3', value: 3, metadata: { isRoot: true } },
            { id: 'node-9', value: 9 },
            { id: 'node-20', value: 20 },
            { id: 'node-15', value: 15 },
            { id: 'node-7', value: 7 }
          ],
          edges: [
            { id: 'edge-3-9', source: 'node-3', target: 'node-9', label: 'left' },
            { id: 'edge-3-20', source: 'node-3', target: 'node-20', label: 'right' },
            { id: 'edge-20-15', source: 'node-20', target: 'node-15', label: 'left' },
            { id: 'edge-20-7', source: 'node-20', target: 'node-7', label: 'right' }
          ],
          highlights: ['node-9'],
          message: 'Left path: node 9 (leaf), depth = 2'
        }
      },
      {
        step: 3,
        timestamp: 1500,
        type: 'highlight',
        data: {
          dsType: 'tree',
          dsName: 'root',
          nodes: [
            { id: 'node-3', value: 3, metadata: { isRoot: true } },
            { id: 'node-9', value: 9 },
            { id: 'node-20', value: 20 },
            { id: 'node-15', value: 15 },
            { id: 'node-7', value: 7 }
          ],
          edges: [
            { id: 'edge-3-9', source: 'node-3', target: 'node-9', label: 'left' },
            { id: 'edge-3-20', source: 'node-3', target: 'node-20', label: 'right' },
            { id: 'edge-20-15', source: 'node-20', target: 'node-15', label: 'left' },
            { id: 'edge-20-7', source: 'node-20', target: 'node-7', label: 'right' }
          ],
          highlights: ['node-20', 'node-15'],
          message: 'Right path: node 20 -> 15 (leaf), depth = 3'
        }
      },
      {
        step: 4,
        timestamp: 2000,
        type: 'highlight',
        data: {
          dsType: 'tree',
          dsName: 'root',
          nodes: [
            { id: 'node-3', value: 3, metadata: { isRoot: true } },
            { id: 'node-9', value: 9 },
            { id: 'node-20', value: 20 },
            { id: 'node-15', value: 15 },
            { id: 'node-7', value: 7 }
          ],
          edges: [
            { id: 'edge-3-9', source: 'node-3', target: 'node-9', label: 'left' },
            { id: 'edge-3-20', source: 'node-3', target: 'node-20', label: 'right' },
            { id: 'edge-20-15', source: 'node-20', target: 'node-15', label: 'left' },
            { id: 'edge-20-7', source: 'node-20', target: 'node-7', label: 'right' }
          ],
          highlights: ['node-20', 'node-7'],
          message: 'Right path: node 20 -> 7 (leaf), depth = 3. Max depth = 3 ✓'
        }
      }
    ];
  }

  if (problemId === 'contains-duplicate') {
    return [
      {
        step: 0,
        timestamp: 0,
        type: 'create',
        data: {
          dsType: 'array',
          dsName: 'nums',
          nodes: [
            { id: 'nums-0', value: 1, index: 0 },
            { id: 'nums-1', value: 2, index: 1 },
            { id: 'nums-2', value: 3, index: 2 },
            { id: 'nums-3', value: 1, index: 3 }
          ],
          message: 'Initialize array: nums = [1, 2, 3, 1]. Check for duplicates using hash set.'
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
            { id: 'nums-0', value: 1, index: 0 },
            { id: 'nums-1', value: 2, index: 1 },
            { id: 'nums-2', value: 3, index: 2 },
            { id: 'nums-3', value: 1, index: 3 }
          ],
          highlights: ['nums-0'],
          message: 'Check nums[0] = 1. Add to set: {1}'
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
            { id: 'nums-0', value: 1, index: 0 },
            { id: 'nums-1', value: 2, index: 1 },
            { id: 'nums-2', value: 3, index: 2 },
            { id: 'nums-3', value: 1, index: 3 }
          ],
          highlights: ['nums-1'],
          message: 'Check nums[1] = 2. Add to set: {1, 2}'
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
            { id: 'nums-0', value: 1, index: 0 },
            { id: 'nums-1', value: 2, index: 1 },
            { id: 'nums-2', value: 3, index: 2 },
            { id: 'nums-3', value: 1, index: 3 }
          ],
          highlights: ['nums-2'],
          message: 'Check nums[2] = 3. Add to set: {1, 2, 3}'
        }
      },
      {
        step: 4,
        timestamp: 2000,
        type: 'highlight',
        data: {
          dsType: 'array',
          dsName: 'nums',
          nodes: [
            { id: 'nums-0', value: 1, index: 0, metadata: { color: 'green' } },
            { id: 'nums-1', value: 2, index: 1 },
            { id: 'nums-2', value: 3, index: 2 },
            { id: 'nums-3', value: 1, index: 3, metadata: { color: 'green' } }
          ],
          highlights: ['nums-0', 'nums-3'],
          message: 'Check nums[3] = 1. Already in set! Duplicate found ✓'
        }
      }
    ];
  }

  return [];
};
