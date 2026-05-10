import { Display } from '../rendering/Display';
import { assets } from '../core/AssetLoader';
import { World, Entity } from '../entities/ECS';
import * as Components from '../entities/Components';
import * as Systems from '../entities/systems';
import { Tilemap } from '../world/Tilemap';
import { input } from '../core/Input';
import { dialogue } from '../ui/DialogueManager';
import { events } from '../core/Events';
import { saveSystem } from '../core/SaveSystem';
import { GAME_WIDTH, GAME_HEIGHT } from '../core/Constants';

export class Game {
  private world: World;
  private tilemap?: Tilemap;
  private player?: Entity;
  private timeState: 'day' | 'sunset' | 'night' = 'day';

  constructor(private display: Display) {
    this.world = new World();
    this.world.addSystems({
      control: new Systems.ControlSystem(),
      movement: new Systems.MovementSystem(),
      animation: new Systems.AnimationSystem(),
      render: new Systems.RenderSystem(this.display.ctx)
    });

    this.display.setShader('shader-crt', true);
    this.display.setShader('shader-vignette', true);
  }

  public async init(): Promise<void> {
    await assets.loadImage('player', '/player.png');

    this.player = this.world.createEntity();
    this.world.addComponents(this.player, {
      transform: new Components.Transform(160, 90),
      kinematics: new Components.Kinematics(),
      collider: new Components.BoxCollider(8, 8, 0, 4),
      control: new Components.PlayerControl(80),
      sprite: new Components.SpriteComponent('player'),
      stats: new Components.Stats({ current: 100, max: 100 }, { current: 50, max: 50 }),
      inventory: new Components.Inventory()
    });

    // Trigger Entrance Event
    events.playDialogue([
      { speaker: 'System', text: 'Welcome to the origin-ts Engine.' },
      { speaker: 'origin-ts', text: 'You can move with WASD, change time with N, and save with F5.' }
    ]);
  }

  public update(dt: number): void {
    // Priority: If dialogue is open, it consumes 'Space' to advance
    if (dialogue.isVisible) {
      if (input.isJustPressed('Space') || input.isJustPressed('Enter')) {
        dialogue.next();
      }
      dialogue.update(dt);
      return; // Freeze movement during dialogue
    }

    this.world.update(dt);

    // RPG Logic
    if (input.isJustPressed('KeyN')) {
      this.timeState = this.timeState === 'day' ? 'sunset' : (this.timeState === 'sunset' ? 'night' : 'day');
      this.display.setTimeOfDay(this.timeState);
    }

    if (input.isJustPressed('F5') && this.player !== undefined) {
      saveSystem.saveGame(this.world, this.player);
    }
  }

  public render(interpolation: number): void {
    this.display.clear('#141414');
    if (this.tilemap) this.tilemap.render(this.display.ctx, 'Background');

    // Draw world entities
    this.world.render(interpolation);

    // Dialogue is drawn on top of the world
    dialogue.render(this.display.ctx, GAME_WIDTH, GAME_HEIGHT);
  }
}
