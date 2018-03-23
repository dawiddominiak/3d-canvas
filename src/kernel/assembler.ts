import { DrawingService } from './../services/DrawingService';
import { ProjectionService } from '../services/ProjectionService';

const canvas: HTMLCanvasElement | null = document.querySelector('canvas');

if (canvas === null) {
  throw new Error('No canvas element found');
}

const projectionService = new ProjectionService();
const drawingService = new DrawingService(canvas, projectionService);

export {
  drawingService,
};
