# DS Visualizer 🚀

An interactive data structures and algorithms visualizer built with Next.js. Learn DSA concepts through beautiful, step-by-step visualizations.

![DS Visualizer](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![React Flow](https://img.shields.io/badge/React%20Flow-11-purple?style=for-the-badge)

## ✨ Features

- **3-Panel HackerRank-Style Interface** - Problem description, code editor, and live visualization
- **Multiple Data Structures** - Arrays, Linked Lists, Binary Trees, Stacks, and more
- **Monaco Code Editor** - Full-featured editor with syntax highlighting
- **Step-by-Step Execution** - Control execution speed and navigate through each step
- **5 LeetCode Problems** - Practice with real coding problems
- **Responsive Design** - Resizable panels for optimal viewing
- **Dark Theme** - Easy on the eyes for long coding sessions

## 🎯 Supported Problems

1. **Two Sum** (Array + HashMap)
2. **Reverse Linked List** (Linked List)
3. **Binary Tree Inorder Traversal** (Tree)
4. **Valid Parentheses** (Stack)
5. **Maximum Depth of Binary Tree** (Tree)
6. **Contains Duplicate** (Array + HashMap)

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Visualizations**: [React Flow](https://reactflow.dev/)
- **Graph Layout**: [Dagre](https://github.com/dagrejs/dagre)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/Gagancreates/data-structure-visualizer.git
cd data-structure-visualizer/frontend
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
frontend/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main application page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── editor/              # Code editor components
│   │   ├── CodeEditor.tsx
│   │   ├── ControlPanel.tsx
│   │   └── ConsoleOutput.tsx
│   ├── layout/              # Layout components
│   │   ├── MainLayout.tsx
│   │   └── Header.tsx
│   ├── problem/             # Problem display components
│   │   ├── ProblemPanel.tsx
│   │   ├── ProblemDescription.tsx
│   │   └── DifficultyBadge.tsx
│   ├── visualization/       # Visualization components
│   │   ├── VisualizationPanel.tsx
│   │   ├── EmptyState.tsx
│   │   └── visualizers/
│   │       ├── ArrayVisualizer.tsx
│   │       ├── LinkedListVisualizer.tsx
│   │       └── TreeVisualizer.tsx
│   └── ErrorBoundary.tsx    # Error handling
├── lib/
│   ├── types/               # TypeScript type definitions
│   ├── store/               # Zustand state management
│   ├── mock/                # Mock data and execution engine
│   └── utils/               # Utility functions
└── public/                  # Static assets
```

## 🎮 How to Use

1. **Select a Problem** - Choose from the dropdown in the header
2. **Write Your Code** - Use the Monaco editor to implement your solution
3. **Click Run** - Watch the step-by-step visualization
4. **Control Playback** - Use step forward/backward, play/pause, and speed controls
5. **Learn Visually** - See exactly how your algorithm processes the data

## 🎨 Visualization Types

### Array Visualizer
- Displays arrays as colored boxes with indices
- Highlights elements during processing
- Shows swaps and comparisons

### Linked List Visualizer
- Renders nodes with connecting arrows
- Shows HEAD and TAIL pointers
- Visualizes pointer manipulations

### Tree Visualizer
- Hierarchical layout with Dagre
- Color-coded edges (blue for left, red for right)
- Highlights traversal order

### Stack Visualizer
- Vertical array representation
- Shows push and pop operations
- LIFO visualization

## 🔮 Future Roadmap

### Phase 4: Backend Integration
- [ ] Node.js execution server
- [ ] Python AST instrumentation
- [ ] WebSocket real-time streaming
- [ ] Actual code execution support

### Phase 5: Advanced Features
- [ ] Multi-language support (JavaScript, Java)
- [ ] Custom test cases
- [ ] Solution comparison
- [ ] Sharing visualizations
- [ ] User authentication
- [ ] Progress tracking

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Gagan**
- GitHub: [@Gagancreates](https://github.com/Gagancreates)

## 🙏 Acknowledgments

- Inspired by LeetCode and HackerRank
- React Flow team for the amazing visualization library
- Monaco Editor team for the powerful code editor
- Next.js team for the incredible framework

---

⭐ Star this repo if you find it helpful!

Built with ❤️ using Next.js and React Flow
