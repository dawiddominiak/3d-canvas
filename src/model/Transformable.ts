import { Point } from './Point';
import { LineSegment } from './LineSegment';

export interface Transformable {
  getPoints(): Point[];
  getLineSegments(): LineSegment[];
}
