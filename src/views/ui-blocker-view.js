import View from './view';
import './ui-blocker-view.css';

/**
* @implements {EventListenerObject}
*/
export default class UiBlockerView extends View {
  constructor() {
    super();

    this.classList.add('ui-blocker');
  }

  toggle(flag) {
    if(flag) {
      document.body.append(this);
      document.addEventListener('keydown', this);
    } else {
      this.remove();
      document.removeEventListener('keydown', this);
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    event.preventDefault();
  }
}

customElements.define(String(UiBlockerView), UiBlockerView);
