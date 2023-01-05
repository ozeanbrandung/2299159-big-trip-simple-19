import View from '../view';
import {html} from '../../utils';

export default class DestinationDetailsView extends View {
  constructor() {
    super();

    this.classList.add('event__field-group');
    this.classList.add('event__field-group--destination');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <label class="event__label  event__type-output" for="event-destination-1">
        Flight
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    `;
  }
}

customElements.define(String(DestinationDetailsView), DestinationDetailsView);
