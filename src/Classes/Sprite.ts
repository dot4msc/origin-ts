// import type { Renderable } from "../Interfaces/Renderable";
// import { Vector2 } from "./Vector2";


export abstract class Sprite {
  private id: string;
  private active: boolean;
  private visible: boolean;

  protected x: number;
  protected y: number;
  constructor(id: string, x: number, y: number, t: string){
    this.id = id;
    this.active = true;
    this.visible = true;
    this.x = x;
    this.y = y;
  }
  
  public abstract update(delta?: number, time?: number): void;

  public draw(context: CanvasRenderingContext2D) {
    context.clearRect(0,0, context.canvas.width, context.canvas.height);
    context.fillStyle = "blue";
    context.fillRect(this.x, this.y ,50,50);
    
  }

}