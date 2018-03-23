import { _3DObject } from './_3DObject';
import * as _ from 'lodash';
import { Transformable } from './Transformable';
import { Cloneable } from './Cloneable';

export class Space implements Transformable, Cloneable<Space> {
  constructor(public readonly objects: _3DObject[]) { }

  public getLineSegments() {
    return _.uniq(
      _.flatten(
        this.objects
          .map(object => object.getLineSegments()),
      ),
    );
  }

  public getPoints() {
    return _.uniq(
      _.flatten(
        this.objects
          .map(objects => objects.getPoints()),
      ),
    );
  }

  public clone() {
    return new Space(
      this.objects
        .map(object => object.clone()),
    );
  }
}
