import Presenter from './presenter';
import {formatNumber, humanizeDate, humanizeTime} from '../utils';
import {pointIconsMap, pointTitleMap} from '../maps';

/**
* @extends {Presenter<ListView>},
*/
export default class ListPresenter extends Presenter {
  constructor() {
    super(...arguments);

    //обновляем впервые сразу же после инициализации
    this.updateView();
    this.pointsModel.addEventListener('filter', this.handlePointsModelFilter.bind(this));
    this.pointsModel.addEventListener('sort', this.handlePointsModelSort.bind(this));
  }

  updateView() {
    this.view.setItems(
      //из базового презентера у нас уже есть доступ ко всем моделям в программе
      //выбираем list потому что он возвращает с учетом сортировки и фильтров
      //map вторым элементом принимает контекст который мы хотим использовать внутри коллбэка
      this.pointsModel.list().map(this.createPointViewState, this)
    );

    //более красивая запись:
    //const points = this.pointsModel.list()
    //const pointsViewStates = points.map(this.createPointViewState, this)
    //this.view.setItems(pointsViewStates);
  }

  /**
   * @param {PointAdapter} point
   */
  createPointViewState(point) {
    const destination = this.destinationsModel.findById(point.destinationId);
    //console.log(destination);

    const offersGroup = this.offerGroupsModel.findById(point.type);
    //console.log(offersGroup);
    //console.log(pointIconsMap);

    //1-ый вариант (мой)
    //const offers = point.offersIds.map((offerId) => offersGroup.offers.find((offer) => offer.id === offerId));
    //2-й вариант и он намного лучше потому что нет вызова файнд! первый (твой вариант) непроизводительный, и на больших данных он будет тупить, возможно
    //хотя и второй вариант не самый производительный на свете
    const offerViewStates = offersGroup.offers.filter((offer) => point.offersIds.includes(offer.id));
    //нам не нужен весь объект включая id нам нужены только два поля
    //const formattedOffers = offers.map((offer) => ({...offer, price: formatNumber(offer.price)}));
    const formattedOffers = offerViewStates.map((offer) => ({title: offer.title, price: formatNumber(offer.price)}));

    return {
      date: humanizeDate(point.startDate),
      icon: pointIconsMap[point.type],
      //icon: pointIconsMap[Object.entries(PointType).find(([key, value]) => value === point.type)[0]],
      title: `${pointTitleMap[point.type]} ${destination.name}`,
      startTime: humanizeTime(point.startDate),
      startDate: point.startDate,
      endTime: humanizeTime(point.endDate),
      endDate: point.endDate,
      basePrice: point.basePrice,
      //offers,
      offers: formattedOffers,
    };
  }

  handlePointsModelFilter() {
    //console.log('im here')
    this.updateView();
  }

  handlePointsModelSort() {
    this.updateView();
  }
}
