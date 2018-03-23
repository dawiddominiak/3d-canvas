import { Camera } from './../model/Camera';
import { Space } from '../model/Space';
import { LineSegment } from '../model/LineSegment';
import { _2DLineSegment } from '../model/_2DLineSegment';
import { _2DPoint } from '../model/_2DPoint';

export class ProjectionService {
  project(space: Space, camera: Camera) {
    const lineSegments = space.getLineSegments();
    const flatLineSegments = lineSegments
      .map(lineSegment => new _2DLineSegment(
        new _2DPoint(lineSegment.start.x, lineSegment.start.z),
        new _2DPoint(lineSegment.end.x, lineSegment.end.z),
      ));

    return flatLineSegments;
  }
}
