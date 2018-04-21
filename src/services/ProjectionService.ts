import { Camera } from './../model/Camera';
import { Space } from '../model/Space';
import { LineSegment } from '../model/LineSegment';
import { _2DLineSegment } from '../model/_2DLineSegment';
import { _2DPoint } from '../model/_2DPoint';
import { TransformationBuilder } from './TransformationBuilder';
import * as mathjs from 'mathjs';
import { sin, cos } from './../utils/math';
import { _2DShape } from '../model/_2DShape';

export class ProjectionService {
  project(space: Space, camera: Camera) {
    const shapes = this
      .transform(space, camera)
      .getShapes();

    const flatShapes = shapes
      .map(shape => new _2DShape(
        shape.getPoints()
          .map(point => new _2DPoint(point.x, point.y)),
      ));

    return flatShapes;
  }

  transform(space: Space, camera: Camera) {
    const transformationBuilder = new TransformationBuilder<Space>(space);
    // Translation
    transformationBuilder
      .transform(
        mathjs.matrix([
          [1, 0, 0, camera.x],
          [0, 1, 0, camera.y],
          [0, 0, 1, camera.z],
          [0, 0, 0, 1],
        ]),
        false,
      );

    // Rotation OX
    transformationBuilder
      .transform(
        mathjs.matrix([
          [1, 0, 0, 0],
          [0, cos(camera.ox), -sin(camera.ox), 0],
          [0, sin(camera.ox), cos(camera.ox), 0],
          [0, 0, 0, 1],
        ]),
        false,
      );

    // Rotation OY
    transformationBuilder
      .transform(
        mathjs.matrix([
          [cos(camera.oy), 0, sin(camera.oy), 0],
          [0, 1, 0, 0],
          [-sin(camera.oy), 0, cos(camera.oy), 0],
          [0, 0, 0, 1],
        ]),
        false,
      );

    // Rotation OZ
    transformationBuilder
      .transform(
        mathjs.matrix([
          [cos(camera.oz), -sin(camera.oz), 0, 0],
          [sin(camera.oz), cos(camera.oz), 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1],
        ]),
        false,
      );

    // Perspective & zoom
    transformationBuilder
      .transform(mathjs.matrix([
        [camera.zoom, 0, 0, 0],
        [0, camera.zoom, 0, 0],
        [0, 0, camera.zoom, 0],
        [0, 0, 0.007, 0],
      ]));

    return transformationBuilder.value();
  }
}
