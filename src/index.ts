import { DrawingService } from './services/DrawingService';
import { ProjectionService } from './services/ProjectionService';
import { KeyboardController } from './controllers/KeyboardController';
import { space as city } from './fixtures/city';
import { Camera } from './model/Camera';
import { Point } from './model/Point';
import { CityBuilder } from './services/CityBuilder';
import { Sizes } from './model/Sizes';

const canvas: HTMLCanvasElement | null = document.querySelector('canvas');

if (canvas === null) {
  throw new Error('No canvas element found');
}

const projectionService = new ProjectionService();
const drawingService = new DrawingService(canvas, projectionService);
const cityBuilder = new CityBuilder(new Sizes(50, 100, 100));
const keyboardController = new KeyboardController(
  new Camera(new Point(0, 0, 0)),
  cityBuilder,
  drawingService,
);
