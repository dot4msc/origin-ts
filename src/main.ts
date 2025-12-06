import { Game } from './Classes/Game';
const canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
const game:Game = new Game(canvas);

canvas.addEventListener("touchmove", (event) => {
  event.preventDefault();
})

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
})

game.start();