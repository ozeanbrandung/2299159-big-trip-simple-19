import NewPointEditorView from './new-point-editor-view';
import {html} from '../utils';
import {deleteButtonTextMap} from '../maps';

export default class PointEditorView extends NewPointEditorView {
  constructor() {
    super(...arguments);

    this.pointView = null;

    this.awaitDelete(false);
    //кнопка для закрытия формы - кнопка стрелка вверх
    this.querySelector('header').insertAdjacentHTML('beforeend', this.createCloseButtonHtml());
    this.addEventListener('click', this.handleClick);
  }

  /**
   * @override
   */
  open() {
    //функциональность метода род класса в целом устраивает
    super.open();
    //кроме того факта что в родительском методе мы припендим редактор в начлало списка
    //а нам надо на то место где сама точка маршрута находится
    this.pointView = this.listView.findById(this.dataset.id);
    //поинт вью надо заменить на поинт эдитор вью
    this.pointView.replaceWith(this);

    //биндим потому что иначе контекст - это кликнутая кнопка
    //TODO: если мы тут подписываемся то у нас утечка памяти - мы не удаляем хэндлер нигде и каждый раз на опен его создаем
    //TODO: поэтому просто подписываемся в конструкторе на клик по вьюхе - там байнд уже не нужен - контекст - сама вьюха
    //this.querySelector('.event__rollup-btn').addEventListener('click', this.handleCloseButtonClick.bind(this));
  }

  /**
   * @override
   */
  close() {
    //возвращаем точку после закрытия редактора
    this.replaceWith(this.pointView);
    this.pointView?.fadeInLeft();
    this.pointView = null;

    super.close(...arguments);
  }

  // handleCloseButtonClick() {
  //   this.close();
  // }
  //TODO: вместо handleCloseButtonClick
  /**
   * @param {MouseEvent & {target: Element}} event
   */
  handleClick(event) {
    //определяем что нажата именно кнопка закрытия а не на нее вешаем обработчик
    //TODO: все всплывающие события таким образом мы можем отловить даже если нам надо несколько кнопок следить
    //TODO: а если событие не всплывает то надо захват использовать
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }

  /**
   * @param {boolean} flag
   */
  awaitDelete(flag) {
    //заменить текст кнопки cancel
    const text = deleteButtonTextMap[Number(flag)];
    this.querySelector('.event__reset-btn').textContent = text;

    this.uiBlockerView.toggle(flag);
  }

  createCloseButtonHtml() {
    return html`
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Close event</span>
      </button>
    `;
  }

}

customElements.define(String(PointEditorView), PointEditorView);
