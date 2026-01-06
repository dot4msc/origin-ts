export class Input {
  private keys = new Set<string>();

  constructor(){
    window.addEventListener("keydown", (ev: KeyboardEvent) => {
      this.keys.add(ev.key);
    })

    window.addEventListener("keyup", (ev: KeyboardEvent) => {
      this.keys.delete(ev.key);
    })
  }

  public isDown(key: string) {
    return this.keys.has(key);
  }
}