import View from './view';
//import {html} from '../utils';
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
      //запрещаем навигацию по табу
      //document.addEventListener('keydown', this.handleDocumentKeydown);
      //можно передать просто this и тогда выполнится handleEvent данного класса по умолчанию
      //а так как у нас тут единственный обработчик то и ок
      document.addEventListener('keydown', this);
    } else {
      //document.body.remove(); нет!
      this.remove();
      //возвращаем возможность навигироваться по табам
      //document.removeEventListener('keydown', this.handleDocumentKeydown);
      document.removeEventListener('keydown', this);
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  //handleDocumentKeydown(event) {
  handleEvent(event) {
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
