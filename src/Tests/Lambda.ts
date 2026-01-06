import { Input } from "../Classes/Input";
import { Sprite } from "../Classes/Sprite";

export class Lambda extends Sprite {
  constructor(x: number, y: number, texture: string) {
    super("lambda", x, y, texture);
  }

  public update(input: Input, delta?: number, time?: number): void {

    if(!time) {
      time = performance.now();
    }

    if(input.isDown("s")) {

      this.y += 120 * delta!;
    }
    //console.log("Lambda", delta, time, this.x);
  }
}