import {render} from '../../render';
import {SortView} from '../view/sort.view';
import WaypointsListView from '../view/waypoints-list.view';
import {WaypointView} from '../view/waypoint.view';
import {FormCreateView} from '../view/form-create.view';
import FormEditView from '../view/form-edit.view';
import WaypointItemContainerView from '../view/waypoint-item-container.view';
import {OfferView} from '../view/offer.view';
import {getMockOffersByType} from '../mock/offers';
import getMockDestinations from '../mock/destinations';

export default class EventsPresenter {
  sortComponent = new SortView();
  //createFormComponent = new FormCreateView();
  //editFormComponent = new FormEditView();
  eventsListComponent = new WaypointsListView();
  //eventItemContainerComponent = new WaypointItemContainerView();
  eventComponents = [];
  eventsItemsContainers = [];

  constructor({eventsContainer, pointsModel}) {
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    //component, container, place
    render(this.sortComponent, this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    for (let i = 0; i < this.points.length; i++) {
      this.eventsItemsContainers[i] = new WaypointItemContainerView();
      if (i === 0) {
        const allDestinations = getMockDestinations();
        const allOffersOfCurrentType = getMockOffersByType(this.points[i].type);
        const createFormComponent = new FormCreateView(this.points[i], allDestinations, allOffersOfCurrentType);
        render(createFormComponent, this.eventsItemsContainers[i].getElement());
      } else if (i === 2) {
        const allDestinations = getMockDestinations();
        const allOffersOfCurrentType = getMockOffersByType(this.points[i].type);
        const editFormComponent = new FormEditView(this.points[i], allDestinations, allOffersOfCurrentType);
        render(editFormComponent, this.eventsItemsContainers[i].getElement());
      } else {
        this.eventComponents[i] = new WaypointView({waypoint: this.points[i]});
        render(this.eventComponents[i], this.eventsItemsContainers[i].getElement());

        const offersContainer = this.eventComponents[i].getElement().querySelector('.event__selected-offers');
        const allOffersOfCurrentType = getMockOffersByType(this.points[i].type);
        this.points[i].offers.forEach((offerId) => {
          const currentOffer = allOffersOfCurrentType.find((item) => item.id === offerId);
          if (currentOffer) {
            render(new OfferView(currentOffer), offersContainer);
          }
        });
      }

      //без getElement инстас класса просто инстанс класса а не элемент!
      render(this.eventsItemsContainers[i], this.eventsListComponent.getElement());
    }
  }
}
