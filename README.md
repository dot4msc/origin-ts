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

## 📦 Installation

Since this is a local library, you **do not** need to download it from GitHub. You can link it directly from your hard drive.

### 🏠 Method 1: Local Installation (Recommended for Development)
Use this if you want to test the library in another folder on the same machine.

1.  **Build the library** in this folder:
    ```bash
    npm run build:lib
    ```

2.  **Install in your test project** by pointing to this folder's absolute path:
    ```bash
    # Replace with your actual path if different
    npm install "C:/Users/Mariano/Documents/dot4msc/origin-ts"
    ```

### 🌐 Method 2: GitHub Installation (Optional)
If you decide to push this project to a GitHub repository, you can install it in other projects using:

1.  **Push to GitHub**:
    ```bash
    git remote add origin <your-repo-url>
    git push -u origin main
    ```

2.  **Install via GitHub**:
    ```bash
    npm install github:your-username/origin-ts
    ```

### 🔗 Method 3: Global Linking (Easiest for multiple projects)
Use this if you want to make Origin accessible globally on your machine so any project can use it without typing long file paths.

1.  **Register the engine globally**:
    In this folder (`origin-ts`), run:
    ```bash
    npm link
    ```

2.  **Use it in any other project**:
    In your new project's folder, run:
    ```bash
    npm link @origin/core
    ```

---

## 🚀 Usage

Once installed, you can import the engine as a scoped package:

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

This project is licensed under the **MIT License** with a **Beerware Clause**. 

See the [LICENSE](LICENSE) file for the full text. In short: use it for whatever you want, don't sue me if it breaks, and buy me a beer if we ever meet! 🍻
