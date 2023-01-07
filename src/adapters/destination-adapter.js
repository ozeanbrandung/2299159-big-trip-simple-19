import Adapter from './adapter';

export default class DestinationAdapter extends Adapter {
  /**
   * @param {Partial<Destination>} data
   */
  constructor(data = {}) {
    super();

    this.id = String(data.id);
    this.decription = data.description;
    this.name = data.name;
    this.pictures = data.pictures;
  }

  // /**
  //  * @override
  //  * @return {Partial<Point>}
  //  */
  // toJSON() {
  //   return {
  //     'base_price': this.basePrise,
  //     'date_from': this.startDate,
  //     'date_to': this.endDate,
  //     destination: Number(this.destinationId),
  //     id: this.id,
  //     offers: this.offersIds.map(Number);
  //     type: this.type,
  //   };
  // }
}
