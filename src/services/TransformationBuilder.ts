import { Transformable } from '../model/Transformable';
import { Cloneable } from '../model/Cloneable';
import * as mathjs from 'mathjs';
import { Point } from '../model/Point';
import * as _ from 'lodash';

export class TransformationBuilder<T> {
  private toTransform: Transformable & T;

  constructor(toTransform: Transformable & T) {
    this.toTransform = toTransform;
  }

  public transform(transformationMatrix: mathjs.Matrix, normalize = true) {
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

  public value() {
    return this.toTransform;
  }
}
