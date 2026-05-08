export interface DialogueLine {
  speaker: string;
  text: string;
  portrait?: string;
  side?: 'left' | 'right';
}

export class DialogueManager {
  private queue: DialogueLine[] = [];
  private currentLine: DialogueLine | null = null;
  private displayedText: string = '';
  private isTyping: boolean = false;
  private timer: number = 0;
  private charIndex: number = 0;
  private typeSpeed: number = 0.03; // Seconds per character

  public isVisible: boolean = false;

  public startDialogue(lines: DialogueLine[]): void {
    this.queue = [...lines];
    this.isVisible = true;
    this.showNextLine();
  }

  public update(dt: number): void {
    if (!this.isVisible || !this.currentLine) return;

    if (this.isTyping) {
      this.timer += dt;
      if (this.timer >= this.typeSpeed) {
        this.timer = 0;
        this.charIndex++;
        this.displayedText = this.currentLine.text.slice(0, this.charIndex);

        if (this.charIndex >= this.currentLine.text.length) {
          this.isTyping = false;
        }
      }
    }
  }

  public next(): void {
    if (this.isTyping) {
      // Skip typewriter effect
      this.displayedText = this.currentLine?.text || '';
      this.isTyping = false;
    } else {
      this.showNextLine();
    }
  }

  private showNextLine(): void {
    if (this.queue.length === 0) {
      this.isVisible = false;
      this.currentLine = null;
      return;
    }

    this.currentLine = this.queue.shift()!;
    this.displayedText = '';
    this.charIndex = 0;
    this.isTyping = true;
  }

  public render(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    if (!this.isVisible || !this.currentLine) return;

    const boxHeight = 50;
    const padding = 10;
    const y = height - boxHeight - 5;
    const x = 5;
    const boxWidth = width - 10;

    // Draw Box
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, boxWidth, boxHeight);
    ctx.strokeRect(x, y, boxWidth, boxHeight);

    // Draw Speaker Name
    ctx.fillStyle = '#ffcc00';
    ctx.font = '8px monospace';
    ctx.fillText(this.currentLine.speaker, x + padding, y + 12);

    // Draw Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '7px monospace';
    
    // Simple text wrapping (could be improved)
    ctx.fillText(this.displayedText, x + padding, y + 25);
  }
}

export const dialogue = new DialogueManager();
