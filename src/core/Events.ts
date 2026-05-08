import { dialogue, DialogueLine } from '../ui/DialogueManager';

export class EventSystem {
  private isEventRunning: boolean = false;

  public get active(): boolean {
    return this.isEventRunning;
  }

  /**
   * Triggers a dialogue sequence and waits for it to finish.
   */
  public async playDialogue(lines: DialogueLine[]): Promise<void> {
    this.isEventRunning = true;
    dialogue.startDialogue(lines);

    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (!dialogue.isVisible) {
          clearInterval(check);
          this.isEventRunning = false;
          resolve();
        }
      }, 100);
    });
  }

  /**
   * Generic trigger for map events
   */
  public emit(name: string, data?: any): void {
    console.log(`Event Emitted: ${name}`, data);
    // This can be expanded to a full EventEmitter pattern
  }
}

export const events = new EventSystem();
