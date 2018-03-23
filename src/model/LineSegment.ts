import { Point } from './Point';
import { Transformable } from './Transformable';
import { Cloneable } from './Cloneable';

export class LineSegment implements Transformable, Cloneable<LineSegment> {
  constructor(public readonly start: Point, public readonly end: Point) { }

  public getPoints() {
    return [
      this.start,
      this.end,
    ];
  }

  public clone() {
    return new LineSegment(
      this.start.clone(),
      this.end.clone(),
    );
  }
}
