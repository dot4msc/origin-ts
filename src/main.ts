import { Game } from './Classes/Game';
import { SampleWorld } from './Tests/SampleWorld';

const canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
const game:Game = new Game(canvas, [new SampleWorld()]);

canvas.addEventListener("touchmove", (event) => {
  event.preventDefault();
})

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
})

game.start();