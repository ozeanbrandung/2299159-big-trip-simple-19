import Presenter from './presenter';
import {pointTitleMap} from '../maps';
import {PointType} from '../enums';
import {formatNumber, humanizeDateAndTime} from '../utils';
//import PointAdapter from '../adapters/point-adapter';

//меняем вот это
/**,
 * @extends {Presenter<NewPointEditorView>},
 */

//на вот это (делаем дженерик):
/**
 * @template {NewPointEditorView} View
 * @extends {Presenter<View>}
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
    //this.view.datesView.addEventListener('change', this.handleDatesViewChange.bind(this));

    const allDestinations = this.destinationsModel.listAll();
    const destinationOptions = allDestinations.map((destination) => ({value: destination.name, title: ''}));
    this.view.destinationView.setOptions(destinationOptions);
    this.view.destinationView.addEventListener('input', this.handleDestinationViewInput.bind(this));

    this.view.datesView.setConfig({
      formatDate: humanizeDateAndTime,
      // Формат даты по ТЗ
      //TODO: вот это у тебя не получилось самостоятельно!
      locale: {firstDayOfWeek: 1},
      // Неделя начинается в понедельник
      'time_24hr': true,
      // 24 часа вместо AM/PM
    });

    this.view.addEventListener('submit', this.handleViewSubmit.bind(this));
    this.view.addEventListener('close', this.handleViewClose.bind(this));
    //TODO: ты забыла про это событие (когда жмем на кнопку cancel у нее type reset и срабатывает это событие)
    //TODO: у кнопки удалить тоже стоит type=reset и по удалении тоже событие reset автоматически посылается
    this.view.addEventListener('reset', this.handleViewReset.bind(this));
  }

  handleNavigation() {
    if (location.pathname === '/new') {
      //console.log('открыть редактор')
      //окгда не передаем ничего возвращается просто пустой объект с нужными полями
      const point = this.pointsModel.item();
      //по умолчанию для всех точек маршрута
      point.destinationId = this.destinationsModel.item(5).id;
      point.type = PointType.TAXI;
      point.startDate = new Date().toISOString(); //new Date().toJSON(); идентичны
      point.endDate = new Date().toISOString();
      point.basePrice = 100;
      //офферы пропускаем они не выбраны у новой точки маршрута
      //point.offers = [];
      this.view.open();
      //порядок тут важен: в open инициализируется календарь а без не него некуда сетать даты
      this.updateView(point);
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
  async handleViewSubmit(event) {
    event.preventDefault();
    //TODO эта фигня не срабатывает потому что await save это не метод uiBlocker-а
    this.view.awaitSave(true);
    try {
      //console.log(event)

      // const data = new FormData(event.target);
      // const dataObj = {};
      // [...data.entries()].map(([key, value]) => (
      //   dataObj[key] = value
      // ));
      // const adapted = new PointAdapter(dataObj);
      // console.log(adapted);

      const data = this.pointsModel.item();
      const destinationName = this.view.destinationView.getValue();
      //по имени находим destination из существующих значений - вдруг пользоватеь вообще
      //что-то несуществующее накликал?
      const destination = this.destinationsModel.findBy('name', destinationName);
      const [startDate, endDate] = this.view.datesView.getValues();
      this.view.pointTypeView.getValue();

      data.type = this.view.pointTypeView.getValue();
      //так как мы не знаем накликал ли пользователь существующее значение или вообще чот левое
      //то destination может и не быть вообще - ставим вопросик на этот случай
      data.destinationId = destination?.id;
      data.startDate = startDate;
      data.endDate = endDate;
      data.basePrice = this.view.basePriceView.getValue();
      data.offersIds = this.view.offersView.getValues();

      //await this.pointsModel.add(data);
      await this.save(data);

      this.view.close();
      //this.pointsModel.add()
      //собрать данные и передать
      //после добавление обновить лист надо
      //для этого нам нужно подписаться на событие добавления чего-то в лист
      //await this.pointsModel.add
    } catch (exception) {
      this.view.uiBlockerView.shake();
      // eslint-disable-next-line no-console
      console.log(exception);
    }

    this.view.awaitSave(false);
  }

  /**
   * @param {Event} event
   */
  handleViewReset(event) {
    void event;
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
    this.view.destinationView.setValue(destination.name);
    this.view.datesView.setValues([point.startDate, point.endDate]);
    this.view.basePriceView.setValue(point.basePrice);
    // TODO: Обновить список предложений
    this.updateOffersView(point.offersIds);
    this.updateDestinationDetailsView(destination);
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

  /**
   * @param {DestinationAdapter} [destination]
   */
  updateDestinationDetailsView(destination) {
    this.view.destinationDetailsView.hidden = !destination;

    if (destination) {
      this.view.destinationDetailsView.setContent(destination);
    }
  }

  //TODO: вынесли отдельно чтобы в наследуемом классе можно было переписать его с add на update
  /**
   * @override
   * @param {PointAdapter} point
   */
  async save(point) {
    //await this.pointsModel.add(data);
    //debugger
    await this.pointsModel.add(point);
  }

  handleDestinationViewInput() {
    const destinationName = this.view.destinationView.getValue();
    const destination = this.destinationsModel.findBy('name', destinationName);
    this.updateDestinationDetailsView(destination);
  }

  //handleDatesViewChange(event) {
  // const date = event.target.value.toISOString();
  // debugger
  //}
}
