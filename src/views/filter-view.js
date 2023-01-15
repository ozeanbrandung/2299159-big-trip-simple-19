//import View from './view';
import {html} from '../utils';
import RadioGroupView from './radio-group-view';

//FilterView extends RadioGroupView extends View
export default class FilterView extends RadioGroupView {
  constructor() {
    super();

    //пока не закомментила класс в супере этот не навешивался почему-то
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
    //this.innerHTML = states.map((state) => this.createOptionHtml(state)).join('');
    //TODO: ПИШИ ЭТО КОРОЧЕ!
    this.innerHTML = states.map(this.createOptionHtml).join('');
  }

  // /**
  //  * @override
  //  */
  // createHtml() {
  //   return html`
  //     <div class="trip-filters__filter">
  //       <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
  //       <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  //     </div>
  //
  //     <div class="trip-filters__filter">
  //       <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
  //       <label class="trip-filters__filter-label" for="filter-future">Future</label>
  //     </div>
  //   `;
  // }
}

customElements.define(String(FilterView), FilterView);
