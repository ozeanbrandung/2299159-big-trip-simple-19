import View from './view';
import PointView from './point-view';

export default class ListView extends View {
  /**
   * @param {PointViewState[]} states
   */
  setItems(states) {
    const views = states.map((state) => new PointView(state));
    this.replaceChildren(...views);
    return views;
  }

  /**
   * @param {string} id
   * @return {PointView}
   */
  findById(id) {
    return this.querySelector(`${PointView}[data-id="${id}"]`);
  }
}

customElements.define(String(ListView), ListView);
