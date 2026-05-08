import { STEP } from './Constants';

export class Engine {
  private lastTime: number = 0;
  private accumulator: number = 0;
  private isRunning: boolean = false;

  constructor(
    private update: (dt: number) => void,
    private render: (interpolation: number) => void
  ) {}

  public start(): void {
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop);
  }

  public stop(): void {
    this.isRunning = false;
  }

  private loop = (now: number): void => {
    if (!this.isRunning) return;

    let deltaTime = (now - this.lastTime) / 1000;
    if (deltaTime > 0.25) deltaTime = 0.25; // Panic if slow

    this.lastTime = now;
    this.accumulator += deltaTime;

    while (this.accumulator >= STEP) {
      this.update(STEP);
      this.accumulator -= STEP;
    }

    const interpolation = this.accumulator / STEP;
    this.render(interpolation);

    requestAnimationFrame(this.loop);
  };
}
