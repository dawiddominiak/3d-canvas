import { _3DObject } from './_3DObject';
import * as _ from 'lodash';

export class Space {
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
}
