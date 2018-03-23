import { _2DPoint } from './_2DPoint';

export class _2DLineSegment {
  constructor(public readonly start: _2DPoint, public readonly end: _2DPoint) { }

  public getPoints() {
    return [
      this.start,
      this.end,
    ];
  }
}
