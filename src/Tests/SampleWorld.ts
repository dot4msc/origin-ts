import { Lambda } from "./Lambda";
import { World } from "../Classes/World";
import type { Input } from "../Classes/Input";

export class SampleWorld extends World {
  constructor() {
    super("sample-world", [new Lambda(0,0, "lambda")]);
  }
  update(input: Input, delta?:number, time?: number, ): void {
    if(!time) {
      time = performance.now()
    }
    this.sprites.forEach((sprite) => {
      sprite.update(input, delta, time);
    })
    //console.log(time, delta);
  }
}