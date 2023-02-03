/**
 * @template Item
 */
export default class Store {
  #base;
  #auth;

  /**
   *
   * @param {string} base
   * @param {string} auth
   */

  constructor(base, auth) {
    this.#base = base;
    this.#auth = auth;
  }

  // /** Enter и описание появится
  /**
   *
   * @param {string} path
   * @param {RequestInit} options
   * @returns {Promise<void>}
   */
  async request (path, options = {}) {
    const headers = {
      'content-type': 'application/json',
      'authorization': this.#auth,
      ...options.headers,
    };

    const response = await fetch(this.#base + path, {...options, headers});

    const {assert, parse} = /** @type {typeof Store} */ (this.constructor);

    //если ошибка то просто остановится приложение и выбросит ошибку
    await assert(response);

    //иначе парсим
    return parse(response);
  }

  /**
   * @param {Response} response
   */
  static async assert(response) {
    if (!response.ok) {
      const message = `${response.status}: ${response.statusText}`;
      //json() асинхронный метод - он возвращает промис
      throw new Error(message, {cause: await response.json()});
    }
  }

  //избыточных промисов не нужно создавать
  /**
   * @param {Response} response
   */
  static parse(response) {
    if(response.headers.get('content-type').startsWith('application/json')) {
      return response.json();
    }

    return response.text();
  }

  /**
   * @return {Promise<Item[]>}
   */
  list() {
    return this.request('/', {
      method: 'get'
    });
  }

  /**
   * @param {Omit<Item, 'id'>} item
   * @return {Promise<Item>}
   */
  add(item) {
    return this.request('/', {
      method: 'post',
      body: JSON.stringify(item)
    });
  }

  /**
   * @param {Item} item
   * @return {Promise<Item>}
   */
  update(item) {
    // @ts-ignore
    return this.request(`/${item.id}`, {
      method: 'put',
      body: JSON.stringify(item)
    });
  }

  /**
   * @param {string} id
   * @return {Promise<string>}
   */
  delete(id) {
    return this.request(`/${id}`, {
      method: 'delete',
    });
  }
}
