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
    //вот этой строкой мы оставляем себе возможность кинуть какие-то аргументы в createHtml конструктор
    void arguments;

    return '';
  }

  // shake() {
  //   this.classList.add('shake');
  //   //console.log(this, this.classList)
  //   this.addEventListener('animationend', () => {
  //     this.classList.remove('shake');
  //     //как только событие произойдет один раз, будет автоматически отписка осуществлена от события
  //   }, {once: true});
  // }

  /**
   * @param {KeyframeAnimationOptions} [options]
   */
  shake(options) {
    const keyframes = {
      transform: [0, -5, 0, 5, 0].map((value) => `translateX(${value}px)`)
    };

    return this.animate(keyframes, {
      duration: 150,
      iterations: 4,
      ...options
    });
  }

  /**
   * @param {KeyframeAnimationOptions} [options]
   * @param {PropertyIndexedKeyframes} [extraKeyframes]
   */
  fadeIn(options, extraKeyframes) {
    const keyframes = {
      opacity: [0, 1],
      ...extraKeyframes
    };

    return this.animate(keyframes, {
      duration: 300,
      easing: 'ease',
      fill: 'both',
      ...options
    });
  }

  /**
   * @param {KeyframeAnimationOptions} [options]
   */
  fadeInLeft(options) {
    return this.fadeIn(options, {
      transform: ['translateX(40px)', 'none']
    });
  }

  /**
   * @param {KeyframeAnimationOptions} [options]
   */
  fadeInRight(options) {
    return this.fadeIn(options, {
      transform: ['translateX(-40px)', 'none']
    });
  }

  static get localName() {
    return this.name.replace(/(?!^)[A-Z]/g, '-$&').toLowerCase();
  }

  static toString() {
    return this.localName;
  }
}
