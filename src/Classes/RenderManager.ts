export class RenderManager {
  private context:CanvasRenderingContext2D;
  private loadedImages: Map<string, HTMLImageElement> = new Map();

  constructor(context:CanvasRenderingContext2D){
    this.context = context;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  private resize():void {
    const canvas = this.context.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.context.imageSmoothingEnabled = false;
  }

  private getImage(imagePath: string): HTMLImageElement {
    if(this.loadedImages.has(imagePath)) {
      return this.loadedImages.get(imagePath)!;
    }

    const img = new Image();
    img.src = imagePath;
    this.loadedImages.set(imagePath, img);
    return img;
  }

  public render(x:number, y:number, imagePath:string){
    const canvas = this.context.canvas;
    this.context.clearRect(0,0, canvas.width,canvas.height);

    const img = this.getImage(imagePath)

    if(img.complete) {
      this.context.drawImage(img,x,y,img.width/4, img.width/4)
    }

  }

}