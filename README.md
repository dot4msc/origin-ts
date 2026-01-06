# origin.ts

# 12-Month Roadmap for Building a 2D Game Engine

A structured, beginner-friendly plan for creating a full 2D **pixel‑art 2D game engine** from scratch over one year, using **TypeScript + HTML Canvas**. The focus is on *learning engine fundamentals*, not cloning Unity or Phaser.

---

## 🎯 Philosophy

* Learn **why** engines are built the way they are
* Write small, understandable systems
* Favor clarity over performance at first
* Rebuild systems when you outgrow them

By the end of this roadmap, you should be able to:

* Understand how modern 2D engines work internally
* Build small games without external engines
* Read and reason about professional engine code

---

## 📚 Recommended Books (Read Gradually)

* **Game Programming Patterns** — Robert Nystrom *(primary guide)*
* **Game Engine Architecture** — Jason Gregory *(reference)*
* **Game Coding Complete** — Mike McShaffry
* **The Nature of Code** — Daniel Shiffman
* **Programming 2D Games** — Charles Kelly
* **Real‑Time Collision Detection** — Christer Ericson *(advanced)*

⚠️ Do NOT read cover‑to‑cover. Read chapters when they become relevant.

---

## 🗓️ Overview by Month

---

## **Months 1–2: Foundations**

### Goal

Build a minimal engine loop and understand how games update and render.

### Learn

* HTML Canvas API (`drawImage`, transforms)
* `requestAnimationFrame`
* Delta time
* TypeScript classes & modules
* Asset loading (images)

### Build

* `Game` class (main loop)
* `Scene` abstraction
* `Sprite` class
* Input manager (keyboard & mouse)

### Result

➡️ A sprite that moves smoothly with arrow keys.

---

## **Months 3–4: Animation & Tilemaps**

### Goal

Make the engine usable for real 2D games.

### Learn

* Sprite sheets
* Frame‑based animation
* Tilesets
* JSON tilemaps (Tiled format)
* Render layers

### Build

* `Animation` / `Animator`
* `Tilemap` renderer
* Camera offset (basic)

### Result

➡️ A player walking around on a tilemap.

---

## **Months 5–6: Camera, World & Entities**

### Goal

Separate world logic from rendering and prepare for larger games.

### Learn

* World vs screen space
* Camera math
* Entity lifecycles
* Game object ownership

### Build

* `Camera` class (follow, clamp)
* `Entity` base class
* `Transform` system (position, scale, rotation)
* Scene‑level entity management

### Result

➡️ Camera follows player across a scrolling world.

---

## **Months 7–8: Collision & Physics Basics**

### Goal

Make interaction possible.

### Learn

* AABB collision
* Broad vs narrow phase
* Collision resolution
* Simple physics concepts

### Build

* `Collider` component
* Collision system
* Simple physics step
* Debug collision rendering

### Result

➡️ Player collides with walls and objects.

---

## **Months 9–10: Game Architecture & Tools**

### Goal

Make the engine scalable and maintainable.

### Learn

* Game Programming Patterns:

  * State
  * Observer
  * Command
  * Component
* Data‑driven design
* Serialization

### Build

* Scene manager / state machine
* Event system
* Config‑driven entities
* Save / load system

### Result

➡️ Clean scene transitions and reusable systems.

---

## **Month 11: Polish & Performance**

### Goal

Improve usability and performance.

### Learn

* Object pooling
* Spatial partitioning (grid / quadtree)
* Render batching
* Profiling

### Build

* Object pool
* Debug overlay (FPS, entities)
* Performance improvements

### Result

➡️ Stable performance with many objects.

---

## **Month 12: Ship a Game**

### Goal

Prove the engine works.

### Build

* A complete small game:

  * Platformer OR top‑down
  * Menus
  * Audio
  * Win / lose states

### Final Result

🎉 A finished game **built on your own engine**.

---

## 🧠 Final Advice

* Rewriting systems is **not failure** — it is progress
* Avoid premature optimization
* Keep engine code separate from game code
* Build tools only when pain appears

If you reach Month 12, you are no longer a beginner.
You are an **engine programmer in training**.

---

Happy hacking 🚀
