import { DrawingService } from './services/DrawingService';
import { ProjectionService } from './services/ProjectionService';
import { KeyboardController } from './controllers/KeyboardController';
import { space as city } from './fixtures/city';
import { Camera } from './model/Camera';
import { Point } from './model/Point';
import { CityBuilder } from './services/CityBuilder';
import { Sizes } from './model/Sizes';
import { Rotation } from './model/Rotation';

const canvas: HTMLCanvasElement | null = document.querySelector('canvas');

if (canvas === null) {
  throw new Error('No canvas element found');
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

const projectionService = new ProjectionService();
const drawingService = new DrawingService(canvas, projectionService);
const cityBuilder = new CityBuilder(new Sizes(50, 100, 100));
const keyboardController = new KeyboardController(
  new Camera(new Point(0, 0, 0), new Rotation(0, 0, 0), 1),
  cityBuilder,
  drawingService,
);
