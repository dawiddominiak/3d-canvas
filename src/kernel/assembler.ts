import { DrawingService } from './../services/DrawingService';

const canvas: HTMLCanvasElement | null = document.querySelector('canvas');

if (canvas === null) {
  throw new Error('No canvas element found');
}

const drawingService = new DrawingService(canvas);

export {
  drawingService,
};
