import { System, World, Entity } from '../ECS';
import { Transform, SpriteComponent } from '../Components';
import { assets } from '../../core/AssetLoader';
import { Sprite } from '../../rendering/Sprite';

export class RenderSystem extends System {
  private sprites: Map<string, Sprite> = new Map();

  constructor(private ctx: CanvasRenderingContext2D) {
    super();
  }

  public update(entities: Set<Entity>, world: World, dt: number): void {
    // Rendering logic has been moved to the render pass.
  }

  public render(entities: Set<Entity>, world: World, interpolation: number): void {
    const renderableEntities = Array.from(entities).filter(id => 
      world.hasComponent(id, Transform) && world.hasComponent(id, SpriteComponent)
    );

    renderableEntities.sort((a, b) => {
      const tA = world.getComponent(a, Transform)!;
      const tB = world.getComponent(b, Transform)!;
      return tA.y - tB.y;
    });

    for (const entity of renderableEntities) {
      const transform = world.getComponent(entity, Transform)!;
      const spriteComp = world.getComponent(entity, SpriteComponent)!;

      let sprite = this.sprites.get(spriteComp.spriteSheet);
      
      if (!sprite) {
        const img = assets.getImage(spriteComp.spriteSheet);
        sprite = new Sprite(img, 16, 16);
        this.sprites.set(spriteComp.spriteSheet, sprite);
      }

      // Sync frame from component
      sprite.frame = spriteComp.currentFrame;
      
      sprite.draw(this.ctx, transform.x - 8, transform.y - 8);
    }
  }
}
