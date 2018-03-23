import { CityBuilder } from './../services/CityBuilder';
import { Sizes } from '../model/Sizes';

const cityBuilder = new CityBuilder(new Sizes(50, 100, 100));
const space = cityBuilder.build();

export { space };
