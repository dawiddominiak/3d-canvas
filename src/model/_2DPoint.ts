export class _2DPoint {
  constructor(public readonly x: number, public readonly y: number) { }

  public asArray() {
    return [
      this.x,
      this.y,
    ];
  }
}
