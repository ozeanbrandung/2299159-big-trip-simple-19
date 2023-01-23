import View from '../view';
import {html} from '../../utils';
import './offers-view.css';

export default class OffersView extends View {
  constructor() {
    super();

    this.classList.add('event__section', 'event__section--offers');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
<!--        <div class="event__offer-selector">-->
<!--          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>-->
<!--          <label class="event__offer-label" for="event-offer-luggage-1">-->
<!--            <span class="event__offer-title">Add luggage</span>-->
<!--            &plus;&euro;&nbsp;-->
<!--            <span class="event__offer-price">50</span>-->
<!--          </label>-->
<!--        </div>-->

<!--        <div class="event__offer-selector">-->
<!--          <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>-->
<!--          <label class="event__offer-label" for="event-offer-comfort-1">-->
<!--            <span class="event__offer-title">Switch to comfort</span>-->
<!--            &plus;&euro;&nbsp;-->
<!--            <span class="event__offer-price">80</span>-->
<!--          </label>-->
<!--        </div>-->

<!--        <div class="event__offer-selector">-->
<!--          <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">-->
<!--          <label class="event__offer-label" for="event-offer-meal-1">-->
<!--            <span class="event__offer-title">Add meal</span>-->
<!--            &plus;&euro;&nbsp;-->
<!--            <span class="event__offer-price">15</span>-->
<!--          </label>-->
<!--        </div>-->

<!--        <div class="event__offer-selector">-->
<!--          <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">-->
<!--          <label class="event__offer-label" for="event-offer-seats-1">-->
<!--            <span class="event__offer-title">Choose seats</span>-->
<!--            &plus;&euro;&nbsp;-->
<!--            <span class="event__offer-price">5</span>-->
<!--          </label>-->
<!--        </div>-->

<!--        <div class="event__offer-selector">-->
<!--          <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">-->
<!--          <label class="event__offer-label" for="event-offer-train-1">-->
<!--            <span class="event__offer-title">Travel by train</span>-->
<!--            &plus;&euro;&nbsp;-->
<!--            <span class="event__offer-price">40</span>-->
<!--          </label>-->
<!--        </div>-->
      </div>
    `;
  }

  /**
   * @param {OfferToggleViewState} state
   */
  createOptionHtml(state) {
    return html`
      <div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${state.id}"
          type="checkbox"
          name="offer"
          value="${state.id}"
          ${state.checked ? 'checked' : ''}
        >

        <label class="event__offer-label" for="event-offer-${state.id}">
          <span class="event__offer-title">${state.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${state.price}</span>
        </label>
      </div>
    `;
  }

  /**
   * @param {OfferToggleViewState[]} states
   */
  setOptions(states){
    const optionsHtml = states.map(this.createOptionHtml).join('');
    //нам нужно не добавить еще разметки а перетереть разметку
    //this.querySelector('.event__available-offers').insertAdjacentHTML('afterbegin', optionsHtml);
    this.querySelector('.event__available-offers').innerHTML = optionsHtml;
  }

  getValues() {
    /**
     * @type {NodeListOf<HTMLInputElement>}
     */
    const views = this.querySelectorAll(':checked');
    //превращаем в массив обязательно поскольку map нет у коллекции
    return [...views].map((node) => (node.value));
  }
}

customElements.define(String(OffersView), OffersView);
