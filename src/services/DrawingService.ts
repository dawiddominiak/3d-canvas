import * as _ from "lodash";

import { Camera } from "../model/Camera";
import { Space } from "../model/Space";
import { ProjectionService } from "./ProjectionService";

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

    const shapes = this.projectionService.project(space, camera);
    const transfromationMatrix = this.projectionService.getTransformationMatrix();
    camera.updateTransformationMetrics(transfromationMatrix);
    const sortedShapes = _.orderBy(shapes, ['distance'], ['desc']);

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    sortedShapes.forEach((shape, j) => {
      const points = shape.getPointsInDrawingOrder();

      context.beginPath();

      points.forEach((point, i) => {
        if (i === 0) {
          context.moveTo(this.centerWidth + point.x, this.centerHeight + point.y);
        } else {
          context.lineTo(this.centerWidth + point.x, this.centerHeight + point.y);
        }
      });

      if (points[0]) {
        context.lineTo(this.centerWidth + points[0].x, this.centerHeight + points[0].y);
      }

      if (localStorage.getItem('hideEdges') === 'true') {
        context.fillStyle = shape.color;
        context.fill();
      }

      context.stroke();
      context.closePath();
    });
  }


}
