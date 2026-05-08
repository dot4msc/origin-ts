export class Sprite {
  constructor(
    public image: HTMLImageElement,
    public width: number,
    public height: number,
    public frame: number = 0
  ) {}

  public draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    flipX: boolean = false
  ): void {
    const cols = Math.floor(this.image.width / this.width);
    const sx = (this.frame % cols) * this.width;
    const sy = Math.floor(this.frame / cols) * this.height;

    ctx.save();
    if (flipX) {
      ctx.translate(x + this.width, y);
      ctx.scale(-1, 1);
      ctx.drawImage(
        this.image,
        sx, sy, this.width, this.height,
        0, 0, this.width, this.height
      );
    } else {
      ctx.drawImage(
        this.image,
        sx, sy, this.width, this.height,
        Math.round(x), Math.round(y), this.width, this.height
      );
    }
    ctx.restore();
  }
}
