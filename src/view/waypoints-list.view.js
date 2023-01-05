import {createElement} from '../render';
import {html} from '../utils';

const getWaypointsListView = () => (
  html`
  <ul class="trip-events__list"></ul>
  `
);

export default class WaypointsListView {
  getTemplate() {
    return getWaypointsListView();
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
