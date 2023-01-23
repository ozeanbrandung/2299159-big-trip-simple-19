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
  //сохраняем объекты полученные из хранилища чтобы каждый раз на сервер не бегать
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
    this.#items = await this.#store.list(); //без await присвоится сам промис, а не то чего мы "ждем"
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
    //return this.#adapt(this.#items); нет! коллбэк adapt не будет пробегаться по массиву! это мы сейчас пробегаемся и для каждого элемента выполняем adapt
    return this.#items.map(this.#adapt);
  }

  /**
   * @param {number} [index]
   */
  item(index) {
    //arguments - это объект который содержит аргументы передаваемые в объект или в функцию (в стрелочной функции нет доступа к этому объекту)
    //console.log('argumnets of method item at collection model', arguments);
    if (arguments.length) {
      const item = this.#items[index];
      //return this.#items.find((_, idx) => idx === index); ну ты конечно даешь зачем такое усложнение для поиска по индексу! по индексу мы не ищем а обращаемся
      return item && this.#adapt(this.#items[index]); //и сразу адаптируем и проверяем а нашелся ли вообще айтем
    }
    //создаем тупа тогда пустой объект
    return this.#adapt();
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  findBy(key, value) {
    //return this.#items.find((item) => item[key] === value); //ну ты забыла что ты бежишь по неадаптированному листу а key-то у нас будет фроновый
    return this.listAll().find((item) => item[key] === value);
  }

  /**
   * @param {string} id
   */
  findById(id) {
    //return this.listAll().find((item) => item.id === id);
    //мы переиспользуем метод который уже написали!!! чтобы не писать одно и то же
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

    //бля была ошибка из-за этого дерьма
    //this.#items = this.#items.push(newItem);
    this.#items.push(newItem);
    //далее нам нужно сообщить что новый элемент добавлен и ui должен обновиться
    //делаем это с помощью уже существующего для этого браузерного api
    this.dispatchEvent(new CustomEvent('add', {detail}));

    return detail;
  }

  /**
   * @param {ItemAdapter} item
   */
  async update(item) {
    //отправляем запрос серверу
    const newItem = await this.#store.update(item.toJSON());
    //синхронизируем сохраненную тут в классе дату (локальную копию)
    //то есть в данном случае нам нужно заменить элемент в массиве на другой вот несколько способов сделать это:
    // 1) через map:
    // let oldItem;
    // this.#items = this.#items.map((listItem) => {
    //   if (listItem.id === newItem.id) {
    //     oldItem = listItem;
    //     return newItem;
    //   }
    //   return listItem;
    // });
    // const detail = {newItem, oldItem};
    // 2) slice: изменяет исходный массив, поэтому нужно все копировать в новый типа [...arr.slice(0, 1), newItem, ...arr.slice(2)]
    // 3) splice: же сразу возвращает новый массив так что он тут больше подходит чем slice!
    //и вообще этот способ самый лаконичный
    const index = this.findIndexById(item.id);
    //сначла создаем инфу для ивента поскольку нам нужен старый элемент
    const detail = {newItem: this.#adapt(newItem), oldItem: this.item(index) };
    //а уж только после этого удаляем этот старый элемент из массива и меняем его на новый
    this.#items.splice(index, 1, newItem);
    //адаптируем новый элемент для отправки с событием update
    //далее нам нужно сообщить что новый элемент добавлен и ui должен обновиться
    //делаем это с помощью уже существующего для этого браузерного api
    this.dispatchEvent(new CustomEvent('update', {detail}));

    return detail;
  }

  /**
   * @param {string} id
   */
  async delete(id) {
    //первым делом удаляем потому что если удаления не произойдет код остановится
    await this.#store.delete(id);
    //const itemToDelete = this.#items.find((item) => item.id === id);
    //зачем код дублировать если мы написали метод для этого???
    const itemToDelete = this.findById(id);
    //const detail = {deletedItem: this.#adapt(itemToDelete)};
    const detail = this.#adapt(itemToDelete);
    this.#items = this.#items.filter((item) => item.id !== id);
    //еще один способ:
    //this.#items.splice(index, 1);
    this.dispatchEvent(new CustomEvent('delete', {detail}));

    return detail;
  }
}
