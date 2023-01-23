import Presenter from './presenter';

/**,
 * @extends {Presenter<HTMLButtonElement>},
 */
export default class NewPointButtonPresenter extends Presenter {
  constructor() {
    super(...arguments);
    //console.log('is connected')
    //console.log(this)
    //кнопку привязываем к слушателю клика, биндим потому что контекст тогда не класса будет а элемент на котором произошел клик
    //то есть прямо html-ник кнопки будет this а мы биндим класс
    this.view.addEventListener('click', this.handleButtonClick.bind(this));
  }

  /**
   * @override
   */
  handleNavigation() {
    //слишком длинная запись!
    //if (this.location.pathname === '/new')
    //так не работает!
    //this.location.pathname === '/new' && this.view.disabled = true
    this.view.disabled = this.location.pathname === '/new';
  }

  handleButtonClick(){
    this.navigate('/new');
  }
}
