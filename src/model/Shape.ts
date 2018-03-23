import { LineSegment } from './LineSegment';
import * as _ from 'lodash';

export class Shape {
  constructor(public readonly lineSegments: LineSegment[]) { }

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
}
