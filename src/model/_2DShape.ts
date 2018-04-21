import convexHull = require('convex-hull');
import { _2DPoint } from './_2DPoint';

export class _2DShape {
  constructor(public readonly points: _2DPoint[]) { }

  public getPointsInDrawingOrder() {
    const path = convexHull(
      this.points
        .map(point => point.asArray()),
    )
      .map(([pointIndex]) => pointIndex);

    const sortedPoints: _2DPoint[] = [];

    path.forEach((pointIndex) => {
      sortedPoints.push(this.points[pointIndex]);
    });

    return sortedPoints;
  }
}
