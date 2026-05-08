import { assets } from '../core/AssetLoader';

export interface TiledLayer {
  data: number[];
  width: number;
  height: number;
  name: string;
  visible: boolean;
}

export interface TiledTileset {
  firstgid: number;
  image: string;
  tilewidth: number;
  tileheight: number;
  columns: number;
  tiles?: { id: number; properties?: { name: string; type: string; value: any }[] }[];
}

export interface TiledMap {
  width: number;
  height: number;
  tilewidth: number;
  tileheight: number;
  layers: TiledLayer[];
  tilesets: TiledTileset[];
}

export class Tilemap {
  private tilesetImages: Map<number, HTMLImageElement> = new Map();

  constructor(private mapData: TiledMap) {}

  public async loadTilesets(): Promise<void> {
    for (const ts of this.mapData.tilesets) {
      // Assuming tileset images are in public/tilesets/
      const img = await assets.loadImage(ts.image, `/tilesets/${ts.image}`);
      this.tilesetImages.set(ts.firstgid, img);
    }
  }

  public render(ctx: CanvasRenderingContext2D, layerName?: string): void {
    const layers = layerName 
      ? this.mapData.layers.filter(l => l.name === layerName)
      : this.mapData.layers;

    for (const layer of layers) {
      if (!layer.visible) continue;

      for (let i = 0; i < layer.data.length; i++) {
        const gid = layer.data[i];
        if (gid === 0) continue; // 0 is empty

        const x = (i % layer.width) * this.mapData.tilewidth;
        const y = Math.floor(i / layer.width) * this.mapData.tileheight;

        this.drawTile(ctx, gid, x, y);
      }
    }
  }

  public isSolid(worldX: number, worldY: number): boolean {
    const tileX = Math.floor(worldX / this.mapData.tilewidth);
    const tileY = Math.floor(worldY / this.mapData.tileheight);

    if (tileX < 0 || tileX >= this.mapData.width || tileY < 0 || tileY >= this.mapData.height) {
      return true; // Out of bounds is solid
    }

    // Check "Collision" layer
    const collisionLayer = this.mapData.layers.find(l => l.name === 'Collision');
    if (collisionLayer) {
      const gid = collisionLayer.data[tileY * collisionLayer.width + tileX];
      if (gid !== 0) return true;
    }

    return false;
  }

  private drawTile(ctx: CanvasRenderingContext2D, gid: number, x: number, y: number): void {
    // Find the correct tileset for this GID
    let activeTileset: TiledTileset | null = null;
    let firstgid = 0;

    for (const ts of this.mapData.tilesets) {
      if (gid >= ts.firstgid) {
        activeTileset = ts;
        firstgid = ts.firstgid;
      }
    }

    if (!activeTileset) return;

    const img = this.tilesetImages.get(firstgid);
    if (!img) return;

    const localId = gid - firstgid;
    const sx = (localId % activeTileset.columns) * activeTileset.tilewidth;
    const sy = Math.floor(localId / activeTileset.columns) * activeTileset.tileheight;

    ctx.drawImage(
      img,
      sx, sy, activeTileset.tilewidth, activeTileset.tileheight,
      Math.round(x), Math.round(y), activeTileset.tilewidth, activeTileset.tileheight
    );
  }
}
