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
