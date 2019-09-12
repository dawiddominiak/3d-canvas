import { cos, sin } from "../utils/math";
import { Point } from "./Point";
import { Rotation } from "./Rotation";

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
    const vector = this.calculateVectorLeft();
    this.point.moveTo(this.x + vector[0], this.y + vector[1], this.z + vector[2]);
  }

  public moveRight() {
    const vector = this.calculateVectorLeft();
    this.point.moveTo(this.x - vector[0], this.y - vector[1], this.z - vector[2]);
  }

  public moveTop() {
    const vector = this.calculateVectorTop();
    this.point.moveTo(this.x + vector[0], this.y + vector[1], this.z + vector[2]);
  }

  public moveBottom() {
    const vector = this.calculateVectorTop();
    this.point.moveTo(this.x - vector[0], this.y - vector[1], this.z - vector[2]);
  }

  public moveForward() {
    const vector = this.calculateVectorForward();
    this.point.moveTo(this.x + vector[0], this.y + vector[1], this.z + vector[2]);
  }

  public moveBack() {
    const vector = this.calculateVectorForward();
    this.point.moveTo(this.x - vector[0], this.y - vector[1], this.z - vector[2]);
  }

  public calculateVectorLeft() {
    const vector = [
      cos(this.rotation.oy) + sin(this.rotation.oz),
      - sin(this.rotation.ox) - sin(this.rotation.oz),
      sin(this.rotation.oy) - sin(this.rotation.ox),
    ];

    console.log('theo 1', [
      cos(this.rotation.pitch) * sin(this.rotation.yaw),
      cos(this.rotation.pitch) * cos(this.rotation.yaw),
      sin(this.rotation.pitch),
    ]);

    console.log('theo 2', [
      - sin(this.rotation.roll) * cos(this.rotation.yaw) - cos(this.rotation.roll) * sin(this.rotation.pitch) * sin(this.rotation.yaw),
      - sin(this.rotation.roll) * sin(this.rotation.yaw) - cos(this.rotation.roll) * sin(this.rotation.pitch) * cos(this.rotation.yaw),
      cos(this.rotation.roll) * cos(this.rotation.pitch),
    ]);
    console.log(vector);
    return vector;
  }

  public calculateVectorTop() {
    console.log(this.rotation);
    const vector = [
      sin(this.rotation.oy) + sin(this.rotation.oz),
      cos(this.rotation.ox) + sin(this.rotation.oz),
      sin(this.rotation.oy) - sin(this.rotation.ox),
    ];
    console.log(vector);
    return vector;
  }

  public calculateVectorForward() {
    return [0, 0, -1];
  }

  public pitchDown() {
    this.rotation.rotateOX(+90);
  }

  public pitchUp() {
    this.rotation.rotateOX(-90);
  }

  public yawLeft() {
    this.rotation.rotateOY(+90);
  }

  public yawRight() {
    this.rotation.rotateOY(-90);
  }

  public rollLeft() {
    this.rotation.rotateOZ(+90);
  }

  public rollRight() {
    this.rotation.rotateOZ(-90);
  }

  public zoomIn() {
    this._zoom += 0.01;
  }

  public zoomOut() {
    this._zoom -= 0.01;
  }
}
