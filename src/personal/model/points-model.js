import {getRandomMockPoint} from '../mock/points';
//import {getRandomArrayElement} from '../utils';

const POINTS_COUNT = 6;

export default class PointsModel {
  //#allPoints = getAllMockPoints();
  //#points = new Array(POINTS_COUNT).fill(undefined).map(() => getRandomArrayElement(this.#allPoints));
  //без fill ваще не работает эта история потому что
  //[...] callback is invoked only for indexes of the array which have assigned value; [...]
  // [undefined] actually applies the setter on the index(es) so that map will iterate, whereas new Array(1) just initializes the index(es) with a default value of undefined so map skips it.

  //этот варик предложенный на курсе
  #points = Array.from({length: POINTS_COUNT}, getRandomMockPoint);

  getPoints() {
    return this.#points;
  }
}
