import { Shape } from './Shape';
import * as _ from 'lodash';
import { Transformable } from './Transformable';
import { Cloneable } from './Cloneable';

export class _3DObject implements Transformable, Cloneable<_3DObject> {
  constructor(public readonly shapes: Shape[]) { }

  public getLineSegments() {
    return _.uniq(
      _.flatten(
        this.shapes
          .map(shape => shape.getLineSegments()),
      ),
    );
  }

  public getPoints() {
    return _.uniq(
      _.flatten(
        this.shapes
          .map(shape => shape.getPoints()),
      ),
    );
  }

  public clone() {
    return new _3DObject(
      this.shapes
        .map(shape => shape.clone()),
    );
  }
}
