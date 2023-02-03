import Presenter from './presenter';
import {sortCallbackMap, sortTitleMap} from '../maps';
import {findKey} from '../utils';
import {SortType} from '../enums';

/**,
 * @extends {Presenter<SortView>},
 */
export default class SortPresenter extends Presenter {
  constructor() {
    super(...arguments);

    const sorts = Object.entries(sortTitleMap).map(([value, title]) => ({value, title}));

    this.view.setOptions(sorts);

    //при первом запуске
    this.updateViewValue();
    //при первом запуске нам надо определить - вдруг мы сортировку должны скрыть потому что нет элементов или что-то еще
    this.updateViewVisibility();

    this.view.addEventListener('change', this.handleViewChange.bind(this));

    //подписываемся на то что у нас эдитятся удаляются или добавляются какие-то элементы в листе
    //вдруг ничего не останется и потребуется задизайблить сорт
    //апдейт потому что мы можем поменять дату и в определненной сортировке больше не станет элементов
    this.pointsModel.addEventListener('update', this.handlePointsModelUpdate.bind(this));
    this.pointsModel.addEventListener('add', this.handlePointsModelAdd.bind(this));
    this.pointsModel.addEventListener('delete', this.handlePointsModelDelete.bind(this));
    this.pointsModel.addEventListener('filter', this.handlePointsModelFilter.bind(this));
  }

  updateViewValue() {
    const sort = this.pointsModel.getSort();

    const sortType = findKey(sortCallbackMap, sort);

    //console.log(sortType)

    this.view.setValue(sortType);
  }

  updateViewVisibility(){
    //list в отличие от listAll возвращает с учетом фильтрации
    this.view.hidden = !this.pointsModel.list().length;
  }

  handlePointsModelUpdate() {
    this.updateViewVisibility();
  }

  handlePointsModelAdd() {
    this.updateViewVisibility();
  }

  handlePointsModelDelete() {
    this.updateViewVisibility();
  }

  handleViewChange() {
    const sortType = this.view.getValue();

    //console.log(sortType)
    //Вызов navigate() нужно сделать перед setFilter() и setSort()
    // Тогда редактор сможет произвести закрытие до того, как список, реагирующий на смену фильтра и сортировки, перерисуется.
    this.navigate('/');
    this.pointsModel.setSort(sortCallbackMap[sortType]);
  }

  handlePointsModelFilter() {
    //это действие вызовет двойную перерисовку списка - сначала на фильтер потом на сорт события
    //поэтому notify ставим false - не будем уведомлять о событии sort
    this.pointsModel.setSort(sortCallbackMap[SortType.DAY], false);
    this.updateViewValue();
    this.updateViewVisibility();
  }
}
