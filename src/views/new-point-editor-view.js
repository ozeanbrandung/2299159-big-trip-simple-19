import View from './view';
import {html} from '../utils';
import PointTypeView from './common/point-type-view';
import OffersView from './common/offers-view';
import DestinationView from './common/destination-view';
import DestinationDetailsView from './common/destination-details-view';
import DatesView from './common/dates-view';
import BasePriceView from './common/base-price-view';

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
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
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
    //append (в конец), appendChild, prepend (в начало), before, after
    //this.listView.appendChild(this.view);
    this.listView.prepend(this);
    //мы передаем кароч не функцию а обхект у которого его метод handleEvent метод будет вызван автоматически
    document.addEventListener('keydown', this);
  }

  close(notify = true) {
    this.remove();
    document.removeEventListener('keydown', this);
    if (notify) {
      //ты тут this. пропустила и event нихрена не диспачился
      this.dispatchEvent(new CustomEvent('close'));
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    //console.log('объект в качестве обр события')
    if(event.key === 'Escape') {
      this.close();
      //this.reset();
    }
  }
}

customElements.define(String(NewPointEditorView), NewPointEditorView);
