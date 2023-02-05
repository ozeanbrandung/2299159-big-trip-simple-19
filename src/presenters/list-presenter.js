import Presenter from './presenter';
import {formatNumber, humanizeDate, humanizeTime} from '../utils';
import {pointIconsMap, pointTitleMap} from '../maps';

/**
* @extends {Presenter<ListView>},
*/
export default class ListPresenter extends Presenter {
  constructor() {
    super(...arguments);

    this.updateView();
    this.pointsModel.addEventListener('filter', this.handlePointsModelFilter.bind(this));
    this.pointsModel.addEventListener('sort', this.handlePointsModelSort.bind(this));
    this.pointsModel.addEventListener('add', this.handlePointsModelAdd.bind(this));
    this.view.addEventListener('edit', this.handleViewEdit.bind(this));
    this.pointsModel.addEventListener('update', this.handlePointsModeUpdate.bind(this));
    this.pointsModel.addEventListener('delete', this.handlePointsModeDelete.bind(this));
  }

  /**
   * @param {PointAdapter} [targetPoint]
   */
  updateView(targetPoint) {
    const pointViews = this.view.setItems(
      this.pointsModel.list().map(this.createPointViewState, this)
    );

    if (targetPoint) {
      this.view.findById(targetPoint.id)?.fadeInLeft();
    } else {
      pointViews.forEach((pointView, idx) => {
        pointView.fadeInLeft({delay: idx * 100});
      });
    }
  }

  /**
   * @param {PointAdapter} point
   */
  createPointViewState(point) {
    const destination = this.destinationsModel.findById(point.destinationId);

    const offersGroup = this.offerGroupsModel.findById(point.type);
    const offerViewStates = offersGroup.offers.filter((offer) => point.offersIds.includes(offer.id));
    const formattedOffers = offerViewStates.map((offer) => ({title: offer.title, price: formatNumber(offer.price)}));

    return {
      id: point.id,
      date: humanizeDate(point.startDate),
      icon: pointIconsMap[point.type],
      title: `${pointTitleMap[point.type]} ${destination.name}`,
      startTime: humanizeTime(point.startDate),
      startDate: point.startDate,
      endTime: humanizeTime(point.endDate),
      endDate: point.endDate,
      basePrice: point.basePrice,
      offers: formattedOffers,
    };
  }

  handlePointsModelFilter() {
    this.updateView();
  }

  handlePointsModelSort() {
    this.updateView();
  }

  /**
   * @param {CustomEvent<PointAdapter>} event
   */
  handlePointsModelAdd(event) {
    this.updateView(event.detail);
  }

  /**
   * @param {CustomEvent<{newItem: PointAdapter}>} event
   */
  handlePointsModeUpdate(event) {
    this.updateView(event.detail.newItem);
  }

  /**
   * @param {CustomEvent<PointAdapter>} event
   */
  handlePointsModeDelete(event) {
    this.updateView(event.detail);
  }

  /**
   * @param {CustomEvent & {target: PointView}} event
   */
  handleViewEdit(event) {
    this.navigate('/edit', event.target.dataset);
  }
}
