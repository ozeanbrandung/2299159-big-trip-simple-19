import Presenter from './presenter';
import {filterCallbackMap, filterTitleMap} from '../maps';
import {findKey} from '../utils';

/**,
 * @extends {Presenter<FilterView>},
 */
export default class FilterPresenter extends Presenter {
  constructor() {
    super(...arguments);
    const options = Object.entries(filterTitleMap).map(([value, title]) => ({title, value}));
    //console.log(options)
    //console.log('presenter')
    this.view.setOptions(options);

    //сразу же обновляем какой выбран пункт
    this.updateViewValue();
    //контекстом будет вьющка без байнда
    this.view.addEventListener('change', this.handleViewChange.bind(this));
  }

  updateViewValue() {
    //console.log(this.pointsModel)
    const filter = this.pointsModel.getFilter();
    //const filterType = Object.keys(filterCallbackMap).find((key) => filterCallbackMap[key] === filter);
    //TODO: нужна утилита которая будет осуществлять этот поиск типа (он еще и в сортировке нужен будет)
    const filterType = findKey(filterCallbackMap, filter);
    this.view.setValue(filterType);
  }

  handleViewChange() {
    const filterType = this.view.getValue();
    //console.log(filterType)
    //Вызов navigate() нужно сделать перед setFilter() и setSort()
    // Тогда редактор сможет произвести закрытие до того, как список, реагирующий на смену фильтра и сортировки, перерисуется.
    // а до этого происходило закрытие формы как сайд-эффект из-за того что лист перерисовывался (и при этом путь не менялся)
    this.navigate('/');
    this.pointsModel.setFilter(filterCallbackMap[filterType]);
  }
}
