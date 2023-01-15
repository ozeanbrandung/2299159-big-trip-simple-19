import './views/filter-view';
import './views/sort-view';
import SortView from './views/sort-view';
import ListView from './views/list-view';
import FilterView from './views/filter-view';
import './views/point-view';
import './views/new-point-editor-view';
import NewPointEditorView from './views/new-point-editor-view';
import Store from './store';
import CollectionModel from './models/collection-model';
import PointAdapter from './adapters/point-adapter';
import DestinationAdapter from './adapters/destination-adapter';
import OffersGroupAdapter from './adapters/offers-group-adapter';
import {filterCallbackMap, sortCallbackMap} from './maps';
import {FilterType, SortType} from './enums';
import ListPresenter from './presenters/list-presenter';
import FilterPresenter from './presenters/filter-presenter';
import SortPresenter from './presenters/sort-presenter';
import NewPointButtonPresenter from './presenters/new-point-button-presenter';
import NewPointEditorPresenter from './presenters/new-point-editor-presenter';

const BASE = 'https://19.ecmascript.pages.academy/big-trip-simple';
const AUTH = 'Basic bTYXX8IbAEP7HEVju1LK';

/**
 *
 * @type {Store<Point>}
 */
const pointsStore = new Store(`${BASE}/points`, AUTH);
const pointsModel = new CollectionModel({
  store: pointsStore,
  adapt: (pointItem) => new PointAdapter(pointItem),
  filter: filterCallbackMap[FilterType.FUTURE],
  sort: sortCallbackMap[SortType.PRICE]
});

/**
 *
 * @type {Store<Destination>}
 */
const destinationsStore = new Store(`${BASE}/destinations`, AUTH);
const destinationsModel = new CollectionModel({
  store: destinationsStore,
  adapt: (destinationItem) => new DestinationAdapter(destinationItem)
});
/**
 *
 * @type {Store<OfferGroup>}
 */
const offersGroupsStore = new Store(`${BASE}/offers`, AUTH);
const offersGroupModel = new CollectionModel({
  store: offersGroupsStore,
  adapt: (destinationItem) => new OffersGroupAdapter(destinationItem)
});

const models = [pointsModel, destinationsModel, offersGroupModel];

const {log /*, table */} = console;

const listView = document.querySelector(String(ListView));
const filterView = document.querySelector(String(FilterView));
const sortView = document.querySelector(String(SortView));
const newPointButtonView = document.querySelector('.trip-main__event-add-btn');
const newPointEditorView = new NewPointEditorView(listView);

Promise.all(
  models.map((model) => model.ready())
)
  .then(async () => {
    //TODO: при инициировании презентеров порядок имеет роль!
    new ListPresenter(listView, models);
    new FilterPresenter(filterView, models);
    new SortPresenter(sortView, models);
    new NewPointButtonPresenter(newPointButtonView, models);
    //TODO: обязательно должен инициализироваться после листа!
    new NewPointEditorPresenter(newPointEditorView, models);
    //так мы проверяем работу моделей
    // const logEvent = (event) => log(event.type, event.detail);
    // table(pointsModel.list());
    //
    // pointsModel.addEventListener('add', logEvent);
    // pointsModel.addEventListener('update', logEvent);
    // pointsModel.addEventListener('delete', logEvent);
    //
    // const item = pointsModel.item();
    //
    // item.basePrice = 100;
    // item.startDate = new Date().toJSON();
    // item.endDate = item.startDate;
    // item.destinationId = '1';
    // item.offersIds = [];
    // item.type = 'bus';
    //
    // const addedItem = await pointsModel.add(item);
    //
    // addedItem.basePrice = 200;
    // addedItem.type = 'taxi';
    //
    // await pointsModel.update(addedItem);
    // await pointsModel.delete(addedItem.id);
    // log('Points', pointsModel.listAll());
    // log('points item idx 125', pointsModel.item(256));
    // log('Points: findBy', pointsModel.findBy('basePrice', 300));
    // log('Points: findById', pointsModel.findById('0'));
    // log('Destinations', destinationsModel.listAll());
    // log('Points: findIndexBy', pointsModel.findIndexBy('basePrice', 300));
    // log('Points: findIndexById', pointsModel.findIndexById('0'));
    // log('destinations item idx 1', destinationsModel.item(1));
    // log('Offer groups', offersGroupModel.listAll());
    // log('offer groups item without argument', offersGroupModel.item());
  })

  .catch((error) => {
    log(error);
  });
