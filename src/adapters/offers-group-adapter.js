import Adapter from './adapter';

export default class OffersGroupAdapter extends Adapter {
  /**
   * @param {Partial<OfferGroup>} data
   */
  constructor(data = {}) {
    super();

    this.type = data.type;
    //а надо ли прайс в стринг???
    this.offers = data.offers.map((offer) => ({id: String(offer.id), title: offer.title, price: String(offer.price)}));
  }

  /**
   * @override
   * @return {Partial<OfferGroup>}
   */
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
