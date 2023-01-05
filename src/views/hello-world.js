//custom elements
import {html} from '../utils';

export default class HelloWorldView extends HTMLElement {
  constructor() {
    //при наследовании в конструкторе первым делом всегда вызываем super()
    super();
    //теперь мы можем к this обращаться как к dom элементу
    this.innerHTML = html`<h1>Hello World</h1>`;
  }

  changeColor() {
    this.style.color = 'pink';
  }
}

//регистрируем пользовательский элемент
//название должно быть с дефисом
customElements.define('hello-world', HelloWorldView);
