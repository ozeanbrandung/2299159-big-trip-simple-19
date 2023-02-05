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
    this.querySelector('.event__available-offers').innerHTML = optionsHtml;
  }

  getValues() {
    /**
     * @type {NodeListOf<HTMLInputElement>}
     */
    const views = this.querySelectorAll(':checked');
    return [...views].map((node) => (node.value));
  }
}

customElements.define(String(OffersView), OffersView);
