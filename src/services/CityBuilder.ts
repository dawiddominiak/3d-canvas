import { Point } from "../model/Point";
import { Sizes } from "../model/Sizes";
import { Space } from "../model/Space";
import { CuboidBuilder } from "./CuboidBuilder";

export class CityBuilder {
  constructor(
    private readonly sizes: Sizes,
    private readonly numberOfBuildingsInRow: number = 2,
    private readonly colors: string[] = [],
  ) { }

  build() {
    const distance = Math.max(this.sizes.width, this.sizes.height) * 2.5;
    const initPoint = new Point(-150, -50, -250);
    const buildings = [];

    for (let i = 0; i < this.numberOfBuildingsInRow; i += 1) {
      for (let j = 0; j < this.numberOfBuildingsInRow; j += 1) {
        const buildingBuilder = new CuboidBuilder(this.sizes, this.colors);
        const building = buildingBuilder.buildIn(new Point(
          initPoint.x + (distance * i),
          initPoint.y,
          initPoint.z + (distance * j),
        ));

        buildings.push(building);
      }
    }

    return new Space(buildings);
  }
}
