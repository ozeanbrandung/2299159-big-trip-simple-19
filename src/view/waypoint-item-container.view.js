import {createElement} from '../render';
import {html} from '../utils';

const getWaypointItemContainerTemplate = () => (
  html`<li class="trip-events__item"></li>`
);

export default class WaypointItemContainerView {
  getTemplate() {
    return getWaypointItemContainerTemplate();
  }

  getElement() {
    //и все-таки у нас инстанс каждого класса создается единожды как это может быть
    //что this.element уже есть
    if (!this.element) {
      this.element = createElement(getWaypointItemContainerTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
