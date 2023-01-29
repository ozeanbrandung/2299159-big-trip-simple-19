import './view.css';

//базовое представление которое будут наследовать все другие представления
//ну типа вообще у каждого компонента есть методы которые стандартны и везде повторяются
//поэтому в класс выносим и наследуем
export default class View extends HTMLElement {
  constructor() {
    super();

    this.insertAdjacentHTML('beforeend', this.createHtml(...arguments));
  }

  createHtml() {
    //TODO: почему оно здесь вообще указано
    //ладно возвращение пустой строки - все равно этот метод тут прописан только для того, чтобы он потом переписался в потомках
    //но вот аргументы зачем
    //и мы их и сюда и в конструктор передаем но они почему-то тут в скобках не указаны - почему так
    void arguments;

    return '';
  }

  shake() {
    this.classList.add('shake');
    this.addEventListener('animationend', ()=> {
      this.classList.remove('shake');
      //как только событие произойдет один раз, будет автоматически отписка осуществлена от события
    }, {once: true});
  }

  static get localName() {
    return this.name.replace(/(?!^)[A-Z]/g, '-$&').toLowerCase();
  }

  static toString() {
    return this.localName;
  }
}
