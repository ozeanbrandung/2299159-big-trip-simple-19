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


    window.addEventListener('popstate', this.handleWindowPopState.bind(this));
    window.requestAnimationFrame(() => this.handleNavigation());
  }

  get location() {
    return new URL(window.location.href);
  }

  /**
   * @param {string} path
   * @param {Object<string,string>} params
   */
  navigate(path, params = {}) {
    const usp = new URLSearchParams(params);
    const url = [path, usp].filter(String).join('?');

    window.history.pushState(null, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  /**
   * @param {PopStateEvent} event
   */
  handleWindowPopState(event) {
    void event;
    this.handleNavigation();
  }

  /**
   * @abstract
   */
  handleNavigation() {}
}
