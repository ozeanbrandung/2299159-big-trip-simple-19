import Adapter from './adapter';

export default class DestinationAdapter extends Adapter {
  /**
   * @param {Destination} data //partial означал что может ожидаться частичный объект, а тут все св-ва обязательны
   */
  constructor(data ) {
    super();

    this.id = String(data.id);
    this.decription = data.description;
    this.name = data.name;
    //чтобы исключить возможность изменения данных - мутабельности - надо не по ссылке передать массив, а завести новый
    //this.pictures = data.pictures;
    this.pictures = data.pictures.map((picture) => ({...picture}));
  }

  //обратная конвертация не нужна мы никуда на сервер дестинэйшены не отправляем так что не надо toJSON
}
