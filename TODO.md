# 2-Month Starter Roadmap for Your TypeScript 2D Game Engine

This document outlines your first two months of development toward building a simple 2D pixel-art-focused game engine using **TypeScript**. The goal is to move slowly, build fundamentals, avoid overwhelm, and follow along with the book **Game Programming Patterns**.

Recommended bundler: **Parcel** (simple, zero-config, great for beginners). Webpack or Vite can come later as you scale.

---

## 🗓️ Month 1 — Foundations

### **🎯 Goal:** Build the absolute core: draw a sprite, move it, update a loop.

In the first month, you're building the skeleton of a game engine. It will feel tiny — but these systems become the foundation for everything else.

### **What You'll Build This Month**

* ~~A window/canvas setup~~
* ~~A game loop with `update` and `render`~~
* ~~A simple renderer abstraction~~
* ~~A basic Sprite class~~
* A player that moves around the screen with keyboard input
* ~~Asset loading (just images)~~

### **Skills You'll Learn**

* TypeScript interfaces and type structure for engine code
* HTML5 Canvas essentials
* How update loops work under the hood
* How to decouple engine code from game code

---

## 🧠 Key Concepts To Implement

### **1. Game Loop (core of the engine)**

You will create a loop using `requestAnimationFrame`. The loop must:

* calculate `deltaTime`
* call `update(deltaTime)`
* call `render(context)`

This is the single most important step of the entire project.

**Game Programming Patterns chapters to read:**

* **Game Loop** (mandatory)
* Optional but helpful: **Update Method**

---

### **2. Renderer System (Canvas wrapper)**

Build a simple wrapper around Canvas so you can call:

```ts
renderer.clear()
renderer.drawSprite(sprite)
```

This keeps engine code clean.

**Game Programming Patterns chapter:**

* **Component** (for decoupling drawing logic later)

---

### **3. Sprite & Texture System**

Learn to load an image, store it as a texture, and draw it at a certain position.

What you'll implement:

* `Texture` loader
* `Sprite` class with:

  * `x`, `y`
  * `width`, `height`
  * `image`
  * `draw()` method

---

### **4. Basic Input System**

A simple keyboard state system:

* Store pressed keys
* Update per frame
* Access via `input.isDown("ArrowLeft")`

Useful for getting your first playable character moving.

**Game Programming Patterns chapter:**

* **Command** (great for designing inputs)

---

### **End of Month 1 Milestone**

You can:

* Draw a sprite
* Move it with keyboard input
* Run a stable game loop
* Structure code cleanly

This is already the foundation of your game engine.

---

# 🗓️ Month 2 — Systems & Architecture

### **🎯 Goal:** Start building the engine into multiple systems.

Month 2 is about architecture — making the engine scalable.

### **What You'll Build This Month**

* Scene management
* Simple entity architecture
* Animation system (sprite sheets)
* Collision basics (AABB)
* Asset manager

---

## 🔧 Systems to Implement

### **1. Scene (State) Management**

Create a `Scene` class:

* has `update` and `render`
* can contain entities
* `SceneManager` can switch scenes

**Patterns chapter:**

* **State** (super relevant)

---

### **2. Entity System (Not full ECS)**

You don’t need ECS yet.
Just build a simple `Entity` with:

* position
* update()
* render()

This gets you 90% of the way for small games.

**Patterns chapter:**

* **Component** (use later if you want component-based entities)

---

### **3. Animation System**

Implement sprite sheets:

* Ability to select frames from a sprite sheet
* Switch animations (idle, walk, run)
* Frame timers

**Patterns to read:**

* **Flyweight** (good for sprites share frames)
* Optional: **State** for animation transitions

---

### **4. Simple Physics / Collision**

Keep it basic: AABB (axis-aligned bounding box).

* rectangles only
* no rotation
* no physics engine

This is enough for 2D retro-style games.

**Patterns chapter:**

* None required, but good practice for Update loops.

---

### **5. Asset Manager**

A global manager that loads images before the game starts.

```ts
await Assets.load({
  player: "player.png",
  tileset: "tiles.png"
})
```

This avoids ugly async code everywhere.

---

# 🎉 End of Month 2 Milestone

At this point, you can:

* Load assets
* Render sprites and animations
* Switch scenes
* Move characters and detect collisions
* Build small demos with your engine

This is a REAL engine foundation.

---

# 📚 What You Should Be Reading

Here are the chapters of **Game Programming Patterns** assigned to these months:

### **Month 1 Required**

* Game Loop
* Update Method
* Command (for input)

### **Month 2 Required**

* State (for scenes and animations)
* Component (for entity architecture)
* Flyweight (for animations)

### **Optional but very helpful**

* Object Pool (later for many bullets/enemies)
* Event Queue (for decoupling systems)

---

# 🛠 Tools You’ll Use

* **TypeScript** for engine code
* **Parcel** for bundling (simple, no config)
* **Canvas API**
* (Optional later) WebGL or WebGPU for better performance

Parcel stays out of your way and supports TypeScript instantly.

---

# 🙌 Want More?

I can help you with:

* Folder structure
* Example boilerplate for the engine
* Diagrams of architecture
* Code templates for each system
* A GitHub project with issues auto-generated

Just tell me what you'd like to do next.
