import View from './view';
import {html} from '../utils';
import PointTypeView from './common/point-type-view';
import OffersView from './common/offers-view';
import DestinationView from './common/destination-view';
import DestinationDetailsView from './common/destination-details-view';
import DatesView from './common/dates-view';
import BasePriceView from './common/base-price-view';
import {saveButtonTextMap} from '../maps';
import UiBlockerView from './ui-blocker-view';

/**
 * @implements {EventListenerObject}
 */
export default class NewPointEditorView extends View {
  constructor(listView) {
    super();

    this.classList.add('trip-events__item');

    /**
     * @type {ListView}
     */
    this.listView = listView;
    /**
     * @type {PointTypeView}
     */
    this.pointTypeView = this.querySelector(String(PointTypeView));
    /**
     * @type {DestinationView}
     */
    this.destinationView = this.querySelector(String(DestinationView));
    /**
     * @type {OffersView}
     */
    this.offersView = this.querySelector(String(OffersView));

    /**
     * @type {DestinationDetailsView}
     */
    this.destinationDetailsView = this.querySelector(String(DestinationDetailsView));

    /**
     * @type {DatesView}
     */
    this.datesView = this.querySelector(String(DatesView));

    /**
     * @type {BasePriceView}
     */
    this.basePriceView = this.querySelector(String(BasePriceView));

    this.uiBlockerView = new UiBlockerView();
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <form class="event event--edit" action="#" method="post" novalidate>
        <header class="event__header">
          <${PointTypeView}></${PointTypeView}>
          <${DestinationView}></${DestinationView}>
          <${DatesView}></${DatesView}>
          <${BasePriceView}></${BasePriceView}>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <${OffersView}></${OffersView}>
          <${DestinationDetailsView}></${DestinationDetailsView}>
        </section>
      </form>
    `;
  }

  open() {
    this.datesView.createCalendars();
    this.listView.prepend(this);
    this.fadeInRight();
    document.addEventListener('keydown', this);
  }

  close(notify = true) {
    this.remove();
    this.datesView.destroyCalenders();
    document.removeEventListener('keydown', this);
    if (notify) {
      this.dispatchEvent(new CustomEvent('close'));
    }
  }

  /**
   * @param {boolean} flag
   */
  awaitSave(flag) {
    const text = saveButtonTextMap[Number(flag)];

    this.querySelector('.event__save-btn').textContent = text;

    this.uiBlockerView.toggle(flag);
  }

  /**
   * @param {string} name
   */
  findByName(name) {
    return this.querySelector('form').elements[name];
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if(event.key === 'Escape') {
      this.close();
    }
  }
}

customElements.define(String(NewPointEditorView), NewPointEditorView);
