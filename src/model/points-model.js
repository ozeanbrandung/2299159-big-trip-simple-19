import getMockPoints from '../mock/points';

export default class PointsModel {
  points = getMockPoints();

  getPoints() {
    return this.points;
  }
}
