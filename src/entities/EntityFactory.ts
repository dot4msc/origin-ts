import { World, Entity } from './ECS';
import { Transform, Kinematics, SpriteComponent, PlayerControl } from './Components';

export interface PlayerOptions {
  spriteName: string;
  x?: number;
  y?: number;
  speed?: number;
}

export interface EnvironmentOptions {
  spriteName: string;
  x?: number;
  y?: number;
}

export interface PropOptions {
  spriteName: string;
  x: number;
  y: number;
}

/**
 * Abstract Factory Interface
 * Provides an interface for creating families of related or dependent objects
 */
export interface AbstractEntityFactory {
  createPlayer(options: PlayerOptions): Entity;
  createEnvironment(options: EnvironmentOptions): Entity;
  createProp(options: PropOptions): Entity;
}

/**
 * Concrete Factory implementing the Abstract Factory interface
 * Groups the creation logic for our standard RPG game entities
 */
export class DefaultGameFactory implements AbstractEntityFactory {
  constructor(private world: World) {}

  public createPlayer(options: PlayerOptions): Entity {
    const player = this.world.createEntity();
    this.world.addComponents(player, {
      transform: new Transform(options.x ?? 160, options.y ?? 90),
      kinematics: new Kinematics(),
      control: new PlayerControl(options.speed ?? 100),
      sprite: new SpriteComponent(options.spriteName)
    });
    return player;
  }

  public createEnvironment(options: EnvironmentOptions): Entity {
    const env = this.world.createEntity();
    this.world.addComponents(env, {
      transform: new Transform(options.x ?? 160, options.y ?? 90),
      sprite: new SpriteComponent(options.spriteName)
    });
    return env;
  }

  public createProp(options: PropOptions): Entity {
    const prop = this.world.createEntity();
    this.world.addComponents(prop, {
      transform: new Transform(options.x, options.y),
      sprite: new SpriteComponent(options.spriteName)
    });
    return prop;
  }
}
