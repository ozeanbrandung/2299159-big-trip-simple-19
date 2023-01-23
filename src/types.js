/**
 * @template Item
 * @typedef {import('./store').default<Item>} Store
 */

/**
 * @typedef Point
 * @prop {number} base_price
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} destination
 * @prop {string} id
 * @prop {number[]} offers
 * @prop {string} type
 */

/**
 * @typedef Destination
 * @prop {number} id
 * @prop {string} description
 * @prop {string} name
 * @prop {Picture[]} pictures
 */

/**
 * @typedef Picture
 * @prop {string} src
 * @prop {string} description
 */

/**
 * @typedef OfferGroup
 * @prop {string} type
 * @prop {Offer[]} offers
 */

/**
 * @typedef Offer
 * @prop {number} id
 * @prop {string} title
 * @prop {number} price
 */

/**
 * @typedef {import('./adapters/adapter').default} Adapter
 * @typedef {import('./adapters/point-adapter').default} PointAdapter
 * @typedef {import('./adapters/destination-adapter').default} DestinationAdapter
 * @typedef {import('./adapters/offer-group-adapter').default} OfferGroupAdapter
 */

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 * @callback AdaptCallback
 * @param {Item} [item]
 * @return {ItemAdapter}
 */

/**
 * @template Item
 * @callback FilterCallback
 * @param {Item} item
 * @return {boolean}
 */

/**
 * @template Item
 * @callback SortCallback
 * @param {Item} item
 * @param {Item} nextItem
 * @return {number}
 */
