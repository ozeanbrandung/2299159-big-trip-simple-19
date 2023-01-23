import Presenter from './presenter';
import {pointTitleMap} from '../maps';
import {PointType} from '../enums';
import {formatNumber} from '../utils';

/**,
 * @extends {Presenter<NewPointEditorView>},
 */
export default class NewPointEditorPresenter extends Presenter {
  constructor() {
    super(...arguments);
    //console.log(this, 'connected')

    const pointTypeOptions = Object.entries(pointTitleMap)
      .map(([value, title]) => ({value, title}));
    this.view.pointTypeView.setOptions(pointTypeOptions);
    //this.view.pointTypeView.setValue(PointType.TRAIN);
    this.view.pointTypeView.addEventListener('change', this.handlePointTypeViewChange.bind(this));

    const allDestinations = this.destinationsModel.listAll();
    const destinationOptions = allDestinations.map((destination) => ({value: destination.name, title: ''}));
    this.view.destinationView.setOptions(destinationOptions);

    this.view.addEventListener('submit', this.handleViewSubmit.bind(this));
    this.view.addEventListener('close', this.handleViewClose.bind(this));
    //TODO: ты забыла про это событие (когда жмем на кнопку cancel у нее type reset и срабатывает это событие)
    this.view.addEventListener('reset', this.handleViewReset.bind(this));
  }

  handleNavigation() {
    if (location.pathname === '/new') {
      //console.log('открыть редактор')
      //окгда не передаем ничего возвращается просто пустой объект с нужными полями
      const point = this.pointsModel.item();
      //по умолчанию для всех точек маршрута
      point.destinationId = this.destinationsModel.item(0).id;
      point.type = PointType.TAXI;
      point.startDate = new Date().toISOString(); //new Date().toJSON(); идентичны
      point.endDate = new Date().toISOString();
      point.basePrice = 100;
      //офферы пропускаем они не выбраны у новой точки маршрута
      //point.offers = [];
      this.updateView(point);
      this.view.open();
      //в качестве обработчика событий мы можем передать не только функцию но и объект у которого есть определенный метод handleEvent
    } else {
      //console.log('закрыть редактор')
      //не нотифай потому что иначе будет бесконечная цепочка событий и тд
      this.view.close(false);
    }
    //this.navigate()
  }

  /**
   * @param {SubmitEvent} event
   */
  handleViewSubmit(event) {
    event.preventDefault();
  }

  handleViewReset() {
    this.view.close();
  }

  handleViewClose() {
    this.navigate('/');
  }

  handlePointTypeViewChange() {
    //debugger
    const pointType = this.view.pointTypeView.getValue();
    const pointTitle = pointTitleMap[pointType];
    this.view.destinationView.setLabel(pointTitle);

    // TODO: Обновить список предложений
    this.updateOffersView();
  }

  /**
   *
   * @param {PointAdapter} point
   */
  updateView(point) {
    const destination = this.destinationsModel.findById(point.destinationId);
    this.view.pointTypeView.setValue(point.type);
    this.view.destinationView.setLabel(pointTitleMap[point.type]);
    this.view.pointTypeView.setValue(destination.name);
    // TODO: Обновить список предложений
    this.updateOffersView(point.offersIds);
  }

  /**
   * @param {string[]} offerIds
   */
  updateOffersView(offerIds = []) {
    //вообще даже близко не то было
    // this.view.offersView.hidden = Boolean(offerIds.length);
    // const offers = offerIds.map((offerId) => this.offerGroupsModel.findById(offerId));
    // this.view.offersView.setOptions(offers);
    const pointType = this.view.pointTypeView.getValue();

    const offersGroup = this.offerGroupsModel.findById(pointType);

    const options = offersGroup.offers.map((initialOffer) => ({
      ...initialOffer,
      price: formatNumber(initialOffer.price),
      checked: offerIds.includes(initialOffer.id),
    }));

    this.view.offersView.hidden = !options.length;

    this.view.offersView.setOptions(options);
  }
}
