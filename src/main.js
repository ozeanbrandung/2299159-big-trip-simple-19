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
import PointEditorPresenter from './presenters/point-editor-presenter';
import PointEditorView from './views/point-editor-view';
import EmptyListPresenter from './presenters/empty-list-presenter';

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
  filter: filterCallbackMap[FilterType.EVERYTHING],
  sort: sortCallbackMap[SortType.DAY]
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

const listView = document.querySelector(String(ListView));
const filterView = document.querySelector(String(FilterView));
const sortView = document.querySelector(String(SortView));
const newPointButtonView = document.querySelector('.trip-main__event-add-btn');
const newPointEditorView = new NewPointEditorView(listView);
const pointEditorView = new PointEditorView(listView);
const emptyListView = document.querySelector('.trip-events__msg');

Promise.all(
  models.map((model) => model.ready())
)
  .then(() => {
    new FilterPresenter(filterView, models);
    new SortPresenter(sortView, models);
    new ListPresenter(listView, models);
    new NewPointButtonPresenter(newPointButtonView, models);
    new NewPointEditorPresenter(newPointEditorView, models);
    new PointEditorPresenter(pointEditorView, models);
    new EmptyListPresenter(emptyListView, models);
  })
  .catch((exception) => {
    emptyListView.textContent = exception;
  });
