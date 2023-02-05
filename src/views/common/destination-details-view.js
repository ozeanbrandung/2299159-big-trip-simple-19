import View from '../view';
import {html} from '../../utils';

export default class DestinationDetailsView extends View {
  constructor() {
    super();

    this.classList.add('event__section', 'event__section--destination');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
        </div>
      </div>
    `;
  }

  /**
   * @param {Picture} state
   */
  createPictureHtml(state) {
    return html`<img class="event__photo" src="${state.src}" alt="${state.description}">`;
  }

  /**
   * @param {DestinationAdapter} state
   */
  setContent(state) {
    const picturesHtml = state.pictures.map(this.createPictureHtml).join('');
    this.querySelector('.event__photos-tape').innerHTML = picturesHtml;
    this.querySelector('.event__destination-description').textContent = state.decription;
  }
}

customElements.define(String(DestinationDetailsView), DestinationDetailsView);
