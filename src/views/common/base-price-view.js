import View from '../view';
import {html} from '../../utils';

export default class BasePriceView extends View {
  constructor() {
    super();

    this.classList.add('event__field-group');
    this.classList.add('event__field-group--price');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>

      <input
        class="event__input  event__input--price"
        id="event-price-1"
        type="text"
        name="event-price"
        value="160"
        min="1"
      >
    `;
  }

  /**
   * @param {number} value
   */
  setValue(value) {
    this.querySelector('input').valueAsNumber = value;
  }

  getValue() {
    //TODO: тут можно не приводить типы а использовать вот такой метод!
    return this.querySelector('input').valueAsNumber;
  }
}

customElements.define(String(BasePriceView), BasePriceView);
