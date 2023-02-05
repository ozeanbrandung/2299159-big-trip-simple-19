import {html} from '../../utils';
import RadioGroupView from '../radio-group-view';
import {pointIconsMap} from '../../maps';
import './point-type-view.css';

export default class PointTypeView extends RadioGroupView {
  constructor() {
    super();

    this.classList.add('event__type-wrapper');

    this.addEventListener('change', this.handleChange);
    this.addEventListener('keydown', this.handleKeydown);
    this.addEventListener('blur', this.handleBlur, true);
    this.addEventListener('pointerup', this.handlePointerUp);
    this.addEventListener('pointerdown', this.handlePointerDown);
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <label class="event__type  event__type-btn" for="event-type-toggle-1" tabindex="-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
        </fieldset>
      </div>
    `;
  }

  /**
   * @param {OptionViewState} state
   */
  createOptionHtml(state) {
    return html`
      <div class="event__type-item">
        <input
          id="event-type-${state.value}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${state.value}"
        >
        <label
          class="event__type-label  event__type-label--${state.value}"
          for="event-type-${state.value}-1"
          tabindex="-1"
        >
          ${state.title}
        </label>
      </div>
    `;
  }

  /**
   * @param {string} value
   */
  setValue(value) {
    super.setValue(value);
    if (pointIconsMap[value]) {
      /**
       * @type {HTMLImageElement}
       */
      (this.querySelector('.event__type-icon')).src = pointIconsMap[value];
    }
  }

  /**
   * @param {OptionViewState[]} states
   */
  setOptions(states) {
    const optionsHtml = states.map(this.createOptionHtml).join('');
    this.querySelector('legend').insertAdjacentHTML('afterend', optionsHtml);
  }

  open(){
    /**
     * @type {HTMLInputElement}
     */
    (this.querySelector('.event__type-toggle')).checked = true;

    /**
     * @type {HTMLInputElement}
     */
    (this.querySelector('.event__type-input')).focus();
  }

  close(){
    /**
     * @type {HTMLInputElement}
     */
    (this.querySelector('.event__type-toggle')).checked = false;
  }

  /**
   * @param {Event & {target: HTMLInputElement}} event
   */
  handleChange(event) {
    if(event.target.type === 'checkbox') {
      return event.stopImmediatePropagation();
    }
    this.setValue(event.target.value);
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleKeydown(event) {
    if (event.key === 'Escape' && this.querySelector('.event__type-toggle:checked')) {
      event.stopPropagation();
      this.close();
    } else if (event.key === ' ') {
      this.open();
    }
  }

  /**
   * @param {FocusEvent & {relatedTarget: Element}} event
   */
  handleBlur(event) {
    if (!this.contains(event.relatedTarget)) {
      this.close();
    }
  }

  handlePointerUp(event) {
    if (event.target.closest('.event__type-item')) {
      this.close();
    }
  }

  handlePointerDown(event) {
    const elem = event.target.closest('.event__type-item');
    if (elem) {
      this.setValue(elem.querySelector('input').value);
      this.dispatchEvent(new Event('change'));
    }
  }
}

customElements.define(String(PointTypeView), PointTypeView);
