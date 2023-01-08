import Adapter from './adapter';

export default class PointAdapter extends Adapter {
  /**
   * @param {Partial<Point>} data
   */
  constructor(data = {}) {
    super();

    this.basePrise = data.base_price;
    this.startDate = data.date_from;
    this.endDate = data.date_to;
    this.destinationId = data.destination.toString(); //String(data.destination)
    this.id = data.id;
    //this.offersIds = data.offers.map((offerId) => String(offerId));
    //эта запись полностью аналогична следующей
    //если не будет офферов то все что после вопроса просто не вызовется
    this.offersIds = data.offers?.map(String);
    this.type = data.type;
  }

  /**
   * @override
   * @return {Partial<Point>}
   */
  toJSON() {
    return {
      'base_price': this.basePrise,
      'date_from': this.startDate,
      'date_to': this.endDate,
      destination: Number(this.destinationId),
      id: this.id,
      offers: this.offersIds?.map(Number),
      type: this.type,
    };
  }
}
