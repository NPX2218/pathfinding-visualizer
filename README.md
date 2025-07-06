# 🧭 Pathfinding & Maze Generation Visualizer

An interactive web-based tool built with **React** that lets you visualize popular **pathfinding algorithms** like Dijkstra’s, and generate **mazes** using algorithms like **Randomized DFS**. This project is great for learning how search algorithms work and seeing them animate in real-time on a grid.

---

## 🚀 Features

- 🧠 **Dijkstra's Algorithm** – Visualize the shortest path algorithm step-by-step.
- 🧱 **Maze Generation** – Generate mazes using animated Depth-First Search.
- 🟩 **Interactive Grid** – Place walls, move start/finish nodes, and reset as needed.
- ⚙️ **Responsive Design** – Built with React and Tailwind CSS.
- ⏱️ **Speed Control** – Adjust how fast the visualizations run.

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/pathfinding-visualizer.git
cd pathfinding-visualizer
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

Then open your browser and visit: http://localhost:3000

## 🧠 How It Works

### Pathfinding

Uses Dijkstra’s Algorithm to find the shortest path between start and finish.

Nodes track distance, wall status, and visited state.

Visualizes the search and then the path from end to start.

### Maze Generation

Uses Randomized Depth-First Search to carve paths in a grid filled with walls.

Starts from cell (1, 1) and visits unvisited neighbors 2 steps away.

Removes walls in between to create maze passages.

ts
Copy
Edit
const wallRow = (current.row + next.row) / 2;
const wallCol = (current.col + next.col) / 2;
Animation is powered by await sleep(10) to show wall removal step-by-step.

🧩 Project Structure

```css
Copy
Edit
src/
├── algorithms/
│ └── generateMaze.tsx
│ └── dijkstra.ts
├── components/
│ └── Node.tsx
├── PathfindingVisualizer/
│ └── PathfindingVisualizer.tsx
├── App.tsx
├── index.tsx
```

## 📚 Learn More

[Dijkstra’s Algorithm](https://en.wikipedia.org/wiki/Dijkstra's_algorithm)

[Maze Generation (DFS)](https://medium.com/@nacerkroudir/randomized-depth-first-search-algorithm-for-maze-generation-fb2d83702742)

[React Documentation](https://react.dev/)

[Tailwind CSS](https://v2.tailwindcss.com/docs)

## 🌐 Deployment

To build and deploy the app:

```bash
npm run build
```

Then deploy the contents of the build/ folder using:

GitHub Pages

Netlify

Vercel

Or any other static host

## 💡 Future Ideas

Add support for A\*, BFS, DFS, Greedy Best-First Search.

Weighted nodes for variable costs.

Diagonal movement & teleporters.

## 👨‍💻 Author

Made by Neel Bansal
