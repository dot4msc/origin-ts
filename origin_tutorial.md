# Making Your First origin-ts Game

This tutorial will guide you through creating your first game using the **origin-ts** engine. `origin-ts` is an Entity-Component-System (ECS) engine specialized for pixel art top-down RPGs. We will learn how to create a simple world, load assets, and add a moving player character.

## Prerequisites

- You should have `origin-ts` installed and linked in your project.
- Basic knowledge of TypeScript and ECS concepts.
- The assets for this tutorial (`bg.png`, `hero.png`, and `star.png`) have been generated and are located in the `tutorial-assets` directory of your workspace.

---

## Step 1: Initial Setup & HTML

First, create an `index.html` file. Since `origin-ts` automatically creates a canvas and scales it, we just need a container `div` where the engine will inject it.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First origin-ts Game</title>
  <style>
    body {
      margin: 0;
      background-color: #222;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  </style>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="./src/game.ts"></script>
</body>
</html>
```

## Step 2: Bootstrapping the Engine

Now let's dive into TypeScript. Create a `game.ts` file. We will import the necessary classes from `origin-ts`, setup our `Display`, and initialize the `World`.

```typescript
import { 
  Engine, Display, World, assets, Components, Systems,
  AbstractEntityFactory, DefaultGameFactory 
} from 'origin-ts';

// 1. Initialize Display & World
// 'app' is the ID of the div in our HTML
const display = new Display('app');
const world = new World();

// 2. Register Built-in Systems using batch addition
world.addSystems({
  control: new Systems.ControlSystem(),
  movement: new Systems.MovementSystem(),
  animation: new Systems.AnimationSystem(),
  // The RenderSystem needs the canvas 2D context to draw
  render: new Systems.RenderSystem(display.ctx)
});
```

## Step 3: Loading Assets

In `origin-ts`, we use the `assets` global AssetLoader. We need to load our images before we can use them as sprites. Let's create an `init` function to handle async loading.

```typescript
async function init() {
  // Load our 16x16 sprite images
  await assets.loadImage('bg', 'tutorial-assets/bg.png');
  await assets.loadImage('hero', 'tutorial-assets/hero.png');
  await assets.loadImage('star', 'tutorial-assets/star.png');

  // We will build our world and start the engine here...
  
  createWorld();
}

init();
```

## Step 4: Building the World

Now let's populate our `World`. In an ECS, everything is an `Entity` composed of data components. Let's create a background and some stars.

```typescript
function createWorld() {
  const factory: AbstractEntityFactory = new DefaultGameFactory(world);

  // 1. Create Background using our factory family method
  factory.createEnvironment({ spriteName: 'bg' });

  // 2. Create some collectible stars using manual batch component addition
  for (let i = 0; i < 5; i++) {
    const star = world.createEntity();
    const x = Math.random() * 320;
    const y = Math.random() * 180;
    
    world.addComponents(star, {
      transform: new Components.Transform(x, y),
      sprite: new Components.SpriteComponent('star')
    });
  }
}
```

## Step 5: Adding the Player

Let's expand the `createWorld` function by adding our controllable hero. To make an entity controllable and moving, it needs `Kinematics` and `PlayerControl`.

```typescript
  // 3. Create Player Entity using the abstract factory
  // Spawns hero at (160, 90) with a speed of 100
  factory.createPlayer({ spriteName: 'hero', x: 160, y: 90, speed: 100 });
```

## Step 6: Starting the Game Loop

Finally, at the end of `createWorld`, we need to instantiate the `Engine` and kick off the game loop. The `Engine` takes two callback functions: one for logic updates, and one for rendering.

```typescript
  // Start the Game Loop
  const engine = new Engine(
    (dt) => {
      // Logic update
      world.update(dt);
    },
    (interpolation) => {
      // Clear the screen before rendering the next frame
      display.clear('#000000');
      // Render entities
      world.render(interpolation);
    }
  );
  
  engine.start();
}
```

## Conclusion

Congratulations! You have set up a basic `origin-ts` ECS loop. 
Your `game.ts` file handles loading assets, constructing entities with data (Transforms and Sprites), and applying logic through Systems (Movement and Controls). You can now run this locally and use your keyboard's arrow keys or WASD to move your hero around the screen!
