import { System, World, Entity } from '../ECS';
import { SpriteComponent } from '../Components';

export class AnimationSystem extends System {
  public update(entities: Set<Entity>, world: World, dt: number): void {
    for (const entity of entities) {
      const sprite = world.getComponent(entity, SpriteComponent);

      if (sprite) {
        const anim = sprite.animations[sprite.currentAnimation];
        if (!anim) continue;

        sprite.animationTimer += dt;
        
        const frameDuration = 1 / anim.speed;
        if (sprite.animationTimer >= frameDuration) {
          sprite.animationTimer = 0;
          
          const nextFrameIndex = (anim.frames.indexOf(sprite.currentFrame) + 1);
          
          if (nextFrameIndex >= anim.frames.length) {
            if (anim.loop) {
              sprite.currentFrame = anim.frames[0];
            }
          } else {
            sprite.currentFrame = anim.frames[nextFrameIndex];
          }
        }
      }
    }
  }
}
