import Adapter from './adapter';

export default class DestinationAdapter extends Adapter {
  /**
   * @param {Destination} data
   */
  constructor(data ) {
    super();

    this.id = String(data.id);
    this.decription = data.description;
    this.name = data.name;
    this.pictures = data.pictures.map((picture) => ({...picture}));
  }
}
