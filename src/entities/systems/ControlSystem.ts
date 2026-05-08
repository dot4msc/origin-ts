import { System, World, Entity } from '../ECS';
import { PlayerControl, Kinematics } from '../Components';
import { input } from '../../core/Input';

export class ControlSystem extends System {
  public update(entities: Set<Entity>, world: World, dt: number): void {
    input.update();

    for (const entity of entities) {
      const control = world.getComponent(entity, PlayerControl);
      const kinematics = world.getComponent(entity, Kinematics);

      if (control && kinematics) {
        kinematics.vx = input.axisX * control.speed;
        kinematics.vy = input.axisY * control.speed;
      }
    }
  }
}
