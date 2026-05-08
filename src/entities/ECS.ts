export type Entity = number;

export abstract class Component {
  // Base class for all components
}

// Helper for component constructors
export type ComponentType<T extends Component> = new (...args: any[]) => T;

export class World {
  private nextEntityId: Entity = 0;
  private entities: Set<Entity> = new Set();
  private components: Map<ComponentType<any>, Map<Entity, any>> = new Map();
  private systems: System[] = [];

  public createEntity(): Entity {
    const id = this.nextEntityId++;
    this.entities.add(id);
    return id;
  }

  public destroyEntity(entity: Entity): void {
    this.entities.delete(entity);
    for (const store of this.components.values()) {
      store.delete(entity);
    }
  }

  public addComponent<T extends Component>(entity: Entity, component: T): void {
    const type = component.constructor as ComponentType<T>;
    if (!this.components.has(type)) {
      this.components.set(type, new Map());
    }
    this.components.get(type)!.set(entity, component);
  }

  public getComponent<T extends Component>(entity: Entity, type: ComponentType<T>): T | undefined {
    return this.components.get(type)?.get(entity);
  }

  public hasComponent(entity: Entity, type: ComponentType<any>): boolean {
    return this.components.get(type)?.has(entity) ?? false;
  }

  public addSystem(system: System): void {
    this.systems.push(system);
  }

  public update(dt: number): void {
    for (const system of this.systems) {
      system.update(this.entities, this, dt);
    }
  }
}

export abstract class System {
  public abstract update(entities: Set<Entity>, world: World, dt: number): void;
}
