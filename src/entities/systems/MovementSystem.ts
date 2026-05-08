import { System, World, Entity } from '../ECS';
import { Transform, Kinematics, BoxCollider } from '../Components';
import { Tilemap } from '../../world/Tilemap';

export class MovementSystem extends System {
  constructor(private tilemap?: Tilemap) {
    super();
  }

  public update(entities: Set<Entity>, world: World, dt: number): void {
    for (const entity of entities) {
      const transform = world.getComponent(entity, Transform);
      const kinematics = world.getComponent(entity, Kinematics);
      const collider = world.getComponent(entity, BoxCollider);

      if (transform && kinematics) {
        if (!collider || !this.tilemap) {
          transform.x += kinematics.vx * dt;
          transform.y += kinematics.vy * dt;
          continue;
        }

        // Horizontal
        const nextX = transform.x + kinematics.vx * dt;
        if (!this.checkTileCollision(nextX, transform.y, collider)) {
          transform.x = nextX;
        }

        // Vertical
        const nextY = transform.y + kinematics.vy * dt;
        if (!this.checkTileCollision(transform.x, nextY, collider)) {
          transform.y = nextY;
        }
      }
    }
  }

  private checkTileCollision(x: number, y: number, collider: BoxCollider): boolean {
    if (!this.tilemap) return false;
    const left = x + collider.offsetX - collider.width / 2;
    const right = x + collider.offsetX + collider.width / 2;
    const top = y + collider.offsetY - collider.height / 2;
    const bottom = y + collider.offsetY + collider.height / 2;

    return (
      this.tilemap.isSolid(left, top) ||
      this.tilemap.isSolid(right, top) ||
      this.tilemap.isSolid(left, bottom) ||
      this.tilemap.isSolid(right, bottom)
    );
  }
}
