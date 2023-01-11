import View from './view';
import {html} from '../utils';
import './point-view.css';

export default class PointView extends View {
  /**
   * @param {PointViewState} state
   */
  constructor(state) {
    //в супере вызовется сразу же createHtml который мы тут переписали с нужной нам разметкой
    //итак, эта разметка появится в dom
    super(state);

    this.classList.add('trip-events__item');
    //и уж потом к разметке мы добавляем верстку с офферами
    this.setOffers(state.offers);
  }

  /**
   * @param {OfferViewState} state
   */
  createOfferHtml(state) {
    return html`
      <li class="event__offer">
        <span class="event__offer-title">${state.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${state.price}</span>
      </li>
    `;
  }

  setOffers(states) {
    const offersHtml = states.map(this.createOfferHtml).join(''); //массив строк с разметкой на выходе который джойним
    this.querySelector('.event__selected-offers').innerHTML = offersHtml;
  }

  /**
   * @param {PointViewState} state
   */
  createHtml(state) {
    return html`
      <div class="event">
        <time class="event__date" datetime="${state.startDate}">${state.date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${state.icon}" alt="Event type icon">
        </div>
        <h3 class="event__title">${state.title}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${state.startDate}">${state.startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${state.endDate}">${state.endTime}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${state.basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <!-- ИЗ-ЗА ЭКРАНИРОВАНИЯ МЫ СЮДА НЕ МОЖЕМ ВПИХНУТЬ ЦИКЛ!-->
<!--          <li class="event__offer">-->
<!--            <span class="event__offer-title">Order Uber</span>-->
<!--            &plus;&euro;&nbsp;-->
<!--            <span class="event__offer-price">20</span>-->
<!--          </li>-->
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    `;
  }
}

customElements.define(String(PointView), PointView);
