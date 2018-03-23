import { DrawingService } from './../services/DrawingService';
import { space } from './../fixtures/city';

const canvas: HTMLCanvasElement | null = document.querySelector('canvas');

if (canvas === null) {
  throw new Error('No canvas element found');
}

const drawingService = new DrawingService(canvas);

export {
  drawingService,
  space,
};
