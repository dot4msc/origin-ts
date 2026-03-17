const canvas: HTMLCanvasElement = document.getElementById("main") as HTMLCanvasElement;
//const game: Game = new Game(canvas);

canvas.addEventListener("touchmove", (event) => {
  event.preventDefault();
});

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
});

//game.start();