export class Input {
  private keys: Set<string> = new Set();
  private prevKeys: Set<string> = new Set();

  constructor() {
    window.addEventListener('keydown', (e) => this.keys.add(e.code));
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
  }

  public update(): void {
    this.prevKeys = new Set(this.keys);
  }

  public isDown(code: string): boolean {
    return this.keys.has(code);
  }

  public isJustPressed(code: string): boolean {
    return this.keys.has(code) && !this.prevKeys.has(code);
  }

  // RPG specific helpers
  public get axisX(): number {
    let x = 0;
    if (this.isDown('ArrowLeft') || this.isDown('KeyA')) x -= 1;
    if (this.isDown('ArrowRight') || this.isDown('KeyD')) x += 1;
    return x;
  }

  public get axisY(): number {
    let y = 0;
    if (this.isDown('ArrowUp') || this.isDown('KeyW')) y -= 1;
    if (this.isDown('ArrowDown') || this.isDown('KeyS')) y += 1;
    return y;
  }
}

export const input = new Input();
