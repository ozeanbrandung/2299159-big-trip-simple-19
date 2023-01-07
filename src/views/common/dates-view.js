import View from '../view';
import {html} from '../../utils';

export default class DatesView extends View {
  constructor() {
    super();

    this.classList.add('event__field-group', 'event__field-group--time');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
    `;
  }
}

customElements.define(String(DatesView), DatesView);
