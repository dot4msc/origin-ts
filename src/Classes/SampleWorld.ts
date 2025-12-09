import { World } from "./World";

export class SampleWorld extends World {
  update(delta?:number, time?: number, ): void {
    if(!time) {
      time = performance.now()
    }
    console.log(time, delta);
  }
}