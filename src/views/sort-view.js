import {html} from '../utils';
import RadioGroupView from './radio-group-view';
import './sort-view.css';

export default class SortView extends RadioGroupView {
  constructor() {
    super();

    this.classList.add('trip-events__trip-sort');
    this.classList.add('trip-sort');
  }

  /**
   * @param {OptionViewState} state
   */
  createOptionHtml(state){
    return html`
      <div class="trip-sort__item  trip-sort__item--${state.value}">
        <input id="sort-${state.value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${state.value}">
        <label class="trip-sort__btn" for="sort-${state.value}">${state.title}</label>
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

customElements.define(String(SortView), SortView);
