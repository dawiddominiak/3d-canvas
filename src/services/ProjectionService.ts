import * as _ from "lodash";
import * as mathjs from "mathjs";

import { _2DLineSegment } from "../model/_2DLineSegment";
import { _2DPoint } from "../model/_2DPoint";
import { _2DShape } from "../model/_2DShape";
import { Camera } from "../model/Camera";
import { LineSegment } from "../model/LineSegment";
import { Shape } from "../model/Shape";
import { Space } from "../model/Space";
import { cos, sin } from "../utils/math";
import { TransformationBuilder } from "./TransformationBuilder";

export class ProjectionService {
  private transformationMatrix: mathjs.Matrix;

  constructor() {
    this.transformationMatrix = mathjs.matrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
  }

  project(space: Space, camera: Camera) {
    const shapes = this
      .transform(space, camera)
      .getShapes();

    const flatShapes = shapes
      .map(shape => new _2DShape(
        shape.getPoints()
          .map(point => new _2DPoint(point.x, point.y)),
        this.calculateDistance(shape, camera),
        shape.color,
      ));

    return flatShapes;
  }

  calculateDistance(shape: Shape, camera: Camera) {
    const points = shape.getPoints()
      .map(point => point.getOriginalCoordinates());

    const centerOfMass = points
      .reduce(
        (center, point) => [
          center[0] + point.x,
          center[1] + point.y,
          center[2] + point.z,
        ],
        [0, 0, 0],
      )
      .map(sum => sum / points.length);

    const distance = Math.sqrt(
      Math.pow(centerOfMass[0] + camera.x, 2)
      + Math.pow(centerOfMass[1] + camera.y, 2)
      + Math.pow(centerOfMass[2] + camera.z, 2),
    );

    return distance;
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
        [0, 0, 0.001, 0],
      ]));

    this.transformationMatrix = transformationBuilder.getFinalMatrix();

    return transformationBuilder.value();
  }

  public getTransformationMatrix() {
    return this.transformationMatrix;
  }
}
