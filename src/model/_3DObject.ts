import { Shape } from './Shape';
import * as _ from 'lodash';

export class _3DObject {
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
}
