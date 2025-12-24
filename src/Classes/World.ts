import type { Sprite } from "./Sprite";

export abstract class World {
  private id: string;
  private _sprites!: Sprite[];
  constructor(id: string, sprites: Sprite[]) {
    this.id = id;
    this._sprites = sprites
  }

  get sprites(): Sprite[] {
    return this._sprites;
  }

  set sprites(s: Sprite[]) {
    this._sprites = s;
  }

  abstract update(delta?: number, time?: number): void;
}