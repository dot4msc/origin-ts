export class RenderManager {
  private canvas:HTMLCanvasElement;
  private context:CanvasRenderingContext2D;
  private loadedImages: Map<string, HTMLImageElement> = new Map();

  constructor(canvas:HTMLCanvasElement){
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  private resize():void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

    const img = this.getImage(imagePath)

    if(img.complete) {
      this.context.drawImage(img,x,y,img.width /4, img.width / 4)
    }

  }

}