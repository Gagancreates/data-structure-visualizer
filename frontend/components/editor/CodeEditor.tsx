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
      loading={
        <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-[#00c853] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm">Loading editor...</p>
          </div>
        </div>
      }
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
