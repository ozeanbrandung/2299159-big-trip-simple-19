/**
 * @template {HTMLElement} View
 */
export default class Presenter {
  constructor(view, models) {
    const [pointsModel, destinationsModel, offerGroupsModel] = models;

    /**
     * @type {View}
     */
    this.view = view;

    /**
     * @type {CollectionModel<Point,PointAdapter>}
     */
    this.pointsModel = pointsModel;

    /**
     * @type {CollectionModel<Destination,DestinationAdapter>}
     */
    this.destinationsModel = destinationsModel;

    /**
     * @type {CollectionModel<OfferGroup,OfferGroupAdapter>}
     */
    this.offerGroupsModel = offerGroupsModel;
  }
}
