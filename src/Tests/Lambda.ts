import { Sprite } from "../Classes/Sprite";

export class Lambda extends Sprite {
  constructor(x: number, y: number, texture: string) {
    super("lambda", x, y, texture);
  }

  public update(delta?: number, time?: number): void {
    if(!time) {
      time = performance.now();
    }
    this.x += 200 * delta!;
    console.log("Lambda", delta, time, this.x);
  }
}