import { LineSegment } from './LineSegment';
import * as _ from 'lodash';
import { Transformable } from './Transformable';
import { Cloneable } from './Cloneable';

export class Shape implements Transformable, Cloneable<Shape> {
  constructor(
    public readonly lineSegments: LineSegment[],
    public readonly color: string = 'white',
  ) { }

  public getLineSegments() {
    return this.lineSegments;
  }

  public getPoints() {
    return _.uniq(
      _.flatten(
        this.lineSegments
        .map(lineSegment => lineSegment.getPoints()),
      ),
    );
  }

  public clone() {
    return new Shape(
      this.lineSegments
        .map(lineSegment => lineSegment.clone()),
      this.color,
    );
  }
}
