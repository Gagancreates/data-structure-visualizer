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
