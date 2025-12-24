import type { Sprite } from "./Sprite";
import type { World } from "./World";

/** 
 * RenderManager: Manages canvas and image rendering
 * members:
 *  private context: canvas context where the element should be rendering
 *  private loadedImages: Map with string id and HTMLImageElement value for storing loaded images in the game
 *
 * **/
export class RenderManager {

  private context:CanvasRenderingContext2D; // canvas context where the element should be rendering
  private loadedImages: Map<string, HTMLImageElement> = new Map(); // Map with string id and HTMLImageElement value for storing loaded images in the game

  constructor(context:CanvasRenderingContext2D){
    this.context = context; // initialize context
    this.resize(); // call resize()
    window.addEventListener("resize", () => this.resize()); // update canvas resize on window resize
  }

  /**
   * private resize(): canvas when necessary
   * 
   */
  private resize():void {
    //Get canvas from context 
    const canvas = this.context.canvas;

    //Change width and height according to window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //Apply this to pixel art images
    this.context.imageSmoothingEnabled = false;
  }


  /**
   * private getImage(imagePath: string): returns given image path as a loaded image element
   * 
   */
  private getImage(imagePath: string): HTMLImageElement {
    // Check if image exists in loadedImages if it is, return that specific image
    if(this.loadedImages.has(imagePath)) {
      return this.loadedImages.get(imagePath)!;
    }

    // Set the image and added to the loadedImages Map
    const img = new Image();
    img.src = imagePath;
    this.loadedImages.set(imagePath, img);

    return img;
  }
  
  public render(worlds: World[]) : void{
    const canvas = this.context.canvas;
    this.context.clearRect(0,0,canvas.width/4,canvas.height/4);

    worlds.forEach((world) => {
      world.sprites.forEach(sprite => {
        sprite.draw(this.context);
      })
    })
  }

}