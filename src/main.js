import EventsPresenter from './presenter/events.presenter';
import {render} from './render';
import {FilterView} from './view/filter.view';

const eventsContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');

render(new FilterView(), filtersContainer);

const eventsPresenter = new EventsPresenter({eventsContainer: eventsContainer});

eventsPresenter.init();
