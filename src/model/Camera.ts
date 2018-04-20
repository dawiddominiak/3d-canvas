import { Point } from './Point';
import { Rotation } from './Rotation';

export class Camera {
  constructor(private point: Point, private rotation: Rotation, private _zoom: number) { }

  get x() {
    return this.point.x;
  }

  get y() {
    return this.point.y;
  }

  get z() {
    return this.point.z;
  }

  get ox() {
    return this.rotation.ox;
  }

  get oy() {
    return this.rotation.oy;
  }

  get oz() {
    return this.rotation.oz;
  }

  get zoom() {
    return this._zoom;
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

  public rotateOXForward() {
    this.rotation.rotateOX(+1);
  }

  public rotateOXBackward() {
    this.rotation.rotateOX(-1);
  }

  public rotateOYForward() {
    this.rotation.rotateOY(+1);
  }

  public rotateOYBackward() {
    this.rotation.rotateOY(-1);
  }

  public rotateOZForward() {
    this.rotation.rotateOZ(+1);
  }

  public rotateOZBackward() {
    this.rotation.rotateOZ(-1);
  }

  public zoomIn() {
    this._zoom += 0.01;
  }

  public zoomOut() {
    this._zoom -= 0.01;
  }
}
