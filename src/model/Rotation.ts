export class Rotation {
  private _ox: number;
  private _oy: number;
  private _oz: number;

  constructor(ox: number, oy: number, oz: number) {
    this._ox = ox;
    this._oy = oy;
    this._oz = oz;
  }

  get ox() {
    return this._ox;
  }

  get oy() {
    return this._oy;
  }

  get oz() {
    return this._oz;
  }

  rotateOX(rotation: number) {
    this._ox = this._ox + rotation;
  }

  rotateOY(rotation: number) {
    this._oy = this._oy + rotation;
  }

  rotateOZ(rotation: number) {
    this._oz = this._oz + rotation;
  }
}
