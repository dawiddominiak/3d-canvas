import { Sizes } from '../model/Sizes';
import { Point } from '../model/Point';
import { Space } from '../model/Space';
import { CuboidBuilder } from './CuboidBuilder';

export class CityBuilder {
  constructor(
    private readonly sizes: Sizes,
    private readonly numberOfBuildingsInRow: number = 2,
  ) { }

  build() {
    const distance = Math.max(this.sizes.width, this.sizes.depth) * 2.5;
    const initPoint = new Point(-150, -150, 100);
    const buildings = [];

    for (let i = 0; i < this.numberOfBuildingsInRow; i += 1) {
      for (let j = 0; j < this.numberOfBuildingsInRow; j += 1) {
        const buildingBuilder = new CuboidBuilder(this.sizes);
        const building = buildingBuilder.buildIn(new Point(
          initPoint.x + (distance * i),
          initPoint.y + (distance * j),
          initPoint.z,
        ));

        buildings.push(building);
      }
    }

    return new Space(buildings);
  }
}
