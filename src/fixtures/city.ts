import { CityBuilder } from './../services/CityBuilder';
import { Sizes } from '../model/Sizes';

const cityBuilder = new CityBuilder(new Sizes(1, 2, 2));
const space = cityBuilder.build();

export { space };
