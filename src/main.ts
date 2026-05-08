import { Engine } from './core/Engine';
import { Display } from './rendering/Display';
import { Game } from './game/Game';

async function bootstrap() {
  const display = new Display('app');
  const game = new Game(display);
  
  await game.init();

  const engine = new Engine(
    (dt: number) => game.update(dt),
    (interpolation: number) => game.render(interpolation)
  );

  engine.start();
  console.log('Origin Engine Started Successfully');
}

bootstrap().catch(err => {
  console.error('Failed to start engine:', err);
});
