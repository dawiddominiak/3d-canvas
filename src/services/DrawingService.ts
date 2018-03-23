import { Space } from '../model/Space';
import { Camera } from '../model/Camera';
import { ProjectionService } from './ProjectionService';

export class DrawingService {
  constructor(
    private canvas: HTMLCanvasElement,
    private projectionService: ProjectionService,
  ) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  draw(space: Space, camera: Camera) {
    const context = this.canvas.getContext('2d');

    if (context === null) {
      throw new Error('No 2D context');
    }

    const lines = this.projectionService.project(space, camera);

    console.log(lines);

    lines.forEach((line) => {
      context.beginPath();
      context.moveTo(line.start.x, line.start.y);
      context.lineTo(line.end.x, line.end.y);
      context.stroke();
      context.closePath();
    });
  }
}
