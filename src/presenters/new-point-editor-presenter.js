import Presenter from './presenter';
import {pointTitleMap} from '../maps';
import {PointType} from '../enums';
import {formatNumber, humanizeDateAndTime} from '../utils';


/**
 * @extends {Presenter<NewPointEditorView>},
 */
export default class NewPointEditorPresenter extends Presenter {
  constructor() {
    super(...arguments);

    const pointTypeOptions = Object.entries(pointTitleMap)
      .map(([value, title]) => ({value, title}));
    this.view.pointTypeView.setOptions(pointTypeOptions);
    this.view.pointTypeView.addEventListener('change', this.handlePointTypeViewChange.bind(this));

    const allDestinations = this.destinationsModel.listAll();
    const destinationOptions = allDestinations.map((destination) => ({value: destination.name, title: ''}));
    this.view.destinationView.setOptions(destinationOptions);
    this.view.destinationView.addEventListener('input', this.handleDestinationViewInput.bind(this));

    this.view.datesView.setConfig({
      formatDate: humanizeDateAndTime,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true,
    });

    this.view.addEventListener('submit', this.handleViewSubmit.bind(this));
    this.view.addEventListener('close', this.handleViewClose.bind(this));
    this.view.addEventListener('reset', this.handleViewReset.bind(this));
  }

  handleNavigation() {
    if (location.pathname === '/new') {
      const point = this.pointsModel.item();
      point.type = PointType.TAXI;
      this.view.open();
      this.updateView(point);
    } else {
      this.view.close(false);
    }
  }

  /**
   * @param {SubmitEvent} event
   */
  async handleViewSubmit(event) {
    event.preventDefault();
    this.view.awaitSave(true);
    try {
      const data = this.pointsModel.item();
      const destinationName = this.view.destinationView.getValue();
      const destination = this.destinationsModel.findBy('name', destinationName);
      const [startDate, endDate] = this.view.datesView.getValues();
      this.view.pointTypeView.getValue();

      data.type = this.view.pointTypeView.getValue();
      data.destinationId = destination?.id;
      data.startDate = startDate;
      data.endDate = endDate;
      data.basePrice = this.view.basePriceView.getValue();
      data.offersIds = this.view.offersView.getValues();

      await this.save(data);

      this.view.close();
    } catch (exception) {
      this.view.shake();

      if (exception.cause?.error) {
        const [{fieldName}] = exception.cause.error;
        this.view.findByName(fieldName)?.focus();
      }
    }

    this.view.awaitSave(false);
  }

  /**
   * @param {Event} event
   */
  handleViewReset(event) {
    void event;
    this.view.close();
  }

  handleViewClose() {
    this.navigate('/');
  }

  handlePointTypeViewChange() {
    const pointType = this.view.pointTypeView.getValue();
    const pointTitle = pointTitleMap[pointType];
    this.view.destinationView.setLabel(pointTitle);

    this.updateOffersView();
  }

  /**
   *
   * @param {PointAdapter} point
   */
  updateView(point) {
    const destination = this.destinationsModel.findById(point.destinationId);
    this.view.pointTypeView.setValue(point.type);
    this.view.destinationView.setLabel(pointTitleMap[point.type]);
    this.view.destinationView.setValue(destination?.name ?? '');
    this.view.datesView.setValues([point.startDate, point.endDate]);
    this.view.basePriceView.setValue(point.basePrice);
    this.updateOffersView(point.offersIds);
    this.updateDestinationDetailsView(destination);
  }

  /**
   * @param {string[]} offerIds
   */
  updateOffersView(offerIds = []) {
    const pointType = this.view.pointTypeView.getValue();

    const offersGroup = this.offerGroupsModel.findById(pointType);

    const options = offersGroup.offers.map((initialOffer) => ({
      ...initialOffer,
      price: formatNumber(initialOffer.price),
      checked: offerIds.includes(initialOffer.id),
    }));

    this.view.offersView.hidden = !options.length;

    this.view.offersView.setOptions(options);
  }

  /**
   * @param {DestinationAdapter} [destination]
   */
  updateDestinationDetailsView(destination) {
    this.view.destinationDetailsView.hidden = !destination;

    if (destination) {
      this.view.destinationDetailsView.setContent(destination);
    }
  }

  /**
   * @override
   * @param {PointAdapter} point
   */
  async save(point) {
    await this.pointsModel.add(point);
  }

  handleDestinationViewInput() {
    const destinationName = this.view.destinationView.getValue();
    const destination = this.destinationsModel.findBy('name', destinationName);
    this.updateDestinationDetailsView(destination);
  }
}
