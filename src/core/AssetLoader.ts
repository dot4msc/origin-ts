export class AssetLoader {
  private images: Map<string, HTMLImageElement> = new Map();
  private jsonData: Map<string, any> = new Map();

  public async loadImage(name: string, url: string): Promise<HTMLImageElement> {
    if (this.images.has(name)) return this.images.get(name)!;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.images.set(name, img);
        resolve(img);
      };
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    });
  }

  public async loadJSON(name: string, url: string): Promise<any> {
    if (this.jsonData.has(name)) return this.jsonData.get(name)!;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load JSON: ${url}`);
    const data = await response.json();
    this.jsonData.set(name, data);
    return data;
  }

  public getImage(name: string): HTMLImageElement {
    const img = this.images.get(name);
    if (!img) throw new Error(`Image not found: ${name}`);
    return img;
  }

  public getJSON(name: string): any {
    const data = this.jsonData.get(name);
    if (!data) throw new Error(`JSON not found: ${name}`);
    return data;
  }
}

export const assets = new AssetLoader();
