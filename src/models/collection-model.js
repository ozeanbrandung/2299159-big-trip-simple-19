import Model from './model';

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 */
export default class CollectionModel extends Model {
  #store;
  #adapt;
  #filter;
  #sort;
  #items;

  /**
   * @param {Object} setup
   * @param {Store<Item>} setup.store
   * @param {AdaptCallback<Item,ItemAdapter>} setup.adapt
   * @param {FilterCallback<ItemAdapter>} [setup.filter]
   * @param {SortCallback<ItemAdapter>} [setup.sort]
   */
  constructor(setup) {
    super();

    this.#store = setup.store;
    this.#adapt = setup.adapt;
    this.#sort = setup.sort;
    this.#filter = setup.filter;
  }

  /**
   * @override
   */
  async ready() {
    this.#items = await this.#store.list();
  }

  /**
   * @param {FilterCallback<ItemAdapter>} filter
   */
  setFilter(filter, notify = true) {
    this.#filter = filter;
    if (notify) {
      this.dispatchEvent(new CustomEvent('filter'));
    }
  }

  getFilter() {
    return this.#filter;
  }

  /**
   * @param {SortCallback<ItemAdapter>} sort
   */
  setSort(sort, notify = true) {
    this.#sort = sort;

    if (notify) {
      this.dispatchEvent(new CustomEvent('sort'));
    }
  }

  getSort() {
    return this.#sort;
  }

  list(
    filter = this.getFilter(),
    sort = this.getSort()
  ) {
    return this.listAll().filter(filter).sort(sort);
  }

  listAll() {
    return this.#items.map(this.#adapt);
  }

  /**
   * @param {number} [index]
   */
  item(index) {
    if (arguments.length) {
      const item = this.#items[index];
      return item && this.#adapt(this.#items[index]);
    }
    return this.#adapt();
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  findBy(key, value) {
    return this.listAll().find((item) => item[key] === value);
  }

  /**
   * @param {string} id
   */
  findById(id) {
    return this.findBy('id', id);
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  findIndexBy(key, value) {
    return this.listAll().findIndex((item) => item[key] === value);
  }

  /**
   * @param {string} id
   */
  findIndexById(id) {
    return this.findIndexBy('id', id);
  }

  /**
   * @param {ItemAdapter} item
   */
  async add(item) {
    const newItem = await this.#store.add(item.toJSON());
    const detail = this.#adapt(newItem);

    this.#items.push(newItem);
    this.dispatchEvent(new CustomEvent('add', {detail}));

    return detail;
  }

  /**
   * @param {ItemAdapter} item
   */
  async update(item) {
    const newItem = await this.#store.update(item.toJSON());
    const index = this.findIndexById(item.id);
    const detail = {newItem: this.#adapt(newItem), oldItem: this.item(index) };
    this.#items.splice(index, 1, newItem);
    this.dispatchEvent(new CustomEvent('update', {detail}));

    return detail;
  }

  /**
   * @param {string} id
   */
  async delete(id) {
    await this.#store.delete(id);
    const itemToDelete = this.findById(id);
    const detail = this.#adapt(itemToDelete);
    this.#items = this.#items.filter((item) => item.id !== id);
    this.dispatchEvent(new CustomEvent('delete', {detail}));

    return detail;
  }
}
