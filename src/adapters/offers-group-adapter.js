import Adapter from './adapter';

export default class OffersGroupAdapter extends Adapter {
  /**
   * @param {OfferGroup} data //partial тут тоже не нужен - все св-ва объекта тут обязательны
   */
  constructor(data) {
    super();

    //все равно тип должен быть уникальным так что мы можем пренебречь тем что это именно тип и назвать это id
    this.id = data.type;
    //а надо ли прайс в стринг??? ОТВЕТ: нет а вдруг нам сумму придется считать
    //this.offers = data.offers.map((offer) => ({id: String(offer.id), title: offer.title, price: String(offer.price)}));
    this.offers = data.offers.map((offer) => ({
      ...offer,
      id: String(offer.id)
    }));
  }

  //toJSON нам тоже тут не нужен - на сервер мы такие объекты не будем отправлять
}
