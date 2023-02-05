import {html} from '../utils';
import RadioGroupView from './radio-group-view';

export default class FilterView extends RadioGroupView {
  constructor() {
    super();

    this.classList.add('trip-filters');
  }

  /**
   * @param {OptionViewState} state
   */
  createOptionHtml(state) {
    return html`
      <div class="trip-filters__filter">
        <input
          id="filter-${state.value}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${state.value}"
        >
        <label class="trip-filters__filter-label" for="filter-${state.value}">
          ${state.title}
        </label>
      </div>
    `;
  }

  /**
   * @param {OptionViewState[]} states
   */
  setOptions(states) {
    this.innerHTML = states.map(this.createOptionHtml).join('');
  }
}

customElements.define(String(FilterView), FilterView);
