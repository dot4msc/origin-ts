# 🚀 Origin Engine (v0.0.1-alpha)

**Origin** is a specialized, lightweight game engine built with TypeScript, designed exclusively for creating **pixel art RPGs**. It prioritizes pixel-perfect rendering, modular architecture, and classic RPG features.

---

## ✨ Key Features

- **🎮 Hybrid ECS Architecture**: Modular Entity-Component-System for flexible game objects.
- **🖥️ Pixel-Perfect Rendering**: Built-in integer scaling and `image-rendering: pixelated` support.
- **🗺️ Tiled Integration**: Load `.tmj` maps directly with support for layers and collisions.
- **🛡️ Physics & Collisions**: AABB bounding boxes with "sliding" wall physics.
- **🔝 Automatic Z-Sorting**: Characters automatically walk behind/in-front of objects based on depth.
- **💬 Dialogue Engine**: Typewriter-style text boxes with portrait and speaker support.
- **🎬 Event System**: Async/Promise-based cutscene and trigger management.
- **🌓 Retro Shaders**: CSS-based CRT scanlines, vignettes, and Day/Night color grading.
- **💾 Save System**: Persistent state using `localStorage`.

---

## 📦 Installation (Local Library)

To use Origin as a dependency in another project:

1.  **Build the library**:
    ```bash
    npm run build:lib
    ```

2.  **Install in your test project**:
    ```bash
    npm install "C:/Users/Mariano/Documents/dot4msc/origin-ts"
    ```

3.  **Import and Use**:
    ```typescript
    import { Engine, Display, World, Transform, SpriteComponent } from '@origin/core';
    ```

---

## 📂 Architecture

- `core/`: Main loop, Input, Assets, Events, and Save systems.
- `rendering/`: Canvas management, Shaders, and Sprite rendering.
- `world/`: Tilemap parsing and Collision logic.
- `entities/`: ECS framework, Components, and logic Systems.
- `ui/`: Dialogue and Menu management.
- `game/`: Your specific game implementation.

---

## 🛠️ Development

- `npm run dev`: Start the development server (Vite).
- `npm run build:lib`: Generate the library distribution (`dist/`).
- `npm run build`: Full build (Vite + Library).

---

## 📜 License
Internal Development Alpha.
