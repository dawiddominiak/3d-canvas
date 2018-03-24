import { Point } from './Point';

export class Camera {
  constructor(private point: Point) { }

  get x() {
    return this.point.x;
  }

  get y() {
    return this.point.y;
  }

  get z() {
    return this.point.z;
  }

  public moveLeft() {
    this.point.moveTo(this.x + 1, this.y, this.z);
  }

  public moveRight() {
    this.point.moveTo(this.x - 1, this.y, this.z);
  }

  public moveTop() {
    this.point.moveTo(this.x, this.y + 1, this.z);
  }

  public moveBottom() {
    this.point.moveTo(this.x, this.y - 1, this.z);
  }

  public moveForward() {
    this.point.moveTo(this.x, this.y, this.z - 1);
  }

  public moveBack() {
    this.point.moveTo(this.x, this.y, this.z + 1);
  }
}
