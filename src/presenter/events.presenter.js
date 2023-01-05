import {render} from '../render';
import {SortView} from '../view/sort.view';
import WaypointsListView from '../view/waypoints-list.view';
import {WaypointView} from '../view/waypoint.view';
import {FormCreateView} from '../view/form-create.view';
import FormEditView from '../view/form-edit.view';
import WaypointItemContainerView from '../view/waypoint-item-container.view';

export default class EventsPresenter {
  sortComponent = new SortView();
  createFormComponent = new FormCreateView();
  editFormComponent = new FormEditView();
  eventsListComponent = new WaypointsListView();
  //eventItemContainerComponent = new WaypointItemContainerView();
  eventComponents = [];
  eventsItemsContainers = [];

  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    //component, container, place
    render(this.sortComponent, this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    for (let i = 0; i < 5; i++) {
      this.eventsItemsContainers[i] = new WaypointItemContainerView();
      if (i === 0) {
        render(this.createFormComponent, this.eventsItemsContainers[i].getElement());
      } else if (i === 2) {
        render(this.editFormComponent, this.eventsItemsContainers[i].getElement());
      } else {
        this.eventComponents[i] = new WaypointView();
        render(this.eventComponents[i], this.eventsItemsContainers[i].getElement());
      }

      //без getElement инстас класса просто инстанс класса а не элемент!
      render(this.eventsItemsContainers[i], this.eventsListComponent.getElement());
    }
  }
}
