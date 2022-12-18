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
    render(this.createFormComponent, this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    for (let i = 0; i < 3; i++) {
      this.eventsItemsContainers.push(new WaypointItemContainerView());
      this.eventComponents.push(new WaypointView());
      //без getElement инстас класса просто инстанс класса а не элемент!
      render(this.eventsItemsContainers[i], this.eventsListComponent.getElement());
      if (i === 0) {
        render(this.editFormComponent, this.eventsItemsContainers[i].getElement());
      } else {
        render(this.eventComponents[i], this.eventsItemsContainers[i].getElement());
      }
    }
  }
}
