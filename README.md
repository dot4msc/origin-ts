# 🚀 origin-ts Engine (v0.0.1)

**origin-ts** is a specialized, high-performance game engine built with TypeScript, designed exclusively for **pixel art RPGs**. It provides a professional-grade foundation for world-building, entity management, and cinematic storytelling.

---

## ✨ Core Features

### 🎮 Advanced ECS Architecture
*   **Modular Entities**: Use the Entity-Component-System pattern to build complex actors (Players, NPCs, Items) using reusable data components.
*   **Decoupled Logic**: Separate your game logic (Systems) from your data (Components) for maximum scalability.

### 🖥️ Pixel-Perfect Rendering
*   **Integer Scaling**: Automatic calculation of scaling factors to ensure your pixels stay crisp on any screen size.
*   **Z-Depth Sorting**: Automatic Y-coordinate sorting ensures players correctly walk behind/in-front of trees, buildings, and NPCs.

### 🛡️ World & Physics
*   **Tiled Support**: Direct integration with [Tiled Map Editor](https://www.mapeditor.org/) (.tmj JSON).
*   **Sliding Collisions**: AABB bounding box physics that allow for smooth sliding along walls and diagonal movement.

### 💬 RPG Mechanics
*   **Dialogue Engine**: Cinematic typewriter effects, speaker portraits, and branching text management.
*   **Event System**: A Promise-based system for scripting cutscenes and map triggers.
*   **Save System**: Built-in persistence using `localStorage`.

### 🌓 Retro Shaders (CSS-Based)
*   **CRT Scanlines**: Subtile horizontal scanlines for that classic monitor feel.
*   **Day/Night Cycles**: Dynamic color grading for sunset and night-time aesthetics.
*   **Vignette**: Subtle edge-darkening to focus player attention.

---

## 📦 Installation

### **From NPM**
```bash
npm install origin-ts
```

### **Local Installation (Same Machine)**
Use this if you want to point directly to the origin-ts folder:
```bash
# Replace with your actual path to the origin-ts folder
npm install "/path/to/origin-ts"
```

### **Global Linking (Recommended for Dev)**
Use this to make the engine accessible globally on your machine:
```bash
# In the origin-ts folder
npm link

# In your game project folder
npm link origin-ts
```

---

## 🚀 Quick Start

```typescript
import { Engine, Display, World, Transform, SpriteComponent, Kinematics } from 'origin-ts';

const display = new Display('app');
const world = new World();

// Create a player actor
const player = world.createEntity();
world.addComponent(player, new Transform(160, 90));
world.addComponent(player, new Kinematics());
world.addComponent(player, new SpriteComponent('hero-sprite'));

// Start the engine
const engine = new Engine(
  (dt) => world.update(dt),
  () => world.render()
);
engine.start();
```

---

## 📂 Project Architecture

```text
src/
├── core/           # Main Loop, Input, Assets, Events, Persistence
├── rendering/      # Canvas (Display) & Sprite management
├── world/          # Tilemaps & Collision logic
├── entities/       # ECS Framework, Components, and Logic Systems
├── ui/             # Dialogue Manager & UI Elements
└── game/           # Gameplay implementation entry point
```

---

## 📜 License

This project is licensed under the **MIT License** with a **Beerware Clause**.

> *Permission is hereby granted... use it for whatever you want. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return. Cheers! 🍻*

Created by **Mariano Hurtado de Mendoza Carranza** (@d0t4.music on IG/YT)
