import { World, Entity } from '../entities/ECS';
import { Transform, Stats, Inventory } from '../entities/Components';

export class SaveSystem {
  private SAVE_KEY = 'origin_engine_save_v1';

  public saveGame(world: World, playerEntity: Entity): void {
    const transform = world.getComponent(playerEntity, Transform);
    const stats = world.getComponent(playerEntity, Stats);
    const inventory = world.getComponent(playerEntity, Inventory);

    const saveData = {
      player: {
        x: transform?.x,
        y: transform?.y,
        stats,
        inventory
      },
      timestamp: Date.now()
    };

    localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
    console.log('Game Saved Successfully');
  }

  public loadGame(): any {
    const data = localStorage.getItem(this.SAVE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  }

  public hasSave(): boolean {
    return localStorage.getItem(this.SAVE_KEY) !== null;
  }
}

export const saveSystem = new SaveSystem();
