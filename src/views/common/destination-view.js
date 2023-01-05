import View from '../view';
import {html} from '../../utils';

export default class DestinationView extends View {
  constructor() {
    super();

    this.classList.add('event__section');
    this.classList.add('event__section--destination');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>
    `;
  }
}

customElements.define(String(DestinationView), DestinationView);
