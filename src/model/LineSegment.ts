import { Point } from './Point';

export class LineSegment {
  constructor(public readonly start: Point, public readonly end: Point) { }

  public getPoints() {
    return [
      this.start,
      this.end,
    ];
  }
}
