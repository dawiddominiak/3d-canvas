import { Transformable } from '../model/Transformable';
import { Cloneable } from '../model/Cloneable';
import * as mathjs from 'mathjs';
import { Point } from '../model/Point';

export class TransformationBuilder<T> {
  private toTransform: Transformable & T;

  constructor(toTransform: Transformable & Cloneable<Transformable & T>) {
    this.toTransform = toTransform.clone();
  }

  public transform(transformationMatrix: mathjs.Matrix) {
    const allPoints = this.toTransform.getPoints();
    allPoints.forEach((point) => {
      const pointAsMatrix = mathjs.multiply(transformationMatrix, point.asMatrix());
      const [x, y, z] = pointAsMatrix.valueOf() as number[];
      point.moveTo(x, y, z);
    });
  }

  public value() {
    return this.toTransform;
  }
}
