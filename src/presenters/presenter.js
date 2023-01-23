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
    //так мы гарантируем что дочерний презентер уже свою работу завершил и можно хэндлить навигацию
    window.requestAnimationFrame(() => this.handleNavigation());
  }

  //чтобы понимать где мы сейчас
  get location() {
    //объект URL обеспечивает легкий доступ к параметрам
    //location нам вообще возвращает простую строку
    return new URL(window.location.href);
  }

  //переход от одного адреса к другому
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

  //любому презентеру которому нужно рабоать с навизацией просто нужно перезаписать handleNavigation и все
  /**
   * @abstract
   */
  handleNavigation() {}
}
