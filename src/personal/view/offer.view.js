import {createElement} from '../../render';
import {html} from '../../utils';

const createOfferTemplate = ({title, price}) => (
  html`
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
  `
);

export class OfferView {
  constructor(offer) {
    this.offer = offer;
  }

  getTemplate() {
    return createOfferTemplate(this.offer);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
