import {createElement} from '../../render';
import {html, humanizeDate, humanizeTime} from '../../utils';

const getWaypointTemplate = (waypoint) => {
  const {basePrice, dateFrom, dateTo, destination, type} = waypoint;

  return (
    html`
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${humanizeDate(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${humanizeTime(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${humanizeTime(dateTo)}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
<!--        <li class="event__offer">-->
<!--          <span class="event__offer-title">Order Uber</span>-->
<!--          &plus;&euro;&nbsp;-->
<!--          <span class="event__offer-price">20</span>-->
<!--        </li>-->
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">${type}</span>
      </button>
    </div>
  `
  );
};

export class WaypointView {
  constructor({waypoint}) {
    this.waypoint = waypoint;
  }

  getTemplate() {
    return getWaypointTemplate(this.waypoint);
  }

  getElement() {
    if (!this.element) {
      //я все еще не прониклась тем зачем нам все-таки createElement
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
