import { Camera } from './../model/Camera';
import { Space } from '../model/Space';
import { LineSegment } from '../model/LineSegment';
import { _2DLineSegment } from '../model/_2DLineSegment';
import { _2DPoint } from '../model/_2DPoint';
import { TransformationBuilder } from './TransformationBuilder';
import * as mathjs from 'mathjs';

export class ProjectionService {
  project(space: Space, camera: Camera) {
    const lineSegments = this
      .transform(space, camera)
      .getLineSegments();
    const flatLineSegments = lineSegments
      .map(lineSegment => new _2DLineSegment(
        new _2DPoint(lineSegment.start.x, lineSegment.start.y),
        new _2DPoint(lineSegment.end.x, lineSegment.end.y),
      ));

    return flatLineSegments;
  }

  transform(space: Space, camera: Camera) {
    const transformationBuilder = new TransformationBuilder<Space>(space);
    transformationBuilder
      .transform(mathjs.matrix([
        [200, 0, 0, 0],
        [0, 200, 0, 0],
        [0, 0, 200, 0],
        [0, 0, 2, 0],
      ]));

    return transformationBuilder.value();
  }
}
