import EventsPresenter from './presenter/events.presenter';
import {render} from './render';
import {FilterView} from './view/filter.view';
import PointsModel from './model/points-model';
import './views/hello-world';

const eventsContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');

render(new FilterView(), filtersContainer);

const pointsModel = new PointsModel();

const eventsPresenter = new EventsPresenter({eventsContainer: eventsContainer, pointsModel});

eventsPresenter.init();
