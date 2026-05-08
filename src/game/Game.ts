import { Display } from '../rendering/Display';
import { assets } from '../core/AssetLoader';
import { World, Entity } from '../entities/ECS';
import { 
  Transform, 
  Kinematics, 
  SpriteComponent, 
  PlayerControl, 
  BoxCollider, 
  Stats, 
  Inventory 
} from '../entities/Components';
import { ControlSystem } from '../entities/systems/ControlSystem';
import { MovementSystem } from '../entities/systems/MovementSystem';
import { RenderSystem } from '../entities/systems/RenderSystem';
import { AnimationSystem } from '../entities/systems/AnimationSystem';
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
    this.world.addSystem(new ControlSystem());
    this.world.addSystem(new MovementSystem());
    this.world.addSystem(new AnimationSystem());
    this.world.addSystem(new RenderSystem(this.display.ctx));

    this.display.setShader('shader-crt', true);
    this.display.setShader('shader-vignette', true);
  }

  public async init(): Promise<void> {
    await assets.loadImage('player', '/player.png');

    this.player = this.world.createEntity();
    this.world.addComponent(this.player, new Transform(160, 90));
    this.world.addComponent(this.player, new Kinematics());
    this.world.addComponent(this.player, new BoxCollider(8, 8, 0, 4));
    this.world.addComponent(this.player, new PlayerControl(80));
    this.world.addComponent(this.player, new SpriteComponent('player'));
    this.world.addComponent(this.player, new Stats({ current: 100, max: 100 }, { current: 50, max: 50 }));
    this.world.addComponent(this.player, new Inventory());

    // Trigger Entrance Event
    events.playDialogue([
      { speaker: 'System', text: 'Welcome to the Origin Engine.' },
      { speaker: 'Origin', text: 'You can move with WASD, change time with N, and save with F5.' }
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

    // Dialogue is drawn on top of the world
    dialogue.render(this.display.ctx, GAME_WIDTH, GAME_HEIGHT);
  }
}
