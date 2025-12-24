import { Lambda } from "../Tests/Lambda";
import { World } from "./World";

export class SampleWorld extends World {
  constructor() {
    super("sample-world", [new Lambda(0,0, "lambda")]);
  }
  update(delta?:number, time?: number, ): void {
    if(!time) {
      time = performance.now()
    }
    this.sprites.forEach((sprite) => {
      sprite.update(delta, time);
    })
    console.log(time, delta);
  }
}