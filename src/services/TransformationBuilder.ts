import * as _ from "lodash";
import * as mathjs from "mathjs";

import { Cloneable } from "../model/Cloneable";
import { Point } from "../model/Point";
import { Transformable } from "../model/Transformable";

export class TransformationBuilder<T> {
  private toTransform: Transformable & T;
  private finalMatrix: mathjs.Matrix;

  constructor(toTransform: Transformable & T) {
    this.toTransform = toTransform;
    this.finalMatrix = mathjs.matrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
  }

  public transform(transformationMatrix: mathjs.Matrix, normalize = true) {
    this.finalMatrix = mathjs.multiply(this.finalMatrix, transformationMatrix);
    const allPoints = this.toTransform.getPoints();
    allPoints.forEach((point) => {
      const pointAsMatrix = mathjs.multiply(transformationMatrix, point.asMatrix());
      const valuesBeforeNormalization = _.flattenDeep(
        pointAsMatrix.valueOf() as ArrayLike<number>,
      ) as number[];
      let [x, y, z, w] = valuesBeforeNormalization;

      if (normalize) {
        [x, y, z, w] = this.normalize(valuesBeforeNormalization);
      }
      point.moveTo(x, y, z);
    });
  }

  private normalize([x, y, z, w]: number[]) {
    return [x / w, y / w, w, 1];
  }

  public getFinalMatrix() {
    return this.finalMatrix;
  }

  public value() {
    return this.toTransform;
  }
}
