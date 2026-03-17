export class Game {
  private lastTime: number;
  private lag: number;
  private readonly TIMESTEP;

  constructor(canvas: HTMLCanvasElement) {
    this.lastTime = 0;
    this.loop = this.loop.bind(this);
    this.lag = 0;
    this.TIMESTEP = 1/60;
  }

  public start() {
    requestAnimationFrame(this.loop);
  }

  public loop(time: number = performance.now()) {
    if(this.lastTime == 0) this.lastTime = time;

    const delta = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.lag += delta;

    while(this.lag >= this.TIMESTEP) {
      console.log("lagged");
    }

    this.lag -= this.TIMESTEP;

    requestAnimationFrame(this.loop);
  }
}