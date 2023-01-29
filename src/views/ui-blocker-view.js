import View from './view';
//import {html} from '../utils';
import './ui-blocker-view.css';

export default class UiBlockerView extends View {
  constructor() {
    super();

    this.classList.add('ui-blocker');
  }

  toggle(flag) {
    if(flag) {
      document.body.append(this);
      //запрещаем навигацию по табу
      document.addEventListener('keydown', this.handleDocumentKeydown);
    } else {
      //document.body.remove(); нет!
      this.remove();
      //возвращаем возможность навигироваться по табам
      document.removeEventListener('keydown', this.handleDocumentKeydown);
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleDocumentKeydown(event) {
    event.preventDefault();
  }

  /**
   * @override
   */
  // createHtml() {
  //   return html`
  //
  //   `;
  // }
}

customElements.define(String(UiBlockerView), UiBlockerView);
