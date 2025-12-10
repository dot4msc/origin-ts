import { RenderManager } from "./RenderManager";
import lambda from "../Lambda_V1_1024.png";
import type { World } from "./World";

let pos = 0;

export class Game {

  private renderManager: RenderManager;
  private worlds: Array<new () => World>;
  private lastTime : number;
  private lag: number;
  private readonly TIMESTEP:number = 1/60;

  constructor(canvas: HTMLCanvasElement, worlds: Array<new () => World>){
    this.lastTime = 0;
    this.renderManager = new RenderManager(canvas.getContext("2d")!);
    this.loop = this.loop.bind(this);
    this.worlds = [...worlds];
    this.lag = 0;
  }

  public start() {
    requestAnimationFrame(this.loop)
  }

  private loop(time: number = performance.now()) {
    if(this.lastTime === 0) this.lastTime = time

    const delta = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.worlds.forEach(World => {
      const world = new World;
      world.update(delta);
    });

    pos += 50 * delta;

    this.renderManager.render(pos,100, lambda);
    
    requestAnimationFrame(this.loop);
  }

}