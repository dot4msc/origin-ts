import { Component } from './ECS';

// --- Base Components ---

export class Transform extends Component {
  constructor(
    public x: number, 
    public y: number, 
    public scaleX: number = 1, 
    public scaleY: number = 1,
    public rotation: number = 0
  ) { super(); }
}

export class Kinematics extends Component {
  constructor(
    public vx: number = 0, 
    public vy: number = 0,
    public friction: number = 0.9 // For smooth stopping
  ) { super(); }
}

export interface Animation {
  frames: number[];
  speed: number; // Frames per second
  loop: boolean;
}

export class SpriteComponent extends Component {
  public currentFrame: number = 0;
  public animationTimer: number = 0;
  public currentAnimation: string = 'idle';

  constructor(
    public spriteSheet: string,
    public animations: Record<string, Animation> = { 
      idle: { frames: [0], speed: 1, loop: true } 
    }
  ) { super(); }
}

export class BoxCollider extends Component {
  constructor(
    public width: number,
    public height: number,
    public offsetX: number = 0,
    public offsetY: number = 0
  ) { super(); }
}

export class PlayerControl extends Component {
  constructor(public speed: number) { super(); }
}

// --- RPG Components ---

export interface StatValue {
  current: number;
  max: number;
}

export class Stats extends Component {
  constructor(
    public hp: StatValue,
    public mp: StatValue,
    public level: number = 1,
    public exp: number = 0
  ) { super(); }
}

export interface Item {
  id: string;
  name: string;
  quantity: number;
}

export class Inventory extends Component {
  constructor(public items: Item[] = []) { super(); }
}

export class Interaction extends Component {
  constructor(
    public radius: number = 16,
    public onInteract?: () => void
  ) { super(); }
}
