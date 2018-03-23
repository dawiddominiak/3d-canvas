import { Space } from '../model/Space';
import { Camera } from '../model/Camera';
import { ProjectionService } from './ProjectionService';

export class DrawingService {
  private centerWidth: number;
  private centerHeight: number;

  constructor(
    private canvas: HTMLCanvasElement,
    private projectionService: ProjectionService,
  ) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.centerWidth = this.canvas.width / 2;
    this.centerHeight = this.canvas.height / 2;
  }

  draw(space: Space, camera: Camera) {
    const context = this.canvas.getContext('2d');

    if (context === null) {
      throw new Error('No 2D context');
    }

    const lines = this.projectionService.project(space, camera);

    lines.forEach((line) => {
      context.beginPath();
      context.moveTo(this.centerWidth + line.start.x, this.centerHeight + line.start.y);
      context.lineTo(this.centerWidth + line.end.x, this.centerHeight + line.end.y);
      context.stroke();
      context.closePath();
    });
  }
}
