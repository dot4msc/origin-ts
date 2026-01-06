import { RenderManager } from "./RenderManager";
import lambda from "../Lambda_V1_1024.png";
import type { World } from "./World";
import { Sprite } from "./Sprite";
import { Input } from "./Input";

let pos = 0;

export class Game {

  private renderManager: RenderManager;
  private worlds: World[];
  private lastTime : number;
  private lag: number;
  private input: Input;
  private readonly TIMESTEP:number = 1/60;

  constructor(canvas: HTMLCanvasElement, worlds: World[]){
    this.lastTime = 0;
    this.renderManager = new RenderManager(canvas.getContext("2d")!);
    this.loop = this.loop.bind(this);
    this.worlds = [...worlds];
    this.lag = 0;
    this.input = new Input();

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      console.log(e.key);
    })
  }

  public start() {
    console.log("enter start");
    requestAnimationFrame(this.loop)
  }

  private loop(time: number = performance.now()) {
    if(this.lastTime === 0) this.lastTime = time

    const delta = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.lag += delta;
    
    while(this.lag >= this.TIMESTEP){
      this.worlds.forEach(world => {
        world.update(this.input, delta);
      });
      this.lag -= this.TIMESTEP;
    }

    this.renderManager.render(this.worlds); //<-
    
    requestAnimationFrame(this.loop);
  }

}