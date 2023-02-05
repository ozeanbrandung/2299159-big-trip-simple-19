import View from './view';
import PointView from './point-view';

//тут мы форматируем все для PointView
//типа как point view у нас тупой компонент а это компонент над ним с какой-то уже вьюшной логикой типа форматирования и тд
export default class ListView extends View {
  /**
   * @param {PointViewState[]} states
   */
  setItems(states) {
    const views = states.map((state) => new PointView(state)); //тут у нас получится список дом элементов
    //причем у нас это уже кастомный компонент так что он уже в разметке и его не надо никуда вставлять
    //но нам нужно обновить содержиое этого кастомного компонента

    //полезные методы из dom api: replaceWith - заменяет элемент на другой элемент, replaceChildren - заменяет чилдренов на другой элемент
    this.replaceChildren(...views);
    //для анимации
    return views;
  }

  /**
   * @param {string} id
   * @return {PointView}
   */
  findById(id) {
    //вдруг data-id есть и у других элементов так что указываем что нам именно тег point-view нужен
    //и чтобы в случае его переименования тут не надо было чот менять динамически строка получается из класса
    return this.querySelector(`${PointView}[data-id="${id}"]`);
  }
}

customElements.define(String(ListView), ListView);
