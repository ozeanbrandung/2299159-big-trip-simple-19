import View from '../view';
import {html} from '../../utils';
import createCalendar from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

export default class DatesView extends View {
  /**
   * @type {Calendar}
   */
  #startDateCalendar;

  /**
   * @type {CalendarConfig}
   */
  #startDateConfig;

  /**
   * @type {Calendar}
   */
  #endDateCalendar;

  /**
   * @type {CalendarConfig}
   */
  #endDateConfig;

  constructor() {
    super();

    this.classList.add('event__field-group', 'event__field-group--time');

    this.addEventListener('keydown', this.handleKeydown, true);
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <label class="visually-hidden" for="event-start-time-1">From</label>

      <input
        class="event__input  event__input--time"
        id="event-start-time-1"
        type="text"
        name="date_from"
      >

      &mdash;

      <label class="visually-hidden" for="event-end-time-1">To</label>

      <input
        class="event__input  event__input--time"
        id="event-end-time-1"
        type="text"
        name="date_to"
      >
    `;
  }

  /**
   * @param {CalendarConfig} config
   */
  setConfig(config) {
    const defaultConfig = {
      enableTime: true,
      monthSelectorType: 'static',
      static: true
    };

    this.#startDateConfig = {
      onChange: ([value]) => this.#endDateCalendar.set('minDate', value),
      ...defaultConfig,
      ...config,
    };

    this.#endDateConfig = {
      ...defaultConfig,
      ...config,
    };
  }

  createCalendars() {
    const [startDateElem, endDateElem] = this.querySelectorAll('input');

    this.#startDateCalendar = createCalendar(startDateElem, this.#startDateConfig);
    this.#endDateCalendar = createCalendar(endDateElem, this.#endDateConfig);
  }

  destroyCalenders() {
    this.#startDateCalendar?.destroy();
    this.#endDateCalendar?.destroy();
  }

  /**
   * @param {string[]} values
   */
  setValues(values) {
    const [startDate, endDate] = values;
    this.#startDateCalendar.setDate(startDate, true);
    this.#endDateCalendar.setDate(endDate);
  }

  getValues() {
    return [
      this.#startDateCalendar.selectedDates[0]?.toJSON(),
      this.#endDateCalendar.selectedDates[0]?.toISOString()
    ];
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleKeydown(event) {
    if (event.key === 'Escape' && (this.#startDateCalendar.isOpen || this.#endDateCalendar.isOpen)) {
      event.stopImmediatePropagation();
      this.#startDateCalendar.close();
      this.#endDateCalendar.close();
    }
  }
}

customElements.define(String(DatesView), DatesView);
