import Adapter from './adapter';

export default class PointAdapter extends Adapter {
  /**
   * @param {Partial<Point>} data
   */
  constructor(data = {}) {
    super();

    this.basePrice = data.base_price;
    this.startDate = data.date_from;
    this.endDate = data.date_to;
    this.destinationId = data.destination?.toString();
    this.id = data.id;
    this.offersIds = data.offers?.map(String);
    this.type = data.type;
  }

  get endDateAsNumber() {
    return Date.parse(this.endDate);
  }

  get startDateAsNumber() {
    return Date.parse(this.startDate);
  }

  /**
   * @override
   * @return {Partial<Point>}
   */
  toJSON() {
    return {
      'base_price': this.basePrice,
      'date_from': this.startDate,
      'date_to': this.endDate,
      destination: Number(this.destinationId),
      id: this.id,
      offers: this.offersIds?.map(Number),
      type: this.type,
    };
  }
}
