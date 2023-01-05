//базовое представление которое будут наследовать все другие представления
//ну типа вообще у каждого компонента есть методы которые стандартны и везде повторяются
//поэтому в класс выносим и наследуем
export default class View extends HTMLElement {
  constructor() {
    super();

    this.insertAdjacentHTML('beforeend', this.createHtml(...arguments));
  }

  createHtml() {
    void arguments;

    return '';
  }

  static get localName() {
    return this.name.replace(/(?!^)[A-Z]/g, '-$&').toLowerCase();
  }

  static toString() {
    return this.localName;
  }
}
