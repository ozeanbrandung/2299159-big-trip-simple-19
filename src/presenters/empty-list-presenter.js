import Presenter from './presenter';
import {findKey} from '../utils';
import {emptyListTitleMap, filterCallbackMap} from '../maps';

/**
 * @extends {Presenter<HTMLParamElement>},
 */
export default class EmptyListPresenter extends Presenter {
  constructor() {
    super(...arguments);

    this.pointsModel.addEventListener('update', this.handlePointsModelUpdate.bind(this));
    this.pointsModel.addEventListener('add', this.handlePointsModelAdd.bind(this));
    this.pointsModel.addEventListener('delete', this.handlePointsModelDelete.bind(this));
    this.pointsModel.addEventListener('filter', this.handlePointsModelFilter.bind(this));
  }

  updateView() {
    const points = this.pointsModel.list();
    const filter = this.pointsModel.getFilter();
    const filterType = findKey(filterCallbackMap, filter);
    this.view.hidden = Boolean(points.length) || this.location.pathname === '/new';
    this.view.textContent = emptyListTitleMap[filterType];
  }

  handleNavigation() {
    this.updateView();
  }

  handlePointsModelUpdate() {
    this.updateView();
  }

  handlePointsModelAdd() {
    this.updateView();
  }

  handlePointsModelDelete() {
    this.updateView();
  }

  handlePointsModelFilter() {
    this.updateView();
  }
}
