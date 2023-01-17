import Presenter from './presenter';
import {pointTitleMap} from '../maps';
import {PointType} from '../enums';

/**,
 * @extends {Presenter<NewPointEditorView>},
 */
export default class NewPointEditorPresenter extends Presenter {
  constructor() {
    super(...arguments);
    //console.log(this, 'connected')

    const pointTypeOptions = Object.entries(pointTitleMap)
      .map(([value, title]) => ({value, title}));
    this.view.pointTypeView.setOptions(pointTypeOptions);
    this.view.pointTypeView.setValue(PointType.TRAIN);

    const allDestinations = this.destinationsModel.listAll();
    const destinationOptions = allDestinations.map((destination) => ({value: destination.name, title: ''}));
    this.view.destinationView.setOptions(destinationOptions);

    this.view.addEventListener('submit', this.handleViewSubmit.bind(this));
    this.view.addEventListener('close', this.handleViewClose.bind(this));
    //TODO: ты забыла про это событие (когда жмем на кнопку cancel у нее type reset и срабатывает это событие)
    this.view.addEventListener('reset', this.handleViewReset.bind(this));
  }

  handleNavigation() {
    if (location.pathname === '/new') {
      //console.log('открыть редактор')
      this.view.open();
      //в качестве обработчика событий мы можем передать не только функцию но и объект у которого есть определенный метод handleEvent
    } else {
      //console.log('закрыть редактор')
      //не нотифай потому что иначе будет бесконечная цепочка событий и тд
      this.view.close(false);
    }
    //this.navigate()
  }

  /**
   * @param {SubmitEvent} event
   */
  handleViewSubmit(event) {
    event.preventDefault();
  }

  handleViewReset() {
    this.view.close();
  }

  handleViewClose() {
    this.navigate('/');
  }
}
