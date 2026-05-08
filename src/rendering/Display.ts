import { GAME_WIDTH, GAME_HEIGHT } from '../core/Constants';

export class Display {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  private container: HTMLDivElement;

  constructor(containerId: string) {
    this.container = document.createElement('div');
    this.container.id = 'game-container';
    
    this.canvas = document.createElement('canvas');
    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_HEIGHT;
    this.canvas.id = 'origin-canvas';
    
    // Pixel-perfect settings
    this.canvas.style.imageRendering = 'pixelated';
    this.canvas.style.imageRendering = 'crisp-edges';
    
    const rootContainer = document.getElementById(containerId);
    if (!rootContainer) throw new Error(`Container #${containerId} not found`);
    
    rootContainer.appendChild(this.container);
    this.container.appendChild(this.canvas);

    const ctx = this.canvas.getContext('2d', { alpha: false });
    if (!ctx) throw new Error('Could not get 2D context');
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;

    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  private resize(): void {
    const scaleX = window.innerWidth / GAME_WIDTH;
    const scaleY = window.innerHeight / GAME_HEIGHT;
    const scale = Math.floor(Math.min(scaleX, scaleY)) || 1;

    this.canvas.style.width = `${GAME_WIDTH * scale}px`;
    this.canvas.style.height = `${GAME_HEIGHT * scale}px`;
    
    this.container.style.width = `${GAME_WIDTH * scale}px`;
    this.container.style.height = `${GAME_HEIGHT * scale}px`;
  }

  public setShader(shaderClass: string, active: boolean): void {
    if (active) {
      this.container.classList.add(shaderClass);
    } else {
      this.container.classList.remove(shaderClass);
    }
  }

  public setTimeOfDay(state: 'day' | 'sunset' | 'night'): void {
    this.canvas.classList.remove('sunset', 'night');
    if (state !== 'day') {
      this.canvas.classList.add(state);
    }
  }

  public clear(color: string = '#000000'): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
}
