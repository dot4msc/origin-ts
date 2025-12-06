import { RenderManager } from "./RenderManager";
import lambda from "../Lambda_V1_1024.png";

let pos = 0;

export class Game {
  private renderManager: RenderManager;
  private lastTime : number;

  constructor(canvas: HTMLCanvasElement){
    this.lastTime = 0;
    this.renderManager = new RenderManager(canvas);
    this.loop = this.loop.bind(this);
  }

  public start() {
    requestAnimationFrame(this.loop)
  }

  public loop(time: number = performance.now()) {
    if(this.lastTime === 0) this.lastTime = time

    const delta = (time - this.lastTime) / 1000;
    this.lastTime = time;

    pos += 50 * delta;
    this.renderManager.render(pos,100, lambda)
    requestAnimationFrame(this.loop);
  }
}