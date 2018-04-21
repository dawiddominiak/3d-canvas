import { Point } from '../model/Point';
import { LineSegment } from '../model/LineSegment';
import { Shape } from '../model/Shape';
import { _3DObject } from '../model/_3DObject';
import { Sizes } from '../model/Sizes';

export class CuboidBuilder {
  constructor (private readonly sizes: Sizes, private readonly colors: string[] = []) { }

  buildIn(point: Point) {
    const startPoint = point;

    const basePoints = [
      point,
      new Point(point.x + this.sizes.width, point.y, point.z),
      new Point(point.x, point.y, point.z + this.sizes.depth),
      new Point(point.x + this.sizes.width, point.y, point.z + this.sizes.depth),
    ];

    const topPoints = [
      new Point(point.x, point.y + this.sizes.height, point.z),
      new Point(point.x + this.sizes.width, point.y + this.sizes.height, point.z),
      new Point(point.x, point.y + this.sizes.height, point.z + this.sizes.depth),
      new Point(
        point.x + this.sizes.width,
        point.y + this.sizes.height,
        point.z + this.sizes.depth,
      ),
    ];

    const baseEdges = [
      new LineSegment(basePoints[0], basePoints[1]),
      new LineSegment(basePoints[0], basePoints[2]),
      new LineSegment(basePoints[1], basePoints[3]),
      new LineSegment(basePoints[2], basePoints[3]),
    ];

    const topEdges = [
      new LineSegment(topPoints[0], topPoints[1]),
      new LineSegment(topPoints[0], topPoints[2]),
      new LineSegment(topPoints[1], topPoints[3]),
      new LineSegment(topPoints[2], topPoints[3]),
    ];

    const connectors = [
      new LineSegment(basePoints[0], topPoints[0]),
      new LineSegment(basePoints[1], topPoints[1]),
      new LineSegment(basePoints[2], topPoints[2]),
      new LineSegment(basePoints[3], topPoints[3]),
    ];

    const shapes = [
      new Shape(baseEdges, '#DDDDDD'),
      new Shape(topEdges, '#DEDEDE'),
      new Shape(
        [
          baseEdges[0],
          topEdges[0],
          connectors[0],
          connectors[1],
        ],
        '#EEEEEE',
      ),
      new Shape(
        [
          baseEdges[1],
          topEdges[1],
          connectors[0],
          connectors[2],
        ],
        '#FEFEFE',
      ),
      new Shape(
        [
          baseEdges[2],
          topEdges[2],
          connectors[1],
          connectors[3],
        ],
        '#DDEFEE',
      ),
      new Shape(
        [
          baseEdges[3],
          topEdges[3],
          connectors[2],
          connectors[3],
        ],
        '#DDFFEE',
      ),
    ];

    return new _3DObject(shapes);
  }
}
