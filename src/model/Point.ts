import { Cloneable } from './Cloneable';
import * as mathjs from 'mathjs';

export class Point implements Cloneable<Point> {
  private _x: number;
  private _y: number;
  private _z: number;

  constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get z() {
    return this._z;
  }

  public moveTo(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    if (typeof z !== 'number') {
      throw new Error('not a number');
    }
    this._z = z;
  }

  public clone() {
    return new Point(this._x, this._y, this._z);
  }

  public asMatrix(w: number = 1) {
    return mathjs.matrix([
      [this._x],
      [this._y],
      [this._z],
      [w],
    ]);
  }
}
