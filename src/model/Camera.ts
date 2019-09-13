import * as _ from "lodash";
import * as mathjs from "mathjs";

import { cos, sin } from "../utils/math";
import { Point } from "./Point";
import { Rotation } from "./Rotation";

const WALK_SPEED = 8;

export class Camera {
  private transfromationMatrix: mathjs.Matrix;

  constructor(private point: Point, private rotation: Rotation, private _zoom: number) {
    this.transfromationMatrix = mathjs.matrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
  }

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

  public updateTransformationMetrics(transfromationMatrix: mathjs.Matrix) {
    this.transfromationMatrix = transfromationMatrix;
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
    return this.calculateVector([1, 0, 0, 1]);
  }

  public calculateVectorTop() {
    return this.calculateVector([0, 1, 0, 1]);
  }

  public calculateVectorForward() {
    return this.calculateVector([0, 0, 1, 1]);
  }

  private calculateVector(vector: number[]) {
    const matrix = mathjs.multiply(
      this.transfromationMatrix,
      mathjs.matrix(
        vector.map(element => [element]),
      ),
    );
    const transformedVector = _.flattenDeep(matrix.valueOf() as ArrayLike<number>) as number[];

    return [
      transformedVector[0],
      transformedVector[1],
      - transformedVector[2],
    ].map(element => element * WALK_SPEED);
  }

  public pitchDown() {
    this.rotation.rotateOX(+3);
  }

  public pitchUp() {
    this.rotation.rotateOX(-3);
  }

  public yawLeft() {
    this.rotation.rotateOY(+3);
  }

  public yawRight() {
    this.rotation.rotateOY(-3);
  }

  public rollLeft() {
    this.rotation.rotateOZ(+3);
  }

  public rollRight() {
    this.rotation.rotateOZ(-3);
  }

  public zoomIn() {
    this._zoom += 0.01;
  }

  public zoomOut() {
    this._zoom -= 0.01;
  }
}
